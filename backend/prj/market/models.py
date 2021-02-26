from django.contrib.auth.models import User
from django.db import models
from django.utils.safestring import mark_safe
from image_cropping.fields import ImageRatioField, ImageCropField
from easy_thumbnails.files import get_thumbnailer

from prj.settings import BACKEND_URL


class Consumer(User):
    name = models.CharField(max_length=250, default='')
    phone = models.CharField(max_length=250, default='')
    address = models.TextField(default='')
    geo_location = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'consumer'
        verbose_name_plural = 'consumers'


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
    subcategory = models.ForeignKey(Subcategory, on_delete=models.SET_NULL, null=True, blank=True,
                                    related_name='subcategory')
    cropping = ImageRatioField('image', '150x150')

    def __str__(self):
        return f'{self.name} ({int(Store.objects.get(product=self.id).price)} ₽)'

    @property
    def image_tag(self):
        try:
            return mark_safe(f'<img src="{self.image.url}">')
        except ValueError:
            return None

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

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
        ordering = ('-id',)


# class Provider(models.Model):
#     name = models.CharField(max_length=250, default='', unique=True)
#     rating = models.IntegerField(default=0)
#
#     def __str__(self):
#         return self.name
#
#     class Meta:
#         verbose_name = 'provider'
#         verbose_name_plural = 'providers'


class Store(models.Model):
    # provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'store'
        verbose_name_plural = 'stores'

    @property
    def product_price(self):
        return self.price


class Order(models.Model):
    STATUS = (
        ('new', 'new order'),
        ('pending', 'pending order'),
        ('finished', 'finished order'),
    )

    consumer = models.ForeignKey(Consumer, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    status = models.CharField(max_length=20, default='new', choices=STATUS)

    class Meta:
        verbose_name = 'order'
        verbose_name_plural = 'orders'


class OrderProduct(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    amount = models.IntegerField(default=0)

    class Meta:
        verbose_name = 'order product'
        verbose_name_plural = 'order products'
