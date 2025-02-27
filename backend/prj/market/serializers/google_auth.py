from rest_framework import serializers


class GoogleAuthRequestSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField()
    email = serializers.CharField()
    firstName = serializers.CharField()
    authToken = serializers.CharField()
