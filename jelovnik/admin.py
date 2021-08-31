# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import Dish, MealType, Menu, MealTypeOnMenu, DishOnMenu

admin.site.register(Dish)
admin.site.register(MealType)


admin.site.register(Menu)
admin.site.register(MealTypeOnMenu)
admin.site.register(DishOnMenu)
