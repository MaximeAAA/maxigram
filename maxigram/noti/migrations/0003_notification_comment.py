# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-01-04 07:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('noti', '0002_auto_20180104_1140'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]
