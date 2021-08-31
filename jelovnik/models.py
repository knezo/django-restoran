# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from cms.models.pluginmodel import CMSPlugin


# Create your models here.

class Dish(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class MealType(models.Model):
    name = models.CharField(max_length=250)

    def __str__(self):
        return self.name


class Menu(models.Model):
    date = models.CharField(max_length=100)

    def __str__(self):
        return self.date


class MealTypeOnMenu(models.Model):
    name = models.CharField(max_length=250, default='mealtype')
    menu = models.ForeignKey(Menu, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.name, self.menu)


class DishOnMenu(models.Model):
    name = models.CharField(max_length=250, default='dish')
    mealTypeOnMenu = models.ForeignKey(MealTypeOnMenu, on_delete=models.CASCADE)

    def __str__(self):
        return "%s %s" % (self.name, self.mealTypeOnMenu)


