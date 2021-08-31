from rest_framework import serializers
from .models import *


class DishSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dish
        fields = ('id', 'name')


class MealTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = MealType
        fields = ('id', 'name')
