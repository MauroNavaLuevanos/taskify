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
    readonly_fields = ('created', 'time_spent', 'finished_date', 'created',)

    fieldsets = (
        (None, {
            "fields": (
                'name',
                'description',
                'author',
                'finished',
                'time_limit',
                'finished_date',
                'created',
                'time_spent',
            ),
        }),
    )

