from rest_framework import viewsets, permissions
from rest_framework.generics import ListAPIView

from market.models import Category
from market.serializers.category import CategorySerializer


class CategoryListView(ListAPIView):
    serializer_class = CategorySerializer
    pagination_class = None

    def get_queryset(self):
        return Category.objects.all().order_by('-id')


class CategoryViewSet(viewsets.ModelViewSet):
    """
        API endpoint, позволяющий пользователям читать и изменять категории
    """
    queryset = Category.objects.all().order_by('-id')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post']  # ['get', 'post','put', 'patch', 'delete']
