# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-07-30 20:07
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0022_auto_20180620_1551'),
        ('jelovnik', '0010_hello'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='hello',
            name='cmsplugin_ptr',
        ),
        migrations.DeleteModel(
            name='Hello',
        ),
    ]