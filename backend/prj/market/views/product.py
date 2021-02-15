from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework import serializers

from market.views.aisle import AisleSerializer
from market.views.category import CategorySerializer

from market.models import Product


class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    aisle = AisleSerializer()

    class Meta:
        model = Product
        fields = ['id', 'name', 'category', 'aisle']


class ProductListView(ListModelMixin, GenericAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
