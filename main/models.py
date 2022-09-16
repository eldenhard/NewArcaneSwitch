from this import d
from django.db import models

# Create your models here.


class Tariff(models.Model):
    convertation = models.FloatField(verbose_name='Конвертация',
                                    default=0, blank=False)

    documentation = models.FloatField(verbose_name='Документы',
                                    default=0, blank=False)

    operation = models.FloatField(verbose_name='Исполнение',
                                default=0, blank=False)

    class Meta:
        verbose_name = 'Тариф',
        verbose_name_plural = 'Тарифы'
        db_table = 'tariffs'


class ContactForm(models.Model):
    name = models.CharField(verbose_name='Имя',
                            max_length=150, default=None, blank=False)

    phone = models.CharField(verbose_name='Телефон',
                            max_length=150, default=None, blank=False)

    email = models.EmailField(verbose_name='Почта',
                            max_length=150, default=None, blank=True)

    message = models.TextField(verbose_name='Сообщение',
                            default=None, blank=True, null=True)

    created_at = models.DateTimeField(verbose_name='Дата создания',
                                    auto_now=True)

    status = models.BooleanField(verbose_name='Обработан',
                                default=False)
    
    class Meta:
        verbose_name = 'Контактная форма'
        verbose_name_plural = 'Контактные формы'
        db_table = 'contact_forms'


class Order(models.Model):
    created_at = models.DateTimeField(verbose_name='Дата создания',
                                    auto_now_add=True)

    update_at = models.DateTimeField(verbose_name='Дата обновления',
                                    auto_now=True)

    ORDER_STATUS_CHOICES = [
        ('new', 'Новый'),
        ('paid', 'Оплачен'),
        ('canceled', 'Отменен'),
        ('finished', 'Завершен'),
    ]

    status = models.CharField(verbose_name='Статус',
                            max_length=150, choices=ORDER_STATUS_CHOICES,
                            default='new')

    fiat_amount = models.FloatField(verbose_name='Сумма заказа',
                                    default=0, blank=False)

    usdt_amount = models.FloatField(verbose_name='Сумма в USDT',
                                    default=0, blank=False)

    # tariff = models.OneToOneField(Tariff, verbose_name='Рассчитанный тариф',
    #                             default=None, blank=True, on_delete=models.PROTECT, null = True)
    convertation = models.FloatField(verbose_name='Конвертация',
                                    default=0, blank=False)

    documentation = models.FloatField(verbose_name='Документы',
                                    default=0, blank=False)

    operation = models.FloatField(verbose_name='Исполнение',
                                default=0, blank=False)
    # client = models.OneToOneField(ContactForm, verbose_name='Контактное лицо',
    #                             default=None, blank=True, on_delete=models.PROTECT, null = True)
    name = models.CharField(verbose_name='Имя',
                            max_length=150, default=None, blank=False)

    phone = models.CharField(verbose_name='Телефон',
                            max_length=150, default=None, blank=False)

    email = models.EmailField(verbose_name='Почта',
                            max_length=150, default=None, blank=True)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        db_table = 'orders'


    