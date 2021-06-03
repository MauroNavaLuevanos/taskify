'''
Django Rest Framework Serializers for Tasks app
'''
from rest_framework import serializers

from .models import TaskModel


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    '''
    Serializer for Task model
    '''

    class Meta:
        model = TaskModel
        fields = '__all__'
