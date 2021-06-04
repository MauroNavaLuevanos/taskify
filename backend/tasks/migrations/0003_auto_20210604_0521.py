# Generated by Django 3.2.4 on 2021-06-04 05:21

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('tasks', '0002_alter_taskmodel_created'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tasksgroupmodel',
            options={'verbose_name': 'Tasks Group', 'verbose_name_plural': 'Tasks Groups'},
        ),
        migrations.AlterField(
            model_name='taskmodel',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to=settings.AUTH_USER_MODEL, verbose_name='Author'),
        ),
        migrations.AlterField(
            model_name='tasksgroupmodel',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks_groups', to=settings.AUTH_USER_MODEL, verbose_name='Author'),
        ),
    ]