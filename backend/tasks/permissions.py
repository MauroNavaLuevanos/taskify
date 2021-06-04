'''Tasks Permissions'''

# Django REST Framework
from rest_framework.permissions import BasePermission

# Models
from tasks.models import TaskModel


class TaskIsEnabledToUpdate(BasePermission):
    '''Verify if the task could be updated'''

    def has_object_permission(self, request, view, obj):
        '''
        Validate if the task hasn't been marked as finished/completed
        '''

        print(obj.finished)

        return not obj.finished
