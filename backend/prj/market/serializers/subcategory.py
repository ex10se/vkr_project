from rest_framework import serializers

from market.models import Subcategory


class SubcategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Subcategory
        fields = ('id', 'name')
