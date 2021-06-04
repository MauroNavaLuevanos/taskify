'''Users serializers'''

# Django REST Framework
from rest_framework import serializers

# Models
from users.models import UserModel

class UserSerializer(serializers.ModelSerializer):
    '''User model serializer'''

    class Meta:
        model = UserModel
        fields = [
            'username',
            'first_name',
            'last_name',
            'email'
        ]