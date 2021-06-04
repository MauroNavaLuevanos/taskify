from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),  # Django JET URLS

    path('', include('tasks.urls')),
    path('', include('users.urls')),
    path('api-auth/', include('rest_framework.urls',
        namespace='rest_framework')),

    path('admin/', admin.site.urls),
]
