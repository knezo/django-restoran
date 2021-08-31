from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from cms.models.pluginmodel import CMSPlugin
from django.utils.translation import ugettext_lazy as _
from datetime import date as pythonDate

from .models import Menu, MealTypeOnMenu, DishOnMenu


@plugin_pool.register_plugin
# @python_2_unicode_compatible
class HelloPlugin(CMSPluginBase):
    model = CMSPlugin
    name = "Jelovnik plugin"
    render_template = "jelovnik_plugin.html"
    cache = False

    def render(self, context, instance, placeholder):
        today = pythonDate.today()
        today = today.strftime("%d.%m.%Y.")

        todayMenu = Menu.objects.filter(date=today)
        todayMealTypes = MealTypeOnMenu.objects.filter(menu=todayMenu)
        todayDishes = DishOnMenu.objects.filter(mealTypeOnMenu__in=todayMealTypes)

        context = {
            'MealTypes': todayMealTypes,
            'Dishes': todayDishes
        }
        return context




