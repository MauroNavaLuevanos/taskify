'''Users serializers'''

# Django
from django.contrib.auth import authenticate, password_validation

# Django REST Framework
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from rest_framework.validators import UniqueValidator

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


class UserSignupSerializer(serializers.Serializer):
    ''' User signup serializer'''

    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )
    username = serializers.CharField(
        min_length=4,
        max_length=20,
        validators=[UniqueValidator(queryset=UserModel.objects.all())]
    )

    password = serializers.CharField(min_length=8)
    password_confirmation = serializers.CharField(min_length=8)

    first_name = serializers.CharField(min_length=2, max_length=30)
    last_name = serializers.CharField(min_length=2, max_length=30)

    def validate(self, data):
        '''Verify password match'''

        password = data['password']
        password_confirmation = data['password_confirmation']

        if password != password_confirmation:
            raise serializers.ValidationError('Passwords don\'t match')

        password_validation.validate_password(password)

        return data

    def create(self, data):
        '''Handle user creation'''

        data.pop('password_confirmation') # Delete password confirmation
        user = UserModel.objects.create_user(**data)

        return user



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
