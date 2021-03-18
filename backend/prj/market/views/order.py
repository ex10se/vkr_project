from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import Order
from market.serializers.order import OrderSerializer, OrderRequestSerializer


class OrderView(APIView):
    """
    API endpoint для заказов пользователя
    """
    # permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(request_body=OrderRequestSerializer, responses={200: OrderSerializer})
    def post(self, request):
        order = Order.objects.filter(consumer=request.data['consumer']).prefetch_related('orderproduct_set')
        return Response(OrderSerializer(order, many=True).data)
