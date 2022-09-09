from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.main, name='main'),

    path('api/tariff/<int:pk>', views.TariffViewSet.as_view({'get': 'retrieve'})),

]