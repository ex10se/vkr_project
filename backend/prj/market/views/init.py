from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from market.serializers.init import InitSerializer
from drf_yasg.utils import swagger_auto_schema
from market.serializers.user_profile import UserProfileSerializer


class InitView(APIView):
    """
    Проверка на авторизованность.
    """
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(responses={200: InitSerializer})
    def get(self, request):
        try:
            token = Token.objects.get(user=request.user)
            resp = InitSerializer({"token": token.key,
                                   "user": UserProfileSerializer(request.user.userprofile).data}).data
        except Exception as e:
            resp = {"status": 1, "message": str(e)}
        return Response(resp)
