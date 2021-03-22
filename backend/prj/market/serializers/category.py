from rest_framework import serializers

from market.models import Category, Subcategory
from market.serializers.subcategory import SubcategorySerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'image', 'subcategories')


class CategoryPartialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'image')
