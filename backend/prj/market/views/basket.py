from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import Product
from market.serializers.basket import BasketRequestSerializer
from market.serializers.product import ProductSerializer


class BasketInfoView(APIView):
    """
    Получение информации о товарах в корзине.
    """
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=BasketRequestSerializer)
    def post(self, request):
        out = []
        print(request.data['ids'])
        for it in request.data['ids']:
            out.append(ProductSerializer(Product.objects.get(pk=it)).data)
        return Response(out)
