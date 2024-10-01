from django.contrib import admin
from .models import Chat, Message

class ChatAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'updated_at']
    
    
admin.site.register(Chat, ChatAdmin)

class MessageAdmin(admin.ModelAdmin):
    list_display = ['chat', 'sender', 'message', 'created_at', 'updated_at']
    
    
admin.site.register(Message, MessageAdmin)