from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.decorators import api_view
import json

from .utils import converse

from .models import Chat, ModelMessage
from .serializers import ChatSerializer, ModelMessageSerializer, ModelMessageSerializer1


class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=["POST"])
    def add_message(self, request, pk=None):
        chat = self.get_object()
        message = ModelMessage.objects.create(
            role=request.data.get("role"), parts=request.data.get("parts")
        )
        chat.messages.add(message)
        return Response(status=status.HTTP_201_CREATED)

    def create(self, request, *args, **kwargs):
        user = request.user
        data = {"user": user.pk}
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors)

    def retrieve(self, request, *args, **kwargs):
        chats = Chat.objects.filter(user=request.user.pk)
        serializer = ChatSerializer(chats)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=["GET"])
    def get_messages(self, request, pk=None):
        chat = self.get_object()
        messages = ModelMessage.objects.filter(chat=pk)
        serializer = ModelMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
def send_message(request, pk):
    try:
        chat = get_object_or_404(Chat, pk=pk)

        message = request.data.get("message", "").strip()
        if not message:
            return Response(
                {"error": "Message is required."}, status=status.HTTP_400_BAD_REQUEST
            )

        user_message = {
            "role": "user",
            "parts": [message],
            "chat": chat.id,
        }

        user_serializer = ModelMessageSerializer(data=user_message)
        if user_serializer.is_valid():
            user_serializer.save()
            all_messages = ModelMessage.objects.filter(chat=chat)
            serialized_messages = ModelMessageSerializer1(all_messages, many=True)
            model_response = converse(serialized_messages.data,message=message)

            model_message = {
                "role": "model",
                "parts": [model_response],
                "chat": chat.id,
            }

            model_serializer = ModelMessageSerializer(data=model_message)
            if model_serializer.is_valid():
                model_serializer.save()
                all_messages = ModelMessage.objects.filter(chat=chat)
                serialized_messages = ModelMessageSerializer(all_messages, many=True)
                return Response(
                    status=status.HTTP_200_OK, data=serialized_messages.data
                )
            return Response(
                status=status.HTTP_400_BAD_REQUEST, data=model_serializer.errors
            )

        return Response(status=status.HTTP_400_BAD_REQUEST, data=user_serializer.errors)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
