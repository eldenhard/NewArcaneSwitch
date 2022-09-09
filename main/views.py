from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .serializers import *
from .models import *

# Create your views here.


def main(request):
    return render(request, 'index.html', {})


class TariffViewSet(ModelViewSet):
    permission_classes = (AllowAny, )
    serializer_class = TariffSerializer
    queryset = Tariff.objects.all()



