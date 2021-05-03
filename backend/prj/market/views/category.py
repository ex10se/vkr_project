from rest_framework import viewsets, mixins

from market.models import Category
from market.serializers.category import CategorySerializer


class CategoryViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """
    API endpoint, позволяющий получать список категорий

    GET /category_list
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    pagination_class = None

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
