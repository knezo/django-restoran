# -*- coding: utf-8 -*-
# Generated by Django 1.11.6 on 2019-07-09 08:32
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jelovnik', '0008_mealtypeonmenu_date'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='mealtypeonmenu',
            name='date',
        ),
    ]
