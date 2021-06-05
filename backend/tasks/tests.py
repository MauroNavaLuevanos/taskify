'''Tasks Tests'''

# Django REST Framework
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

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

        # Create temporal users
        self.user = UserModel.objects.create(
            username='lukeskywallker',
            email='luke@grepublic.com',
            password='sithkiller123',
            first_name='Luke',
            last_name='Skywalker'
        )
        self.another_user = UserModel.objects.create(
            username='darthvader',
            email='darth@empire.com',
            password='deathstar123',
            first_name='Anakin',
            last_name='Skywalker'
        )

        # Crate temporal task
        self.task = TaskModel.objects.create(
            name='Destroy Death Star',
            description='Kill all your enemies',
            time_limit=60,
            author=self.user,
        )

        # Get users tokens
        self.another_user_token = Token.objects.create(
            user=self.another_user
        ).key
        self.user_token = Token.objects.create(user=self.user).key

        # Defautl token
        self.client.credentials(HTTP_AUTHORIZATION='Token {}'.format(self.user_token))

        # Client common vars
        self.endpoint = '/tasks/{}/'.format(self.task.id)

    def test_success_task_update(self):
        '''Test task task'''

        # Send request
        request_data = {
            'name': '{} Updated'.format(self.task.name),
            'time_limit': self.task.time_limit + 2,
            'author': self.task.author.id,
            'description': '{} Updated'.format(self.task.description),
        }
        request = self.client.put(self.endpoint, request_data, format='json')

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_success_task_patch(self):
        '''Test task partial update'''

        # Send request
        request_data = {
            'finished': True
        }
        request = self.client.patch(self.endpoint, request_data, format='json')

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_200_OK)

    def test_finished_task_update(self):
        '''
        Test task marked as finished update

        API must raise an error, task updating must be disbled if has been
        already marked as finished/completed
        '''

        # Update current task
        request_data = {
            'finished': True
        }
        updated_request = self.client.patch(
            self.endpoint,
            request_data,
            format='json'
        )

        # Send request
        request_data = {
            'name': '{} after finished'.format(self.task.name),
            'time_limit': self.task.time_limit,
            'author': self.task.author.id,
            'description': self.task.description
        }
        put_request = self.client.put(self.endpoint, request_data, format='json')
        patch_request = self.client.patch(
            self.endpoint,
            request_data,
            format='json'
        )

        # Raise validations
        self.assertEqual(updated_request.status_code, status.HTTP_200_OK)
        self.assertEqual(put_request.status_code, status.HTTP_403_FORBIDDEN)
        self.assertEqual(patch_request.status_code, status.HTTP_403_FORBIDDEN)

    def test_update_task_by_another_user(self):
        '''
        Test updating a task by another user

        The tasks only can be edited by their author
        '''

        # Create new client
        client = APIClient()
        client.credentials(
            HTTP_AUTHORIZATION='Token {}'.format(self.another_user_token)
        )

        # Send request
        request_data = {
            'finished': True
        }
        request = client.patch(
            self.endpoint,
            request_data,
            format='json'
        )

        # Raise validations
        self.assertEqual(request.status_code, status.HTTP_403_FORBIDDEN)
