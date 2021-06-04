'''Tasks Views'''

# Django
from django.shortcuts import render

# Django REST Framework
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

# Models
from tasks.models import TaskModel

# Serializers
from tasks.serializers import TaskSerializer


class TasksViewSet(viewsets.ModelViewSet):
    '''Tasks viewset'''

    permission_classes = (IsAuthenticated,)
    queryset = TaskModel.objects.all().order_by('-created')
    serializer_class = TaskSerializer
