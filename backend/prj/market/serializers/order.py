from rest_framework import serializers

from market.models import Order, OrderProduct
from market.serializers.product import ProductSerializer


class OrderProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = OrderProduct
        fields = ('id', 'product', 'amount', 'price_multiple')


class OrderSerializer(serializers.ModelSerializer):
    products = serializers.SerializerMethodField()

    @staticmethod
    def get_products(obj):
        out = []
        for i in OrderProduct.objects.filter(order=obj):
            out.append(OrderProductSerializer(i).data)
        return out

    class Meta:
        model = Order
        fields = ('id', 'consumer', 'created_at', 'updated_at', 'status', 'products', 'total_price')


