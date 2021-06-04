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
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
        ]


class TaskSerializer(serializers.ModelSerializer):
    '''
    Serializer for Task model
    '''

    author = UserSerializer(many=False, read_only=True)

    class Meta:
        model = TaskModel
        fields = '__all__'
