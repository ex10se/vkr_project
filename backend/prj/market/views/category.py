from rest_framework.generics import ListAPIView

from market.models import Category
from market.serializers.category import CategorySerializer


class CategoryListView(ListAPIView):
    """
        API endpoint, позволяющий получать список категорий
    """

    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.all().order_by('-id').prefetch_related('subcategory_set')
