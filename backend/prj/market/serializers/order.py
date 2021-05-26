from rest_framework import serializers

from market.models import Order, OrderProduct
from market.serializers.product import ProductSerializer


class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderProduct
        fields = ('id', 'product', 'amount', 'price_multiple', 'user_rating')


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    @staticmethod
    def get_products(obj):
        out = []
        for i in OrderProduct.objects.filter(order=obj).prefetch_related('product'):
            out.append(OrderProductSerializer(i).data)
        return out

    class Meta:
        model = Order
        fields = ('id', 'consumer', 'created_at', 'updated_at', 'status',
                  'get_status_display', 'products', 'total_price')


class OrderRequestSerializer(serializers.Serializer):
    consumer = serializers.IntegerField(min_value=1)
