'''Tasks Admin'''

# Django
from django.contrib import admin

# Models
from tasks.models import TasksGroupModel, TaskModel


@admin.register(TasksGroupModel)
class TasksGroupAdmin(admin.ModelAdmin):
    '''Tasks Groups Admin'''

    list_display = ('name', 'author',)
    list_filter = ('author',)

@admin.register(TaskModel)
class TaskAdmin(admin.ModelAdmin):
    '''Tasks Admin'''

    list_display = ('name', 'author', 'created', 'finished', 'finished_date',)
    list_filter = ('author',)
    readonly_fields = ('created',)
