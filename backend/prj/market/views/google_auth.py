from drf_yasg.utils import swagger_auto_schema
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import UserProfile
from market.serializers.google_auth import GoogleAuthRequestSerializer
from market.serializers.user_profile import UserProfileSerializer


class GoogleAuthView(APIView):
    """
    Авторизация через гугл

    POST /google_auth
    """
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=GoogleAuthRequestSerializer)
    def post(self, request):
        try:
            user = UserProfile.objects.get(username=request.data['email'])
            token = Token.objects.get(user=user)
        except UserProfile.DoesNotExist:
            user = UserProfile.objects.create(name=request.data['firstName'],
                                              username=request.data['email'],
                                              is_active=True)
            user.set_password(None)
            user.save()
            token = Token.objects.create(user=user)
        return Response({
            'token': token.key,
            'agent': request.META['HTTP_USER_AGENT'],
            'user': UserProfileSerializer(user).data
        })
