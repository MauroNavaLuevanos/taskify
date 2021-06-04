'''Tasks Models'''

# Django
from django.utils.translation import gettext_lazy as _
from django.db import models
from django.conf import settings


class TasksGroupModel(models.Model):
    '''Tasks Group model'''

    name = models.CharField(
        _("Name"),
        max_length=50
    )
    description = models.TextField(
        _("Description"),
        blank=True,
        null=True
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        verbose_name=_("Author"),
        on_delete=models.CASCADE,
        related_name='tasks_groups'
    )

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Tasks Group'
        verbose_name_plural = 'Tasks Groups'


class TaskModel(models.Model):
    '''Task model'''

    name = models.CharField(
        _("Name"),
        max_length=50
    )
    description = models.TextField(
        _("Description"),
        blank=True,
        null=True
    )
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        related_name='tasks',
        verbose_name=_("Author"),
        on_delete=models.CASCADE
    )
    finished = models.BooleanField(_("Finished"), default=False)
    time_limit = models.PositiveSmallIntegerField(_("Time"))
    finished_date = models.DateTimeField(
        _("Finished Date"),
        auto_now=False,
        auto_now_add=False,
        blank=True,
        null=True
    )
    created = models.DateTimeField(_("Created Date"), auto_now_add=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        verbose_name = 'Task'
        verbose_name_plural = 'Tasks'
