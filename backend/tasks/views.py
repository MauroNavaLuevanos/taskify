from django.shortcuts import render

from rest_framework import viewsets
from rest_framework import permissions

from .models import TaskModel

from .serializers import TaskSerializer

# Create your views here.


class TaskViewSet(viewsets.ModelViewSet):
    ''''''

    queryset = TaskModel.objects.all().order_by('-created')
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
