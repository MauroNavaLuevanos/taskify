'''Tasks Views'''

# Django
from django.shortcuts import render

# Django REST Framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated

# Models
from tasks.models import TaskModel

# Serializers
from tasks.serializers import TaskSerializer

# Permissions
from tasks.permissions import TaskIsEnabledToUpdate, UserAuthorizedToUpdateTask


class TasksViewSet(viewsets.ModelViewSet, CreateModelMixin):
    '''Tasks viewset'''

    queryset = TaskModel.objects.all().order_by('-created')
    serializer_class = TaskSerializer

    def create(self, request):
        data = request.data
        data['author'] = request.user.id

        serializer = TaskSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def list(self, request):

        tasks = TaskModel.objects.filter(author=request.user)
        serializer = TaskSerializer(tasks, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def get_permissions(self):
        '''Assign permissions based on actions'''

        permissions = [IsAuthenticated]

        if self.action in ['update', 'partial_update']:
            permissions.append(TaskIsEnabledToUpdate)
            permissions.append(UserAuthorizedToUpdateTask)

        return [permission() for permission in permissions]
