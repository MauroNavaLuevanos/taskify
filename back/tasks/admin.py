from django.contrib import admin

from tasks.models import TasksGroupModel, TaskModel


@admin.register(TasksGroupModel)
class TasksGroupAdmin(admin.ModelAdmin):

    list_display = ('name', 'author',)
    list_filter = ('author',)

@admin.register(TaskModel)
class TaskAdmin(admin.ModelAdmin):

    list_display = ('name', 'author', 'created', 'finished', 'finished_date',)
    list_filter = ('author',)
    readonly_fields = ('created',)
