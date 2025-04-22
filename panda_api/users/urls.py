from django.urls import path
from .views import GoogleLoginView, UpdateUserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('google-login/', GoogleLoginView.as_view(), name='google-login'),
    path('user/<id>/', UpdateUserProfileView.as_view(), name='user-profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]