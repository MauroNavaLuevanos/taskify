'''Users URLs'''

# Django REST Framework
from rest_framework.routers import DefaultRouter

# Django
from django.urls import path, include

# Views
from users.views import UsersViewSet


router = DefaultRouter()
router.register(r'users', UsersViewSet, basename='users')

urlpatterns = [
    path('', include(router.urls)),
]
