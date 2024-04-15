# Generated by Django 5.0.3 on 2024-04-08 12:17

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('forum', '0003_remove_forum_questions_remove_answer_answering_host_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='upvote',
            field=models.ManyToManyField(blank=True, related_name='upvoted', to=settings.AUTH_USER_MODEL),
        ),
    ]
