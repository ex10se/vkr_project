from django.utils import timezone
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated

from common.predictions import get_predictions_list, fill_recommendations
from market.models import Product, Recommendation
from market.serializers.product import ProductSerializer


class RecommenderListView(ListModelMixin, GenericAPIView):
    """
    Endpoint для получения рекомендуемых продуктов

    GET /predictions
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = ProductSerializer

    def get_queryset(self):
        # если нет сегодняшних рекомендаций, рассчитать их и заполнить таблицу
        today_recs = Recommendation.objects.filter(created_at=timezone.now().date(), user_id=self.request.user.id)
        if not today_recs:
            fill_recommendations(data=get_predictions_list(self.request.user.id))
        return Product.objects.filter(id__in=today_recs.values_list('item_id', flat=True))

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
