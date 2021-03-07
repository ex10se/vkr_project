from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from market.models import UserRating, Store
from market.serializers.user_rating import UserRatingSerializer, UserRatingPartialSerializer


# class UserRatingViewSet(UpdateModelMixin, GenericViewSet):
#     serializer_class = UserRatingSerializer

# pagination_class = None

# def get_queryset(self):
#     return UserRating.objects.all()

# @swagger_auto_schema(request_body=UserRatingSerializer)
# def patch(self, request, user, rating):
#     print(request)
#     user_rating = UserRating.objects.get(user=user)
#     user_rating.rating = rating
#     user_rating.save()
#     return Response(status=status.HTTP_201_CREATED)


class UserRatingView(APIView):
    """
    API endpoint для пользовательских оценок продуктов
    """

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
        store = Store.objects.get(product=request.data['product'])
        store.save()
        return Response(status=status.HTTP_200_OK)
