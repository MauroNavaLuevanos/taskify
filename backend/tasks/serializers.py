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
            'author',
            'finished',
            'time_limit',
            'finished_date',
            'created',
        )
        read_only_fields = (
            'created',
        )


