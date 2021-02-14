from django.contrib import admin
from . import models


class ProviderAdmin(admin.ModelAdmin):
    pass


class ConsumerAdmin(admin.ModelAdmin):
    pass


class CategoryAdmin(admin.ModelAdmin):
    pass


class ProductAdmin(admin.ModelAdmin):
    pass


class StoreAdmin(admin.ModelAdmin):
    pass


class OrderAdmin(admin.ModelAdmin):
    pass


class OrderProductAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.Provider, ProviderAdmin)
admin.site.register(models.Consumer, ProviderAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.Store, StoreAdmin)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(models.OrderProduct, OrderProductAdmin)
