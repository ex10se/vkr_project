from django.contrib import admin

from . import models
from .filters import RatingListFilter, CommonRatingListFilter


@admin.register(models.UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'get_full_name', 'phone')
    exclude = ('last_login', 'password', 'email', 'is_superuser',
               'groups', 'user_permissions', 'is_staff', 'date_joined')
    search_fields = ('username', 'phone', 'first_name', 'last_name')


@admin.register(models.Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')
    search_fields = ('id', 'name')


@admin.register(models.Subcategory)
class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('id', 'name')
    list_filter = ('category',)


@admin.register(models.Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'category', 'subcategory', 'common_rating', 'image_tag')
    search_fields = ('id', 'name')
    list_filter = (CommonRatingListFilter, 'subcategory')
    readonly_fields = ('common_rating',)


@admin.register(models.UserRating)
class UserRatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating')
    search_fields = ('user__username', 'product__name')
    list_filter = (RatingListFilter,)


class OrderProductAdmin(admin.TabularInline):
    model = models.OrderProduct
    raw_id_fields = ('product',)
    extra = 0


@admin.register(models.Order)
class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderProductAdmin,)
    list_display = ('id', 'consumer', 'created_at', 'total_price')
