# Generated by Django 3.1.7 on 2021-03-01 14:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('market', '0011_auto_20210301_1717'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userrating',
            name='product',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='market.product'),
        ),
        migrations.AlterUniqueTogether(
            name='userrating',
            unique_together={('user', 'product')},
        ),
    ]
