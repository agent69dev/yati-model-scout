from rest_framework import serializers
from .models import CastingApplication, CastingPhoto
import re

class CastingPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CastingPhoto
        fields = ["id", "photo"]


class CastingApplicationSerializer(serializers.ModelSerializer):
    photos = CastingPhotoSerializer(many=True, read_only=True)

    class Meta:
        model = CastingApplication
        fields = ["id", "name", "age", "location", "instagram_link", "tiktok_link", "photos", "submitted_at"]


class CastingApplicationCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = CastingApplication
        fields = ["name", "age", "location", "instagram_link", "tiktok_link"]

    def validate_age(self, value):
        if value < 16:
            raise serializers.ValidationError("Applicant must be at least 16 years old.")
        if value > 60:
            raise serializers.ValidationError("Age must be 60 or below.")
        return value

    def validate_instagram_link(self, value):
        if value and not re.match(r"https?://(www\.)?instagram\.com/", value):
            raise serializers.ValidationError("Please enter a valid Instagram URL.")
        return value

    def validate_tiktok_link(self, value):
        if value and not re.match(r"https?://(www\.)?tiktok\.com/", value):
            raise serializers.ValidationError("Please enter a valid TikTok URL.")
        return value