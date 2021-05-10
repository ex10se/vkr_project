from math import prod
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.db.models import signals, Avg
from django.dispatch import receiver
from django.utils.safestring import mark_safe


class UserProfile(User):
    phone = models.CharField('Телефон', max_length=20)
    address = models.TextField('Адрес', null=True, blank=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'профиль клиента'
        verbose_name_plural = 'профили клиентов'


class Category(models.Model):
    name = models.CharField('Название', max_length=250, unique=True)
    image = models.ImageField('Изображение', upload_to='category', null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" style="width: 100px; height: 100px; object-fit: cover;">')

    @property
    def subcategories(self):
        return self.subcategory_set.values()

    image_tag.fget.short_description = 'Изображение'


class Subcategory(models.Model):
    name = models.CharField('Название', max_length=250, unique=True)
    category = models.ForeignKey(Category, verbose_name='Категория', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'подкатегория'
        verbose_name_plural = 'подкатегории'


class Product(models.Model):
    name = models.CharField('Название', max_length=250, unique=True)
    image = models.ImageField('Изображение', upload_to='product', null=True, blank=True)
    subcategory = models.ForeignKey(Subcategory, verbose_name='Подкатегория',
                                    on_delete=models.SET_NULL, null=True, blank=True)
    price = models.IntegerField('Цена')
    common_rating = models.IntegerField('Общий рейтинг', default=0, null=True)  # общий рейтинг

    def __str__(self):
        return f'{self.name} ({self.price} ₽)'

    class Meta:
        verbose_name = 'продукт'
        verbose_name_plural = 'продукты'
        ordering = ('id',)

    @property
    def category(self):
        return self.subcategory.category

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image.url}" style="width: 100px; height: 100px; object-fit: cover;">')

    category.fget.short_description = 'Категория'
    image_tag.fget.short_description = 'Изображение'


# расчет общего (среднего) рейтинга продукта при сохранении объекта класса Product
@receiver(signals.pre_save, sender=Product)
def calc_rating(sender, instance, **kwargs):  # noqa
    avg_rating = UserRating.objects.filter(product=instance.id).aggregate(Avg('rating'))['rating__avg']
    instance.common_rating = avg_rating or 0


class UserRating(models.Model):
    user = models.ForeignKey(User, verbose_name='Клиент', on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, verbose_name='Продукт', on_delete=models.CASCADE, null=True, blank=True)
    rating = models.IntegerField('Рейтинг', default=0, validators=[MinValueValidator(0), MaxValueValidator(5)])

    class Meta:
        verbose_name = 'пользовательский рейтинг'
        verbose_name_plural = 'пользовательские рейтинги'
        unique_together = ('user', 'product')


class Order(models.Model):
    STATUS = (
        ('new', 'Новый заказ'),
        ('pending', 'Подготовка заказа'),
        ('finished', 'Завершенный заказ'),
        ('canceled', 'Отмененный заказ'),
    )

    consumer = models.ForeignKey(UserProfile, verbose_name='Клиент', on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField('Создан', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлён', auto_now=True)
    status = models.CharField('Статус', max_length=20, choices=STATUS, default='new')

    class Meta:
        verbose_name = 'заказ'
        verbose_name_plural = 'заказы'

    @property
    def total_price(self):
        return sum([prod(i) for i in self.orderproduct_set.values_list('product__price', 'amount')])

    total_price.fget.short_description = 'Общая цена'


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.PositiveIntegerField('Количество', default=1)

    class Meta:
        verbose_name = 'продукт в заказе'
        verbose_name_plural = 'продукты в заказе'

    @property
    def price_multiple(self):
        return self.product.price * self.amount

    @property
    def consumer(self):
        return self.order.consumer

    @property
    def user_rating(self):
        return UserRating.objects.get_or_create(user=self.consumer, product=self.product)[0].rating


class Recommendation(models.Model):
    user_id = models.IntegerField('id пользователя')
    item_id = models.IntegerField('id продукта')
    created_at = models.DateField('Дата получения рекомендации', auto_now_add=True)

    class Meta:
        verbose_name = 'рекомендация'
        verbose_name_plural = 'рекомендации'
