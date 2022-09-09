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

    created_at = models.DateTimeField(verbose_name='Дата создания',
                                    auto_created=True)
    
    class Meta:
        verbose_name = 'Контактная форма'
        verbose_name_plural = 'Контактные формы'
        db_table = 'contact_forms'


class Order(models.Model):
    created_at = models.DateTimeField(verbose_name='Дата создания',
                                    auto_created=True)

    update_at = models.DateTimeField(verbose_name='Дата обновления',
                                    auto_now=True)

    ORDER_STATUS_CHOICES = [
        ('Новый', 'new'),
        ('Оплачен', 'paid'),
        ('Отменен', 'canceled'),
        ('Завершен', 'finished'),
    ]

    status = models.CharField(verbose_name='Статус',
                            max_length=150, choices=ORDER_STATUS_CHOICES,
                            default='new')

    fiat_amount = models.FloatField(verbose_name='Сумма заказа',
                                    default=0, blank=False)

    client = models.ForeignKey(ContactForm, verbose_name='Контактное лицо',
                                default=None, blank=True, on_delete=models.PROTECT)

    class Meta:
        verbose_name = 'Заказ'
        verbose_name_plural = 'Заказы'
        db_table = 'orders'


    