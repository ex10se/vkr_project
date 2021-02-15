# Generated by Django 3.1.6 on 2021-02-15 15:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('market', '0006_auto_20210215_1540'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ('id',), 'verbose_name': 'product', 'verbose_name_plural': 'products'},
        ),
        migrations.AddField(
            model_name='aisle',
            name='category',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='market.category'),
        ),
    ]
