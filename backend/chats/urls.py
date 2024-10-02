from django.urls import path    
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'chats', views.ChatViewSet)

urlpatterns = [
    path("chat/<int:pk>/", views.send_message, name="send_message"),
] + router.urls
