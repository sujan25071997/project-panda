from django.urls import path
from .views import GoogleLoginView, UpdateUserProfileView

urlpatterns = [
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('user/<id>/', UpdateUserProfileView.as_view(), name='user-profile'),
]