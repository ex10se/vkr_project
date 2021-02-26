from abc import ABC

from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework.views import APIView


class CommonResponseSerializer(serializers.Serializer):
    status = serializers.IntegerField()
    message = serializers.CharField()


class LoginRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class AuthView(APIView):
    """
        Авторизация пользователя.
    """

    @swagger_auto_schema(
        request_body = LoginRequestSerializer,
        responses = {200: CommonResponseSerializer}
    )
    def post(self, request):
        return Response(CommonResponseSerializer({
            'status': 0,
            'message': 'Good'
        }).data)
