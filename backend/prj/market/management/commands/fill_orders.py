import random

from django.core.management.base import BaseCommand
from django.db import IntegrityError

from market.models import UserProfile, UserRating, Product, Store, OrderProduct, Order


class Command(BaseCommand):
    """
    Заполняет таблицу Order случайными данными
    """
    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Delete all existing orders')
        parser.add_argument('count', nargs='?', type=int, default=10, help='Count of new orders (def. 10)')
        parser.add_argument('consumer_id', nargs='?', type=int, default=-1, help='id of orders consumer (def. random)')

    def handle(self, *args, **options):
        if options['flush']:
            Order.objects.all().delete()
            OrderProduct.objects.all().delete()
            print('Deleted all orders')

        print('The process is started...')
        for i in range(options['count']):
            order = Order()
            order.status = random.choice([i[0] for i in Order.STATUS])  # случайный статус заказа
            if options['consumer_id'] == -1:
                order.consumer = random.choice(UserProfile.objects.all())
            else:
                order.consumer_id = options['consumer_id']
            order.save()
            for j in range(1, random.randint(2, 11)):  # случайное число продуктов в заказе
                op = OrderProduct()
                op.order = order
                op.amount = random.randint(1, 10)
                op.product = random.choice(Product.objects.all())
                op.save()

        print(f'Done, {options["count"]} orders were added')
