'''Users URLs'''

# Django
from django.urls import path

# Views
from users.views import UserLoginView

urlpatterns = [
    path('users/login/', UserLoginView.as_view(), name='login')
]
