from rest_framework import serializers

from market.models import Category, Subcategory
from market.serializers.subcategory import SubcategorySerializer


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    subcategory = serializers.SerializerMethodField()

    def get_subcategory(self, obj):
        out = []
        for item in Subcategory.objects.filter(category=obj):
            out.append(SubcategorySerializer(item).data)
        return out

    class Meta:
        model = Category
        fields = ['id', 'name', 'image_url', 'subcategory']
