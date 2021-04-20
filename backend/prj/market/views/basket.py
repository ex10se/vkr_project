from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import Product, Order, OrderProduct
from market.serializers.basket import BasketRequestSerializer, BasketSubmitRequestSerializer
from market.serializers.order import OrderSerializer
from market.serializers.product import ProductSerializer


class BasketInfoView(APIView):
    """
    Получение информации о товарах в корзине
    """
    permission_classes = [AllowAny]

    @swagger_auto_schema(request_body=BasketRequestSerializer)
    def post(self, request):
        out = []
        for product in request.data['products']:
            out.append(ProductSerializer(Product.objects.get(id=product['product'])).data)
        return Response(out)


class BasketSubmitView(APIView):
    """
    Отправка корзины, создание заказа
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=BasketSubmitRequestSerializer, responses={200: OrderSerializer})
    def post(self, request):
        o = Order()
        o.consumer = request.user.userprofile
        o.save()
        for item in request.data.get('products'):
            product = Product.objects.get(pk=item['product'])
            op = OrderProduct()
            op.product = product
            op.order = o
            op.amount = item['amount']
            op.save()

        return Response(OrderSerializer(o).data)
