from django.contrib.admin import SimpleListFilter
from django_filters import FilterSet, NumberFilter, CharFilter

from market.models import Product, Order


class ProductFilter(FilterSet):
    category = NumberFilter(label='Category', field_name='subcategory__category')
    subcategory = NumberFilter()
    searchkey = CharFilter(field_name='name', lookup_expr='icontains')

    class Meta:
        model = Product
        fields = ('searchkey', 'subcategory')


RATING_LOOKUPS = (('score >= 4.5', 'Excellent'),
                  ('4.5 > score >= 3.8', 'Good'),
                  ('3.8 > score >= 2.5', 'Satisfactory'),
                  ('2.5 > score > 0', 'Poor'),
                  ('score = 0', 'Not rated'))


class RatingListFilter(SimpleListFilter):
    title = 'rating'
    parameter_name = 'rating'

    def lookups(self, request, model_admin):
        return RATING_LOOKUPS

    def queryset(self, request, queryset):
        if self.value() == 'score >= 4.5':  # noqa
            return queryset.filter(rating__gte=4.5)
        if self.value() == '4.5 > score >= 3.8':
            return queryset.filter(rating__gte=3.8, rating__lt=4.5)
        if self.value() == '3.8 > score >= 2.5':
            return queryset.filter(rating__gte=2.5, rating__lt=3.8)
        if self.value() == '2.5 > score > 0':
            return queryset.filter(rating__gt=0, rating__lt=2.5)
        if self.value() == 'score = 0':
            return queryset.filter(rating=0)


class CommonRatingListFilter(SimpleListFilter):
    title = 'common rating'
    parameter_name = 'common_rating'

    def lookups(self, request, model_admin):
        return RATING_LOOKUPS

    def queryset(self, request, queryset):
        if self.value() == 'score >= 4.5':  # noqa
            return queryset.filter(common_rating__gte=4.5)
        if self.value() == '4.5 > score >= 3.8':
            return queryset.filter(common_rating__gte=3.8, common_rating__lt=4.5)
        if self.value() == '3.8 > score >= 2.5':
            return queryset.filter(common_rating__gte=2.5, common_rating__lt=3.8)
        if self.value() == '2.5 > score > 0':
            return queryset.filter(common_rating__gt=0, common_rating__lt=2.5)
        if self.value() == 'score = 0':
            return queryset.filter(common_rating=0)
