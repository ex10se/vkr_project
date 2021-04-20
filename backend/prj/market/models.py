from django.contrib.auth.models import User
from django.contrib.sites.models import Site
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import signals, Avg
from django.dispatch import receiver
from django.utils.safestring import mark_safe


class UserProfile(User):
    phone = models.CharField(max_length=20)
    address = models.TextField(null=True, blank=True, default='')

    def __str__(self):
        return self.username

    @property
    def purchased_products(self):
        op = OrderProduct.objects.filter(order__consumer=1239).values_list('product', flat=True).distinct()
        return Product.objects.filter(id__in=op)

    class Meta:
        verbose_name = 'UserProfile'
        verbose_name_plural = 'UserProfiles'


class Category(models.Model):
    name = models.CharField(max_length=250, default='', unique=True)
    image = models.ImageField(upload_to='category', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    @property
    def image_tag(self):
        # проверка существования image.url, оборачивание его в тег (для админки)
        try:
            return mark_safe(
                f'<img src="{self.image.url}" style="width: 100px; height: 100px; object-fit: cover;">')
        except ValueError:
            return None

    @property
    def subcategories(self):
        return self.subcategory_set.values()


class Subcategory(models.Model):
    name = models.CharField(max_length=250, default='', unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'subcategory'
        verbose_name_plural = 'subcategories'


class Product(models.Model):
    name = models.CharField(max_length=250, default='', unique=True)
    image = models.ImageField(upload_to='product', null=True, blank=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, blank=True)
    price = models.IntegerField()
    common_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, null=True)  # общий рейтинг

    def __str__(self):
        return f'{self.name} ({self.price} ₽)'

    @property
    def category(self):
        return self.subcategory.category

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" style="width: 100px; height: 100px; object-fit: cover;">')

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
        ordering = ('id',)


# не получилось вытащить в отдельный файл signals
# расчет общего (среднего) рейтинга продукта при сохранении объекта модели Product
@receiver(signals.pre_save, sender=Product)
def calc_rating(sender, instance, **kwargs):  # noqa
    avg_rating = UserRating.objects.filter(product=instance.id).aggregate(Avg('rating'))['rating__avg']
    instance.common_rating = avg_rating if avg_rating else 0


class UserRating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    rating = models.DecimalField(max_digits=2, decimal_places=1, default=0,
                                 validators=[MinValueValidator(0), MaxValueValidator(5)])  # рейтинг пользователя

    class Meta:
        verbose_name = 'UserRating'
        verbose_name_plural = 'UserRatings'
        unique_together = ('user', 'product')  # не дает пользователю оценивать один и тот же продукт многократно


class Order(models.Model):
    STATUS = (
        ('new', 'Новый заказ'),
        ('pending', 'Подготовка заказа'),
        ('finished', 'Завершенный заказ'),
        ('canceled', 'Отмененный заказ'),
    )

    consumer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS, default='new')

    class Meta:
        verbose_name = 'order'
        verbose_name_plural = 'orders'

    @property
    def total_price(self):
        return sum(product.price_multiple for product in OrderProduct.objects.filter(order=self))


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.PositiveIntegerField(default=1)

    class Meta:
        verbose_name = 'order product'
        verbose_name_plural = 'order products'

    @property
    def price_multiple(self):
        return self.product.price * self.amount

    @property
    def consumer(self):
        return self.order.consumer

    @property
    def user_rating(self):
        return UserRating.objects.get_or_create(user=self.consumer, product=self.product)[0].rating
