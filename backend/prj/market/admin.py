from django.contrib import admin

from . import models
from .filters import RatingListFilter, CommonRatingListFilter
from .models import OrderProduct, Recommendation


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('username', 'get_full_name', 'phone')
    exclude = ('last_login', 'password', 'email', 'is_superuser',
               'groups', 'user_permissions', 'is_staff', 'date_joined')
    search_fields = ('username', 'phone', 'first_name', 'last_name')


class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'image_tag')
    search_fields = ('id', 'name')


class SubcategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'category')
    search_fields = ('id', 'name')
    list_filter = ('category',)


class ProductAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'category', 'subcategory', 'common_rating', 'image_tag')
    search_fields = ('id', 'name')
    list_filter = (CommonRatingListFilter, 'subcategory')
    readonly_fields = ('common_rating',)


class UserRatingAdmin(admin.ModelAdmin):
    list_display = ('user', 'product', 'rating')
    search_fields = ('user__username', 'product__name')
    list_filter = (RatingListFilter,)


class OrderProductAdmin(admin.TabularInline):
    model = OrderProduct
    raw_id_fields = ('product',)
    extra = 0


class OrderAdmin(admin.ModelAdmin):
    inlines = (OrderProductAdmin,)
    list_display = ('id', 'consumer', 'created_at', 'total_price')


class RecommendationAdmin(admin.ModelAdmin):
    pass


admin.site.register(models.UserProfile, UserProfileAdmin)
admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Subcategory, SubcategoryAdmin)
admin.site.register(models.Product, ProductAdmin)
admin.site.register(models.UserRating, UserRatingAdmin)
admin.site.register(models.Order, OrderAdmin)
admin.site.register(Recommendation, RecommendationAdmin)
