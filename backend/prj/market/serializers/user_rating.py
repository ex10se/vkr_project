from rest_framework import serializers

from market.models import UserRating


class UserRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRating
        fields = ('user', 'product', 'rating')


class UserRatingPartialSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserRating
        fields = ('user',)
