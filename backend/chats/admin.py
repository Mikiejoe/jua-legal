from django.contrib import admin
from .models import Chat, ModelMessage

class ChatAdmin(admin.ModelAdmin):
    list_display = ['user', 'created_at', 'updated_at']
    
    
admin.site.register(Chat, ChatAdmin)

class ModelMessageAdmin(admin.ModelAdmin):
    list_display = ['role', 'parts']
    
    
admin.site.register(ModelMessage,ModelMessageAdmin)