# Generated by Django 4.1.1 on 2022-09-09 10:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactForm',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True, verbose_name='Дата создания')),
                ('name', models.CharField(default=None, max_length=150, verbose_name='Имя')),
                ('phone', models.CharField(default=None, max_length=150, verbose_name='Телефон')),
                ('email', models.EmailField(blank=True, default=None, max_length=150, verbose_name='Почта')),
            ],
            options={
                'verbose_name': 'Контактная форма',
                'verbose_name_plural': 'Контактные формы',
                'db_table': 'contact_forms',
            },
        ),
        migrations.CreateModel(
            name='Tariff',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('convertation', models.FloatField(default=0, verbose_name='Конвертация')),
                ('documentation', models.FloatField(default=0, verbose_name='Документы')),
                ('operation', models.FloatField(default=0, verbose_name='Исполнение')),
            ],
            options={
                'verbose_name': ('Тариф',),
                'verbose_name_plural': 'Тарифы',
                'db_table': 'tariffs',
            },
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_created=True, verbose_name='Дата создания')),
                ('update_at', models.DateTimeField(auto_now=True, verbose_name='Дата обновления')),
                ('status', models.CharField(choices=[('Новый', 'new'), ('Оплачен', 'paid'), ('Отменен', 'canceled'), ('Завершен', 'finished')], default='new', max_length=150, verbose_name='Статус')),
                ('fiat_amount', models.FloatField(default=0, verbose_name='Сумма заказа')),
                ('client', models.ForeignKey(blank=True, default=None, on_delete=django.db.models.deletion.PROTECT, to='main.contactform', verbose_name='Контактное лицо')),
            ],
            options={
                'verbose_name': 'Заказ',
                'verbose_name_plural': 'Заказы',
                'db_table': 'orders',
            },
        ),
    ]