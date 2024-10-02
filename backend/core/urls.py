from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings
from dj_rest_auth.registration.views import VerifyEmailView

# Base URL constant for easy modification
API_BASE_URL = 'api/v1/'

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin site URL
    path(f'{API_BASE_URL}users/', include('dj_rest_auth.urls')),  # Auth-related endpoints
    path(f'{API_BASE_URL}users/register/', include("dj_rest_auth.registration.urls")),  # Registration endpoints
    path(f'{API_BASE_URL}users/account-confirm-email/', VerifyEmailView.as_view(), name='account_email_verification_sent'),  # Email confirmation endpoint
    path(API_BASE_URL, include('users.urls')),  # User app URLs
    path(API_BASE_URL, include('chats.urls')),  # Chat app URLs
    path(API_BASE_URL, include('lawyers.urls')),  # Lawyers app URLs
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)  # Serve static files during development
