'''Users permissions'''

# Django REST Framework
from rest_framework.permissions import BasePermission


class IsAccountOwner(BasePermission):
    '''Allow acces only to the owner'''

    def has_object_permission(self, request, view, obj):
        '''Verify the user owner is the same who sends the request'''

        return request.user == obj
