from rest_framework import serializers

from .models import Chat, ModelMessage


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["id", "user", "created_at", "updated_at"]


class ModelMessageSerializer(serializers.ModelSerializer):
    chat = serializers.PrimaryKeyRelatedField(queryset=Chat.objects.all())

    class Meta:
        depth = 1
        model = ModelMessage
        fields = ["role", "parts", "chat"]


class ModelMessageSerializer1(serializers.ModelSerializer):
    class Meta:
        model = ModelMessage
        fields = ["role", "parts"]
