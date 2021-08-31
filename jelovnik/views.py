# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse
from .models import Dish, MealType, DishOnMenu, MealTypeOnMenu, Menu
from .forms import NewDishForm, NewMealTypeForm

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import DishSerializer

from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from datetime import date as pythonDate
import datetime


# send user to todays jelovnik
def main(request):

    today = pythonDate.today()
    today = today.strftime("%d.%m.%Y.")

    return redirect('meni/?datum=' + today)


# show jelovnik for today
def index(request):
    date = request.GET.get("datum")

    today_menu = Menu.objects.filter(date=date)
    today_meal_types = MealTypeOnMenu.objects.filter(menu=today_menu)
    today_dishes = DishOnMenu.objects.filter(mealTypeOnMenu__in=today_meal_types)

    context = {
        'date': date,
        'MealTypes': today_meal_types,
        'Dishes': today_dishes
    }

    return render(request, 'jelovnik/index.html', context)


# administration of jelovnik
def administracija(request):
    all_dishes = Dish.objects.order_by('name')
    all_meal_types = MealType.objects.all()
    form_dish = NewDishForm()
    form_meal_type = NewMealTypeForm()

    user = request.user
    if not user.is_authenticated:
        return redirect(reverse("main"))

    context = {
        'user': user,
        'allDishes': all_dishes,
        'allMealTypes': all_meal_types,
        'formDish': form_dish,
        'formMealType': form_meal_type
    }
    return render(request, 'jelovnik/administracija.html', context)


# create new tjedni jelovnik
def stvori_meni(request):
    try:
        predlozak = int(float(request.GET["predlozak"]))
    except:
        predlozak = 0

    year_monday = int(float(request.GET["year"]))
    month_monday = int(float(request.GET["month"]))
    day_monday = int(float(request.GET["day"]))

    day1 = pythonDate(year_monday, month_monday, day_monday)

    day2 = day1 + datetime.timedelta(days=1)
    day3 = day1 + datetime.timedelta(days=2)
    day4 = day1 + datetime.timedelta(days=3)
    day5 = day1 + datetime.timedelta(days=4)

    day1_string = day1.strftime("%d.%m.%Y.")
    day2_string = day2.strftime("%d.%m.%Y.")
    day3_string = day3.strftime("%d.%m.%Y.")
    day4_string = day4.strftime("%d.%m.%Y.")
    day5_string = day5.strftime("%d.%m.%Y.")

    if predlozak:
        menu = Menu.objects.filter(date=str(predlozak*10))
        meal_types1 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=str(predlozak*10+1))
        meal_types2 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=str(predlozak*10+2))
        meal_types3 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=str(predlozak*10+3))
        meal_types4 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=str(predlozak*10+4))
        meal_types5 = MealTypeOnMenu.objects.filter(menu=menu)

    else:
        menu = Menu.objects.filter(date=day1_string)
        meal_types1 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=day2_string)
        meal_types2 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=day3_string)
        meal_types3 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=day4_string)
        meal_types4 = MealTypeOnMenu.objects.filter(menu=menu)
        menu = Menu.objects.filter(date=day5_string)
        meal_types5 = MealTypeOnMenu.objects.filter(menu=menu)

    dishes = DishOnMenu.objects.all()

    context = {
        'mondayDay': day1_string,
        'mealTypes1': meal_types1,
        'mealTypes2': meal_types2,
        'mealTypes3': meal_types3,
        'mealTypes4': meal_types4,
        'mealTypes5': meal_types5,
        'dishes': dishes,
    }

    return render(request, 'jelovnik/stvoriMeni.html', context)


