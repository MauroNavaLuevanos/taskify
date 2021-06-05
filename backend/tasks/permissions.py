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

        return not obj.finished

class UserAuthorizedToUpdateTask(BasePermission):
    '''Verify if the task author is trying to update the task'''

    def has_object_permission(self, request, view, obj):
        '''Validate if the user is equal the task owner'''

        return request.user == obj.author

