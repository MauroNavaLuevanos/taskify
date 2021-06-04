from django.shortcuts import render

from rest_framework import authentication
from rest_framework import permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from .models import TaskModel

from .serializers import TaskSerializer

# Create your views here.

@permission_classes(permissions.AllowAny)
@api_view(['GET'])
def list_tasks(request):
    '''
    View to list all tasks
    '''

    qs = TaskModel.objects.all().order_by('-created')
    serializer = TaskSerializer(qs, many=True)

    return Response(serializer.data)

