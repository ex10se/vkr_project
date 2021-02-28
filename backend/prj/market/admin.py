from django.contrib import admin

from . import models
from .models import UserProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['name', 'username']


# class ConsumerAdmin(admin.ModelAdmin):
#     pass


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')
    search_fields = ('id', 'name')


class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('id', 'name')
    list_filter = ('category',)


# TODO: фильтруя по категории, отображаются подкатегории только относящиеся к этой категории, а не все
class ProductAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'subcategory', 'category', 'get_small_image')
    search_fields = ('id', 'name')
    list_filter = ('category', 'subcategory')


class StoreAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    pass


class OrderProductAdmin(admin.ModelAdmin):
    pass


admin.site.register(UserProfile, UserProfileAdmin)
# admin.site.register(models.Consumer, ConsumerAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Subcategory, SubcategoryAdmin)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Store, StoreAdmin)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderProduct, OrderProductAdmin)
