'''Tasks Serializers'''

# Django REST Framework
from rest_framework import serializers

# Models
from tasks.models import TaskModel


class TaskSerializer(serializers.ModelSerializer):
    '''Tasks serializer'''

    class Meta:
        model = TaskModel
        fields = (
            'name',
            'description',
            'created',
            'finished',
            'finished_date',
            'author',
        )
