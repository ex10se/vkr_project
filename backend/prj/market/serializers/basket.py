from rest_framework import serializers


class BasketItemSerializer(serializers.Serializer):
    product = serializers.IntegerField(min_value=1)
    amount = serializers.IntegerField(min_value=1)


class BasketRequestSerializer(serializers.Serializer):
    products = serializers.ListField(child=BasketItemSerializer())


class BasketSubmitRequestSerializer(serializers.Serializer):
    products = serializers.ListField(child=BasketItemSerializer())
