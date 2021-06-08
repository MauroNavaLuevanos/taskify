from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('jet/', include('jet.urls', 'jet')),  # Django JET URLS

    path('', include('tasks.urls')),
    path('', include('users.urls')),
    path('api-auth/', include('rest_framework.urls',
        namespace='rest_framework')),

    path('admin/', admin.site.urls),
]+ static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
