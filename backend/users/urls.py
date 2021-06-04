'''Users URLs'''

# Django
from django.urls import path

# Views
from users.views import UserLoginView, UserSignupView

urlpatterns = [
    path('users/login/', UserLoginView.as_view(), name='login'),
    path('users/signup/', UserSignupView.as_view(), name='signup')
]
