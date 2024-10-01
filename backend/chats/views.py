from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework import status

from .models import Chat, ModelMessage
from .serializers import ChatSerializer, ModelMessageSerializer

class ChatViewSet(ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['POST'])
    def add_message(self, request, pk=None):
        chat = self.get_object()
        message = ModelMessage.objects.create(
            role=request.data.get('role'),
            parts=request.data.get('parts')
        )
        chat.messages.add(message)
        return Response(status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['GET'])
    def get_messages(self, request, pk=None):
        chat = self.get_object()
        messages = chat.messages.all()
        serializer = ModelMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
