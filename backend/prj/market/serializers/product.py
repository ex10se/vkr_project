from rest_framework import serializers

from market.models import Product
from market.serializers.category import CategorySerializer, CategoryPartialSerializer
from market.serializers.subcategory import SubcategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    category = CategoryPartialSerializer()
    subcategory = SubcategorySerializer()

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'subcategory', 'price', 'common_rating', 'image')
