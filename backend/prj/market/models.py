from django.db import models
from django.contrib.auth.models import User
from django.utils.safestring import mark_safe


class Provider(User):
    name = models.CharField(max_length=250, default='')
    phone = models.CharField(max_length=250, default='')
    rating = models.IntegerField(default=0)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'provider'
        verbose_name_plural = 'providers'


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
    name = models.CharField(max_length=250, default='')

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'category'
        verbose_name_plural = 'categories'


class Aisle(models.Model):
    name = models.CharField(max_length=250, default='')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f'{self.name} ({self.category})'

    class Meta:
        verbose_name = 'aisle'
        verbose_name_plural = 'aisles'


class Product(models.Model):
    name = models.CharField(max_length=250, default='')
    # image = models.ImageField(upload_to='product', null=True, blank=True)
    image = models.URLField(null=True, blank=True)
    aisle = models.ForeignKey(Aisle, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.name} ({self.aisle.category})'

    @property
    def image_tag(self):
        # проверка существования image.url, оборачивание его в тег
        try:
            return mark_safe(f'<img src="{self.image}" style="width: 100px; height: 100px; object-fit: cover;">')
        except ValueError:
            return None

    class Meta:
        verbose_name = 'product'
        verbose_name_plural = 'products'
        ordering = ('-id',)


class Store(models.Model):
    provider = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    price = models.DecimalField(max_digits=8, decimal_places=2)

    class Meta:
        verbose_name = 'store'
        verbose_name_plural = 'stores'


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
