'''Users admin'''

# Django
from django.contrib import admin

# Models
from users.models import UserModel

# Register your models here.


@admin.register(UserModel)
class UserAdmin(admin.ModelAdmin):
    '''Users model admin'''

    list_display = (
        'username',
        'first_name',
        'last_name',
        'is_staff',
    )
    list_filter = (
        'username',
        'is_staff',
    )
