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

# Permissions
from tasks.permissions import TaskIsEnabledToUpdate


class TasksViewSet(viewsets.ModelViewSet):
    '''Tasks viewset'''

    queryset = TaskModel.objects.all().order_by('-created')
    serializer_class = TaskSerializer

    def get_permissions(self):
        '''Assign permissions based on actions'''

        permissions = [IsAuthenticated]

        if self.action in ['update', 'partial_update']:
            permissions.append(TaskIsEnabledToUpdate)

        return [permission() for permission in permissions]
