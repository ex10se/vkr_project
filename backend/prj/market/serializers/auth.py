from rest_framework import serializers


class LoginRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    authToken = serializers.CharField()
