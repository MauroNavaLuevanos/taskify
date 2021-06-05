'''Users views'''

# Django
from django.shortcuts import render

# Django REST Framework
from rest_framework import status, viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

# Serializers
from users.serializers import UserLoginSerializer, UserSerializer, UserSignupSerializer
from tasks.serializers import TaskSerializer

# Models
from users.models import UserModel
from tasks.models import TaskModel

# Permissions
from users.permissions import IsAccountOwner


class UsersViewSet(mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    '''Users viewset'''

    queryset = UserModel.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_permissions(self):
        '''Assign permissions based on actions'''
        permissions = []

        if self.action in ['signup', 'login']:
            permissions = [AllowAny]
        elif self.action in ['retrieve']:
            permissions = [IsAuthenticated, IsAccountOwner]
        else:
            permissions = [IsAuthenticated]

        return [permissions() for permissions in permissions]


    @action(detail=False, methods=['post'])
    def login(self, request):
        '''User login action'''

        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user, token = serializer.save()
        data = {
            'user': UserSerializer(user).data,
            'access__token': token
        }

        return Response(data, status=status.HTTP_201_CREATED)

    @action(detail=False, methods=['post'])
    def signup(self, request):
        '''User signup action'''

        serializer = UserSignupSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        data = UserSerializer(user).data

        return Response(data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        '''
        Retrieve user data and his tasks

        Just add tasks to the default retrieve action
        '''

        response = super(UsersViewSet, self).retrieve(request, *args, **kwargs)
        tasks = TaskModel.objects.filter(author=request.user)
        data = {
            'user': response.data,
            'tasks': TaskSerializer(tasks, many=True).data
        }
        response.data = data

        return response


