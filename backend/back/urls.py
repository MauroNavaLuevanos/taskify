from django.contrib import admin
from django.urls import path, include

from rest_framework import routers

from tasks.views import TaskViewSet

router = routers.DefaultRouter()
router.register(r'tasks', TaskViewSet)

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),  # Django JET URLS
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls',
        namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
