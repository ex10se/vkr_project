# Generated by Django 3.1.7 on 2021-03-18 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_auto_20210318_1747'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderproduct',
            name='_price_multiple',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=99),
        ),
    ]
