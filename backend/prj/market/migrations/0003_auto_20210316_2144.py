# Generated by Django 3.1.7 on 2021-03-16 18:44

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0002_recommendation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderproduct',
            name='order',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='market.order'),
        ),
    ]
