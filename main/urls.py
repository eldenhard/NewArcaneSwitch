from django.urls import path, include
from . import views


urlpatterns = [
    path('', views.main, name='main'),

    path('api/tariff/<int:pk>', views.TariffViewSet.as_view({'get': 'retrieve'})),

    path('api/contact-form/create/', views.ContactFormViewSet.as_view({'post': 'create'})),

    path('api/order-form/create/', views.OrderFormViewSet.as_view({'post': 'create'})),

]