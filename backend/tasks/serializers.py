'''Tasks Serializers'''

# Django
from django.contrib.auth.models import User

# Django REST Framework
from rest_framework import serializers

# Models
from .models import TaskModel


class TaskSerializer(serializers.ModelSerializer):
    '''Tasks serializer'''

    class Meta:
        model = TaskModel
        fields = ('name', 'description', 'created', 'finished')
