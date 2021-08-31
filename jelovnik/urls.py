from django.conf.urls import url
from . import views
from django.contrib.auth.views import login
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [

    url(r'^$', views.main, name="main"),
    url(r'^meni/$', views.index),
    url(r'^administracija/$', views.administracija, name="administracija"),
    url(r'^administracija/stvoriMeni/$', views.stvori_meni, name="stvori_meni"),
    url(r'^administracija/urediPredlozak/$', views.uredi_predlozak, name="uredi_predlozak"),

    # forms
    url(r'^administracija/dodajJelo/$', views.dodaj_jelo),
    url(r'^administracija/ukloniJelo/$', views.ukloni_jelo),
    url(r'^administracija/dodajMeni/$', views.dodaj_meni),
    url(r'^administracija/ukloniMeni/$', views.ukloni_meni),

    url(r'^administracija/stvoriMeni/formMeni/$', views.form_meni),
    url(r'^administracija/stvoriMeni/delOldMeni/$', views.del_old_meni),

    # autentification
    url(r'^administracija/login/$', views.user_login, name="user_login"),
    url(r'^administracija/logout/$', views.user_logout, name="user_logout"),

    # JSON
    url(r'^dishes/', views.DishList.as_view()),
    url(r'^mealtypes/', views.MealTypeList.as_view()),

]