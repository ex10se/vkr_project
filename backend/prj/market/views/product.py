from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated

from common.predictions import fill_recommendations, get_predictions_list
from market.filters import ProductFilter
from market.models import Product, OrderProduct, Recommendation
from market.serializers.product import ProductSerializer


class ProductListView(ListModelMixin, GenericAPIView):
    """
    API endpoint для списка продуктов

    GET /product_list
    """
    queryset = Product.objects.all().prefetch_related('subcategory')
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class PopularProductListView(ListModelMixin, GenericAPIView):
    """
    API endpoint для списка самых популярных продуктов

    GET /popular_products
    """
    queryset = Product.objects.filter(id__in=OrderProduct.objects.all().values_list('product_id', flat=True))
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RecommendedProductsListView(ListModelMixin, GenericAPIView):
    """
    Endpoint для получения рекомендуемых продуктов

    GET /recommended_products
    """
    permission_classes = [IsAuthenticated]
    serializer_class = ProductSerializer
    filterset_class = ProductFilter

    def get_queryset(self):
        # если нет сегодняшних рекомендаций, рассчитать их и заполнить таблицу
        today_recs = Recommendation.objects.filter(created_at=timezone.now(), user_id=self.request.user.id)
        if not today_recs:
            fill_recommendations(data=get_predictions_list(self.request.user.id))
        return Product.objects.filter(id__in=today_recs.values_list('item_id', flat=True))

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
