from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import signals, Avg, Sum
from django.dispatch import receiver
from django.utils.safestring import mark_safe
from easy_thumbnails.files import get_thumbnailer
from image_cropping.fields import ImageRatioField, ImageCropField

from prj.settings import BACKEND_URL


class UserProfile(User):
    phone = models.CharField(max_length=20)
    address = models.TextField(null=True, blank=True, default='')

    def __str__(self):
        return self.username

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
    def image_url(self):
        return BACKEND_URL + self.image.url


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
    image = ImageCropField(upload_to='product', null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, blank=True)
    cropping = ImageRatioField('image', '150x150')

    def __str__(self):
        return f'{self.name} ({self.get_price} ₽)'

    @property
    def get_small_image(self):
        return mark_safe(f'<img src="{self.get_small_image_url}">')

    @property
    def get_small_image_url(self):
        return BACKEND_URL + get_thumbnailer(self.image).get_thumbnail({
            'size': (100, 100),
            'box': self.cropping,
            'crop': 'smart',
        }).url

    @property
    def image_url(self):
        return BACKEND_URL + self.image.url

    @property
    def get_price(self):
        return Store.objects.get(product_id=self.id).price

    @property
    def get_common_rating(self):
        return Store.objects.get(product_id=self.id).common_rating

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
        ordering = ('-id',)


class Store(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    common_rating = models.DecimalField(max_digits=2, decimal_places=1, default=0, null=True)  # общий рейтинг

    def __str__(self):
        return f'{self.product.name} {self.price} ₽, score {self.common_rating})'

    class Meta:
        verbose_name = 'store'
        verbose_name_plural = 'store'
        ordering = ('id',)


# не получилось вытащить в отдельный файл signals
# расчет общего (среднего) рейтинга продукта при сохранении объекта модели Store
@receiver(signals.pre_save, sender=Store)
def calc_rating(sender, instance, **kwargs):
    avg_rating = UserRating.objects.filter(product=instance.product).aggregate(Avg('rating'))['rating__avg']
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
    status = models.CharField(max_length=20, default='new', choices=STATUS)

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
        return self.product.get_price * self.amount


class Notification(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    consumer = models.ForeignKey(UserProfile, on_delete=models.CASCADE, null=True, blank=True, related_name='consumer')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
