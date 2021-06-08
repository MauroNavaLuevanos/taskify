'''Tasks signals'''

# Python
from datetime import datetime

# Django
from django.db.models.signals import pre_save
from django.dispatch import receiver

# Models
from tasks.models import TaskModel


@receiver(pre_save, sender=TaskModel)
def task_handler(sender, instance, **kwargs):
    '''Handle the pre_save signal fired from the TaskModel'''

    if instance.finished:
        print(sender)

        try:
            old_task = TaskModel.objects.get(id=instance.id)

            if not old_task.finished_date:
                instance.finished_date = datetime.now()

        except TaskModel.DoesNotExist:
            instance.finished_date = datetime.now()