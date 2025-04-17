from rest_framework import serializers
from .models import CustomUser
from django.utils.timezone import now

class UserProfileSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField(read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ['id', 'email', 'first_name', 'last_name', 'google_id',
                  'created_at', 'updated_at', 'last_login', 'full_name']
        read_only_fields = ['id', 'created_at', 'updated_at', 'last_login', 'google_id']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}".strip()

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        for field in ['created_at', 'updated_at', 'last_login']:
            value = getattr(instance, field)
            representation[field] = value.isoformat() if value else None
        return representation

    def update(self, instance, validated_data):
        for field in ['first_name', 'last_name', 'email']:
            if field in validated_data:
                setattr(instance, field, validated_data[field])
        instance.save()
        return instance
