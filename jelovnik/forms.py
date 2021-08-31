from django import forms

TYPE = [
    ("1", "Juha"),
    ("2", "Glavno jelo"),
    ("3", "Prilog"),
    ("4", "Salata"),
    ("5", "Desert"),
    ("6", "Ostalo")
]


class NewDishForm(forms.Form):
    name = forms.CharField(label="Naziv")


class NewMealTypeForm(forms.Form):
    name = forms.CharField(label="Naziv")