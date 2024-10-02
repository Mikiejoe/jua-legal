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
    
    def create(self, request, *args, **kwargs):
        user = request.user
        data = {
            "user": user.pk
        }
        serializer = ChatSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors)
    
    def retrieve(self, request, *args, **kwargs):
        chats = Chat.objects.filter(user=request.user.pk)
        serializer = ChatSerializer(chats)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['GET'])
    def get_messages(self, request, pk=None):
        chat = self.get_object()
        # messages = chat.messages.all()
        messages = ModelMessage.objects.filter(chat=pk)
        serializer = ModelMessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
