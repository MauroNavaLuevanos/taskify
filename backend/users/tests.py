'''Users Tests'''

# Django
from django.test import TestCase

# Models
from users.models import UserModel


class CreateUserTestCase(TestCase):
    '''User creation test case'''

    def setUp(self):
        '''Test setup'''

        pass


    def test_user_creation(self):
        '''User creation test genration'''

        user = UserModel.objects.create(
            first_name='fulano',
            last_name='de tal',
            email='fulano@spacex.com',
            password='elpanaderoconelpan123',
        )

        self.assertIsNotNone(user)
