from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from market.models import *

User = get_user_model()


class Command(BaseCommand):
    help = 'Команда для очистки базы заказов'

    def handle(self, *args, **options):
        Order.objects.all().delete()
        OrderProduct.objects.all().delete()
        print(f'Orders were removed')
