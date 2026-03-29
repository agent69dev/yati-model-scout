from django.db import models

class CastingApplication(models.Model):
    name = models.CharField(max_length=255)
    age = models.PositiveIntegerField()
    location = models.CharField(max_length=255)
    instagram_link = models.URLField(blank=True, null=True)
    tiktok_link = models.URLField(blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} - {self.location}"
    
class CastingPhoto(models.Model):
    application = models.ForeignKey(
        CastingApplication, related_name="photos", on_delete=models.CASCADE
    )
    photo = models.ImageField(upload_to="casting_photos/")


    def __str__(self):
        return f"Photo for {self.application.name}"