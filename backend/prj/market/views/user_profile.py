from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import UserProfile
from market.serializers.user_profile import UserProfileSerializer


class UserProfileView(APIView):
    """
    API endpoint для редактирования профиля пользователя
    """
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(request_body=UserProfileSerializer)
    def put(self, request):
        try:
            user = UserProfile.objects.get(user_ptr_id=request.data['user'])
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        user.first_name = request.data['firstName']
        user.phone = request.data['phone']
        user.address = request.data['address']
        user.save()
        return Response(status=status.HTTP_200_OK)
