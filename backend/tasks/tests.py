'''Tasks Tests'''

# Django REST Framework
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# Django
from django.test import TestCase

# Models
from users.models import UserModel


class TaskCreationTestCase(APITestCase):
    '''Task creation tests'''

    def setUp(self):
        '''Test setup'''

        # Create temporal user
        self.user = UserModel.objects.create(
            username='lukeskywallker',
            email='luke@grepublic.com',
            password='sithkiller123',
            first_name='Luke',
            last_name='Skywalker'
        )

        # Get and set the token in the test client
        self.token = Token.objects.create(user=self.user).key
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token))

    def test_success_task_listing(self):
        '''Test tasks listing'''

        # Send request
        url = '/tasks/'
        request = self.client.get(url)

        # Raise validation
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_success_task_creation(self):
        '''Test task creation'''

        # Send request
        url = '/tasks/'
        new_task_data = {
            'name': 'Destroy Death Star',
            'description': 'Kill all your enemies',
            'time_limit': 60,
            'author': self.user.id,

        }
        request = self.client.post(
            url,
            new_task_data,
            format='json'
        )

        # Raise validation
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)



