from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import UserRating, Product
from market.serializers.user_rating import UserRatingSerializer, UserRatingPartialSerializer


class UserRatingView(APIView):
    """
    API endpoint для пользовательских оценок продуктов
    """
    permission_classes = (AllowAny,)

    @swagger_auto_schema(request_body=UserRatingPartialSerializer)
    def post(self, request):
        try:
            user_rating = UserRating.objects.filter(user_id=request.data['user']).values('product_id', 'rating')
        except UserRating.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(user_rating)

    @swagger_auto_schema(request_body=UserRatingSerializer)
    def patch(self, request):
        user_rating = UserRating.objects.get_or_create(user_id=request.data['user'],
                                                       product_id=request.data['product'])[0]
        user_rating.rating = request.data['rating']
        user_rating.save()
        # обновление общего рейтинга
        product = Product.objects.get(pk=request.data['product'])
        product.save()
        return Response(status=status.HTTP_200_OK)
