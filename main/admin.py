from django.contrib import admin
from .models import *

# Register your models here.


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.get_fields()]


@admin.register(ContactForm)
class ContactFormAdmin(admin.ModelAdmin):
    list_display = [field.name for field in ContactForm._meta.get_fields()]


@admin.register(Tariff)
class TariffAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Tariff._meta.get_fields()]

    