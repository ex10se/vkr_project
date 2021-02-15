from rest_framework import serializers, viewsets, permissions

from market.models import Aisle


class AisleSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Aisle
        fields = ['id', 'name']


class AisleViewSet(viewsets.ModelViewSet):
    """
        API endpoint, позволяющий пользователям читать и изменять подкатегории
    """
    queryset = Aisle.objects.all().order_by('-id')
    serializer_class = AisleSerializer
    permission_classes = [permissions.AllowAny]
    http_method_names = ['get', 'post']  # ['get', 'post','put', 'patch', 'delete']
