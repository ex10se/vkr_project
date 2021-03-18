from rest_framework import serializers

from market.models import Category, Subcategory
from market.serializers.subcategory import SubcategorySerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    subcategory = serializers.SerializerMethodField()

    @staticmethod
    def get_subcategory(obj):
        out = []
        subcategories = Subcategory.objects.filter(category=obj).prefetch_related('category')
        for item in subcategories:
            out.append(SubcategorySerializer(item).data)
        return out

    class Meta:
        model = Category
        fields = ('id', 'name', 'image', 'subcategory')


class CategoryPartialSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name', 'image')
