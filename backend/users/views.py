'''Users views'''

# Django
from django.shortcuts import render

# Django REST Framework
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# Serializers
from users.serializers import UserLoginSerializer, UserSerializer, UserSignupSerializer

# Models
from users.models import UserModel


class UserLoginView(APIView):
    '''User api login view'''

    def post(self, request, *args, **kwargs):
        '''Handel HTTP POST request'''

        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserSerializer(user).data,
            'access__token': token
        }

        return Response(data, status=status.HTTP_201_CREATED)

class UserSignupView(APIView):
    '''User api signup view'''

    def post(self, request, *args, **kwargs):
        '''Handle HTTP POST request'''

        serializer = UserSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserSerializer(user).data

        return Response(data, status=status.HTTP_201_CREATED)

