from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token

from market.models import UserProfile
from market.serializers.auth import LoginRequestSerializer
from market.serializers.user_profile import UserProfileSerializer


class AuthView(APIView):
    """
    Авторизация пользователя
    """

    @swagger_auto_schema(request_body=LoginRequestSerializer)
    def post(self, request):
        try:
            user = UserProfile.objects.get(username=request.data['email'])
            token = Token.objects.get(user=user)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response({
            'token': token.key,
            'agent': request.META['HTTP_USER_AGENT'],
            'user': UserProfileSerializer(user).data
        })
