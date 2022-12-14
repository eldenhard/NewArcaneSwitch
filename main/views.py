from re import A
from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .serializers import *
from .models import *
from django.core.mail import send_mail

# Create your views here.


def main(request):
    return render(request, 'index.html', {})


class TariffViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = TariffSerializer
    queryset = Tariff.objects.all()


class ContactFormViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = ContactFormSerializer
    queryset = ContactForm.objects.all()


class OrderFormViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = OrderSerializer
    queryset = Order.objects.all()



