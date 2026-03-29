from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .models import CastingApplication, CastingPhoto
from .serializers import CastingApplicationCreateSerializer, CastingApplicationSerializer

class CastingApplicationView(APIView):
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request):

        photos = request.FILES.getlist("photos")

        data = request.data.dict()  
        data.pop("photos", None)  

        serializer = CastingApplicationCreateSerializer(data=data)
        if serializer.is_valid():
            application = serializer.save()
            for photo in photos:
                CastingPhoto.objects.create(application=application, photo=photo)
            return Response(
                CastingApplicationSerializer(application).data,
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        applications = CastingApplication.objects.all().order_by("-submitted_at")
        serializer = CastingApplicationSerializer(applications, many=True)
        return Response(serializer.data)