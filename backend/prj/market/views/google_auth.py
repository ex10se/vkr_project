from drf_yasg.utils import swagger_auto_schema
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import UserProfile
from market.serializers.google_auth import GoogleAuthRequestSerializer
from market.serializers.user_serializer import UserProfileSerializer


class GoogleView(APIView):
    """
    Авторизация через гугл.
    """
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=GoogleAuthRequestSerializer
    )
    def post(self, request):
        print(request.data)
        try:
            user = UserProfile.objects.get(username=request.data['email'])
            token = Token.objects.get(user=user)
        except UserProfile.DoesNotExist:
            user = UserProfile()
            user.name = request.data['firstName']
            user.username = request.data['email']
            user.is_active = True
            user.set_password('123')
            user.set_password('auth1auth2')
            user.save()
            token = Token.objects.create(user=user)

        return Response({
            'token': token.key,
            'agent': request.META['HTTP_USER_AGENT'],
            'user': UserProfileSerializer(user).data
        })
