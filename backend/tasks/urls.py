from django.urls import path

from tasks.views import list_tasks

urlpatterns = [
    path('tasks/', list_tasks, name="tasks"),
]
