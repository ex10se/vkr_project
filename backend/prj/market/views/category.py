from rest_framework import serializers, viewsets, permissions
from rest_framework.decorators import action

from market.models import Category


class CategorySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class CategoryViewSet(viewsets.ModelViewSet):
    """
        API endpoint, позволяющий пользователям читать и изменять категории
    """
    queryset = Category.objects.all().order_by('-id')
    serializer_class = CategorySerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post']  # ['get', 'post','put', 'patch', 'delete']

    @action(detail=False, methods=['post'])
    def set_password(self, request, pk=None):
        pass