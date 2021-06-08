'''Tasks Admin'''

# Django
from django.contrib import admin

# Models
from tasks.models import TaskModel

@admin.register(TaskModel)
class TaskAdmin(admin.ModelAdmin):
    '''Tasks Admin'''

    list_display = ('name', 'author', 'created', 'finished', 'finished_date',)
    list_filter = ('author',)
    readonly_fields = ('created',)
