from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin

from market.filters import ProductFilter
from market.models import Product
from market.serializers.product import ProductSerializer


class ProductListView(ListModelMixin, GenericAPIView):
    """
        API endpoint для списка продуктов
    """

    queryset = Product.objects.all().prefetch_related('subcategory')
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
