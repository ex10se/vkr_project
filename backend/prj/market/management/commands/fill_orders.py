import random

from django.core.management.base import BaseCommand

from market.models import UserProfile, Product, OrderProduct, Order


class Command(BaseCommand):
    """
    Заполняет таблицу Order случайными данными
    """

    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Delete all existing orders')
        parser.add_argument('-c', nargs='?', type=int, default=10, help='Count of new orders (def. 10)')
        parser.add_argument('-i', nargs='?', type=int, default=-1, help='id of orders consumer (def. random)')
        parser.add_argument('-s', nargs='?', type=str, default='random', help='status of orders '
                                                                              '[new, pending, finished, canceled] '
                                                                              '(def. random)')

    def handle(self, *args, **options):
        if options['flush']:
            Order.objects.all().delete()
            OrderProduct.objects.all().delete()
            print('Deleted all orders')

        print('The process is started...')
        for i in range(options['c']):
            order = Order()
            if options['i'] == -1:
                order.consumer = random.choice(UserProfile.objects.all())
            else:
                order.consumer_id = options['i']
            if options['s'] == -1:
                order.status = random.choice([i[0] for i in Order.STATUS])  # случайный статус заказа
            else:
                order.status = options['s']
            order.save()
            for j in range(1, random.randint(2, 11)):  # случайное число продуктов в заказе
                op = OrderProduct()
                op.order = order
                op.amount = random.randint(1, 10)
                op.product = random.choice(Product.objects.all())
                op.save()

        print(f'Done, {options["c"]} orders were added')