def uredi_predlozak(request):
    predlozak = request.GET.get("predlozak")
    predlozak = int(predlozak)

    predlozak_pon = str(predlozak * 10)
    predlozak_uto = str(predlozak * 10 + 1)
    predlozak_sri = str(predlozak * 10 + 2)
    predlozak_cet = str(predlozak * 10 + 3)
    predlozak_pet = str(predlozak * 10 + 4)

    menu = Menu.objects.filter(date=predlozak_pon)
    meal_types1 = MealTypeOnMenu.objects.filter(menu=menu)
    menu = Menu.objects.filter(date=predlozak_uto)
    meal_types2 = MealTypeOnMenu.objects.filter(menu=menu)
    menu = Menu.objects.filter(date=predlozak_sri)
    meal_types3 = MealTypeOnMenu.objects.filter(menu=menu)
    menu = Menu.objects.filter(date=predlozak_cet)
    meal_types4 = MealTypeOnMenu.objects.filter(menu=menu)
    menu = Menu.objects.filter(date=predlozak_pet)
    meal_types5 = MealTypeOnMenu.objects.filter(menu=menu)

    dishes = DishOnMenu.objects.all()

    context = {
        'predlozak': predlozak,
        'predlozakDate': predlozak_pon,
        'mealTypes1': meal_types1,
        'mealTypes2': meal_types2,
        'mealTypes3': meal_types3,
        'mealTypes4': meal_types4,
        'mealTypes5': meal_types5,
        'dishes': dishes,
    }

    return render(request, 'jelovnik/urediPredlozak.html', context)


# User autentification
def user_login(request):
    context = {}
    user = request.user

    if user.is_authenticated:
        return redirect(reverse("administracija"))

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect(reverse("administracija"))
        else:
            context["error"] = "Unesi ispravne podatke!"
            return render(request, 'jelovnik/login.html', context)
    else:
        return render(request, 'jelovnik/login.html', context)


def user_logout(request):
    if request.method == "POST":
        logout(request)

    return redirect(reverse("main"))


# add new dish into database
def dodaj_jelo(request):
    # dodavanje novog jela
    if request.method == "POST":
        form = NewDishForm(request.POST)
        if form.is_valid():
            Dish.objects.create(**form.cleaned_data)
    return redirect('../')


# delete dish from databse
def ukloni_jelo(request):
    if request.method == "POST":
        key = request.POST.get("id")
        delete_dish = Dish.objects.get(pk=key)

        delete_dish.delete()
    return redirect('../')


# add new MealType into database
def dodaj_meni(request):
    if request.method == "POST":
        form = NewMealTypeForm(request.POST)
        if form.is_valid():
            MealType.objects.create(**form.cleaned_data)
    return redirect('../')


# delete MealType from database
def ukloni_meni(request):
    if request.method == "POST":
        key = request.POST.get("id")
        delete_meal_type = MealType.objects.get(pk=key)
        delete_meal_type.delete()
    return redirect('../')


# get data sent via form and save it
def form_meni(request):

    date = request.GET.get("date")
    meal_type = request.GET.get("mealType")
    dish = []
    i = 2
    while i < request.GET.__len__():
        key = "dish{}"
        dish.append(request.GET.get(key.format(i-2)))
        i = i+1

    try:
        new_menu = Menu.objects.get(date=date)
        # "datum postoji"
    except:
        # "datum ne postoji"
        new_menu = Menu.objects.create(date=date)

    new_meal_type_on_menu = MealTypeOnMenu.objects.create(name=meal_type, menu=new_menu)

    for d in dish:
        DishOnMenu.objects.create(name=d, mealTypeOnMenu=new_meal_type_on_menu)

    return HttpResponse("")


# if date
def del_old_meni(request):
    date = request.GET.get("date")

    try:
        old_menu = Menu.objects.get(date=date)
        print "datum postoji"
        old_menu.delete()
    except:
        print "datum ne postoji"

    return HttpResponse("")


# JSON
class DishList(APIView):

    def get(self, request):
        dishes = Dish.objects.all()
        serializer = DishSerializer(dishes, many=True)
        return Response(serializer.data)

    def post(self):
        pass


# JSON
class MealTypeList(APIView):

    def get(self, request):
        mealtypes = MealType.objects.all()
        serializer = DishSerializer(mealtypes, many=True)
        return Response(serializer.data)

    def post(self):
        pass
