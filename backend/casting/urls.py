from django.urls import path
from .views import CastingApplicationView

urlpatterns = [
    path("apply/", CastingApplicationView.as_view(), name="casting-apply")
]