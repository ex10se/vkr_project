from rest_framework import serializers

from market.models import Product
from market.serializers.category import CategorySerializer
from market.serializers.subcategory import SubcategorySerializer


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    subcategory = SubcategorySerializer()

    class Meta:
        model = Product
        fields = ('id', 'name', 'category', 'subcategory',
                  'get_price', 'get_common_rating', 'image', 'get_small_image_url')

