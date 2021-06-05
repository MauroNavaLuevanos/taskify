'''Tasks Tests'''

# Django REST Framework
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

# Django
from django.test import TestCase

# Models
from users.models import UserModel
from tasks.models import TaskModel


class TasksListingTestCase(APITestCase):
    '''Tasks listing test case'''

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

            # Raise validations
            self.assertEqual(request.status_code, status.HTTP_200_OK)


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


    def test_success_task_creation(self):
        '''Test task creation'''

        # Send request
        url = '/tasks/'
        request_data = {
            'name': 'Destroy Death Star',
            'description': 'Kill all your enemies',
            'time_limit': 60,
            'author': self.user.id,
        }
        request = self.client.post(
            url,
            request_data,
            format='json'
        )

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_201_CREATED)


class TaskUpdateTestCase(APITestCase):
    '''Task update test case'''

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

        # Crate temporal task
        self.task = TaskModel.objects.create(
            name='Destroy Death Star',
            description='Kill all your enemies',
            time_limit=60,
            author=self.user,
        )

        # Get and set the token in the test client
        self.token = Token.objects.create(user=self.user).key
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.token))

    def test_success_task_update(self):
        '''Test task task'''

        # Send request
        url = '/tasks/{}/'.format(self.task.id)
        request_data = {
            'name': '{} Updated'.format(self.task.name),
            'time_limit': self.task.time_limit + 2,
            'author': self.task.author.id,
            'description': '{} Updated'.format(self.task.description),
        }
        request = self.client.put(url, request_data, format='json')

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_success_task_patch(self):
        '''Test task partial update'''

        # Send request
        url = '/tasks/{}/'.format(self.task.id)
        request_data = {
            'finished': True
        }
        request = self.client.patch(url, request_data, format='json')

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_finished_task_update(self):
        '''
        Test task marked as finished update

        API must raise an error, a task update must be disbled if the same has
        been already marked as finished/completed
        '''

        # Send request
        url = '/tasks/{}/'.format(self.task.id)
        request_data = {
            'name': '{} after finished'.format(self.task.name),
            'time_limit': self.task.time_limit,
            'author': self.task.author.id,
            'description': self.task.description
        }
        request = self.client.post(url, request_data, format='json')

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)

