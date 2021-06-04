'''Users serializers'''

# Django
from django.contrib.auth import authenticate

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token

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


class UserLoginSerializer(serializers.Serializer):
    ''' User Login Serializer'''

    email = serializers.EmailField()
    password = serializers.CharField(min_length=8)

    def validate(self, data):
        '''Check validation'''

        user = authenticate(username=data['email'], password=data['password'])

        if not user:
            raise serializers.ValidationError('Invalid Credentials')

        self.context['user'] = user

        return data

    def create(self, data):
        '''Generate or retrieve new token'''

        token, created = Token.objects.get_or_create(user=self.context['user'])

        return self.context['user'], token.key
