from rest_framework import serializers
from .models import Documents

class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Documents
        fields = '__all__'
        read_only_fields = ['id']