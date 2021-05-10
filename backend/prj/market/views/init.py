from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from market.serializers.init import InitSerializer
from market.serializers.user_profile import UserProfileSerializer


class InitView(APIView):
    """
    Проверка на авторизованность

    GET /init
    """
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(responses={status.HTTP_200_OK: InitSerializer()})
    def get(self, request):
        try:
            token = Token.objects.get(user=request.user)
            resp = InitSerializer({'token': token.key,
                                   'user': UserProfileSerializer(request.user.userprofile).data}).data
        except Exception as e:
            resp = {"status": 1, "message": str(e)}
        return Response(resp)
