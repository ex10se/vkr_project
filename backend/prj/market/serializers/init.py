from rest_framework import serializers

from market.serializers.user_profile import UserProfileSerializer


class InitSerializer(serializers.Serializer):
    token = serializers.CharField()
    user = UserProfileSerializer()
