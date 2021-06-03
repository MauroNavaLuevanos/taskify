from django.utils.translation import gettext_lazy as _
from django.db import models
from django.conf import settings

# Create your models here.


class TasksGroupModel(models.Model):
    '''
        Tasks Groups
        ---------
        Represents a group of tasks, helps to get more order and group the tasks
    '''

    name = models.CharField(_("Name"), max_length=50)
    description = models.TextField(_("Description"), blank=True, null=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("Author"),
        on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

        class Meta:
            db_table = ''
            managed = True
            verbose_name = 'Tasks Group'
            verbose_name_plural = 'Tasks Groups'


class TaskModel(models.Model):
    '''
        Task
        -------

        Represents a task
    '''

    name = models.CharField(_("Name"), max_length=50)
    description = models.TextField(_("Description"), blank=True, null=True)
    finished = models.BooleanField(_("Finished"), default=False)
    finished_date = models.DateTimeField(_("Finished Date"), auto_now=False,
        auto_now_add=False, blank=True, null=True)
    created = models.DateTimeField(_("Created Date"), auto_now_add=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, verbose_name=_("Author"),
        on_delete=models.CASCADE)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
