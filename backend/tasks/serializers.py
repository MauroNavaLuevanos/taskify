'''
Django Rest Framework Serializers for Tasks app
'''
from django.contrib.auth.models import User

from rest_framework import serializers

from .models import TaskModel


class UserSerializer(serializers.ModelSerializer):
    ''''''

    class Meta:
        model = User
        fields = ['pk', 'email', 'username']


class TaskSerializer(serializers.ModelSerializer):
    '''
    Serializer for Task model
    '''

    author = UserSerializer(many=False, read_only=True)

    class Meta:
        model = TaskModel
        fields = ['pk', 'name', 'description', 'author']
