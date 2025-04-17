import requests
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import UserProfileSerializer
from django.utils import timezone
from django.db import transaction
from rest_framework_simplejwt.tokens import RefreshToken
from decouple import config
from .models import CustomUser

# CustomUser = get_user_model()

class GoogleLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        access_token = request.data.get('access_token')
        if not access_token:
            return Response({'error': 'Access token required'}, status=400)

        try:
            # Step 1: Verify token with Google
            token_info_url = 'https://www.googleapis.com/oauth2/v3/tokeninfo'
            response = requests.get(token_info_url, params={'access_token': access_token})
            response.raise_for_status()
            token_data = response.json()
            print("token_data", token_data)

            # Step 2: Extract and validate required fields
            email = token_data.get('email')
            if not email:
                return Response({'error': 'Email not found in token data'}, status=400)

            client_id = config("GOOGLE_OAUTH_CLIENT_ID", default="")
            aud = token_data.get('aud')
            if client_id and aud != client_id:
                return Response({'error': 'Invalid client ID'}, status=400)

        except requests.RequestException:
            return Response({'error': 'Invalid or expired access token'}, status=401)

        except Exception as e:
            return Response({'error': str(e)}, status=400)

        # Step 3: Create or update user in database
        with transaction.atomic():
            user, created = CustomUser.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': token_data.get('given_name', ''),
                    'last_name': token_data.get('family_name', ''),
                    'google_id': token_data.get('sub', ''),
                    'last_login': timezone.now(),
                }
            )

            if not created:
                user.last_login = timezone.now()
                user.save(update_fields=['last_login'])

            # Step 4: Generate JWT tokens
            refresh = RefreshToken.for_user(user)

            return Response({
                'access_token': str(refresh.access_token),
                'refresh_token': str(refresh),
                'user': UserProfileSerializer(user).data
            })

class UpdateUserProfileView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        self.perform_update(serializer)

        return Response({
            'user': serializer.data,
            'message': 'Profile updated successfully'
        })
