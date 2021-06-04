'''Users models'''

# Django
from django.contrib.auth.models import AbstractBaseUser, UserManager, PermissionsMixin
from django.db import models
from django.utils.translation import gettext_lazy as _


class UserModel(AbstractBaseUser, PermissionsMixin):
    '''User model'''

    email = models.EmailField(
        _("Email"),
        unique=True
    )
    username = models.CharField(
        _("Username"),
        max_length=50,
        unique=True
    )
    first_name = models.CharField(
        _("First Name"),
        max_length=50
    )
    last_name = models.CharField(
        _("Last Name"),
        max_length=50
    )
    is_staff = models.BooleanField(
        _("Is Staff"),
        default=False
    )
    is_superuser = models.BooleanField(
        _("Is Superuser"),
        default=False
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name']

    objects = UserManager()

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
