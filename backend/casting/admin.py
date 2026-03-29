from django.contrib import admin
from .models import CastingApplication, CastingPhoto

class CastingPhotoInline(admin.TabularInline):
    model = CastingPhoto
    extra = 1

@admin.register(CastingApplication)
class CastingApplicationAdmin(admin.ModelAdmin):
    list_display = ["name", "age", "location", "submitted_at"]
    list_filter = ["location", "submitted_at"]
    search_fields = ["name", "location"]
    readonly_fields = ["submitted_at"]
    inlines = [CastingPhotoInline]