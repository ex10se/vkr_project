from drf_yasg.utils import swagger_auto_schema
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import Order
from market.serializers.order import OrderSerializer, OrderRequestSerializer


class OrderView(APIView):
    """
    API endpoint для заказов пользователя

    POST /order_list
    """
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(request_body=OrderRequestSerializer)
    def post(self, request):
        orders = Order.objects.filter(consumer=request.data['consumer'])
        return Response(OrderSerializer(orders, many=True).data)
