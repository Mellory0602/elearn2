from rest_framework import viewsets
from rest_framework.response import Response
from .models import Documents
from .serializers import DocumentSerializer
from rest_framework.parsers import MultiPartParser, FormParser  

class DocumentViewSet(viewsets.ModelViewSet):
        queryset = Documents.objects.all()
        serializer_class = DocumentSerializer
        parser_classes = [MultiPartParser, FormParser]  
        