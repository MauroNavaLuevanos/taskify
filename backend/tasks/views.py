'''Tasks Views'''

# Django
from django.shortcuts import render

# Django REST Framework
from rest_framework import viewsets

# Models
from tasks.models import TaskModel

# Serializers
from tasks.serializers import TaskSerializer


class TasksViewSet(viewsets.ModelViewSet):
    '''Tasks viewset'''

    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer
