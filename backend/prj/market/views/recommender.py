from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated

from common.predictions import get_predictions_list
from market.models import Product
from market.serializers.product import ProductSerializer


class RecommenderListView(ListModelMixin, GenericAPIView):
    """
    Endpoint для получения рекомендуемых продуктов
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        return Product.objects.filter(id__in=get_predictions_list(self.request.user.id))

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
