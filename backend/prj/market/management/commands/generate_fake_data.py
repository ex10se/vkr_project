import random
import string

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand
from django.db import transaction
from django.db.models import Q

from market.models import *

User = get_user_model()


class Command(BaseCommand):
    help = 'Команда для генерации фейковых данных'

    def add_arguments(self, parser):
        parser.add_argument('--force', action='store_true', help='Дроп данных')

    def handle(self, *args, **options):
        if options.get('force', False) and settings.DEBUG:
            UserProfile.objects.filter(~Q(username='ex10se1994@gmail.com'), ~Q(username='punkboy@inbox.ru'),
                                       is_superuser=False, is_staff=False).delete()
            Order.objects.all().delete()
            OrderProduct.objects.all().delete()
            UserRating.objects.all().delete()
            Product.objects.all().update(common_rating=0)

        self.generate_users()
        self.generate_orders()
        self.generate_ratings()

    def generate_users(self):
        n = 20
        with transaction.atomic():
            for i in range(n):
                username = self.random_username()
                first_name = self.random_first_name()
                phone = self.random_phone()
                address = self.random_address()
                UserProfile.objects.create(username=username,
                                           first_name=first_name,
                                           phone=phone,
                                           address=address)
        print(f'{n} users were created')

    def generate_orders(self):
        n = 200
        with transaction.atomic():
            for i in range(n):
                consumer = self.random_client()
                status = self.random_order_status()
                order = Order.objects.create(consumer=consumer,
                                             status=status)
                order.save()
                for j in range(1, random.randint(2, 5)):
                    amount = random.randint(1, 4)
                    product = random.choice(Product.objects.all())
                    OrderProduct.objects.create(order=order,
                                                amount=amount,
                                                product=product)

        print(f'{n} orders were created')

    def generate_ratings(self):
        order_products = OrderProduct.objects.all()
        for op in order_products:
            self.get_or_create_rating(consumer=op.consumer, product=op.product)
            # расчет общего рейтинга
            Product.objects.get(pk=op.product.id).save()
        print(f'Ratings were created')

    @staticmethod
    def random_address():
        street_root = ('Невск', 'Егорьевск', 'Грибоедовск', 'Крупск', 'Римск', 'Таллинск', 'Державинск')  # noqa
        street_type = ('ий пр., ', 'ий пер., ', 'ая ул., ')  # noqa
        building = f'д. {random.randint(1, 80)}, '
        flat = f'кв. {random.randint(1, 500)}'
        return random.choice(street_root) + random.choice(street_type) + building + flat

    @staticmethod
    def random_first_name():
        return random.choice(('Иван', 'Василий', 'Мария', 'Анна', 'Леонид', 'Ирина', 'Елена'))

    @staticmethod
    def random_username():
        text = ''.join(random.choices(string.ascii_lowercase, k=random.randint(6, 10)))
        year = random.randint(1960, 2005)
        return f'{text}{year}@gmail.com'

    @staticmethod
    def random_phone():
        return f'+79{random.randint(10 ** 8, 10 ** 9 - 1)}'

    @staticmethod
    def random_client():
        return random.choice(UserProfile.objects.filter(is_superuser=False, is_staff=False))

    @staticmethod
    def random_order_status():
        return random.choice([i[0] for i in Order.STATUS])

    @staticmethod
    def get_or_create_rating(consumer, product):
        rating = UserRating.objects.get_or_create(user=consumer, product=product)[0]
        rating.rating = random.randint(0, 5)
        rating.save()
