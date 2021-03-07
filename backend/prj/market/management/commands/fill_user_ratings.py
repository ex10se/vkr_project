import random

from django.core.management.base import BaseCommand
from django.db import IntegrityError

from market.models import UserProfile, UserRating, Product, Store


class Command(BaseCommand):
    """
    Заполняет таблицу UserRating случайными рейтингами
    """

    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Delete all existing ratings')
        parser.add_argument('ratings', nargs='?', type=int, default=100, help='Count of ratings per user (def. 100)')

    def handle(self, *args, **options):
        if options['flush']:
            UserRating.objects.all().delete()
            print('Deleted all ratings')

        users = UserProfile.objects.filter(is_staff=False, is_superuser=False)
        if not users.count():
            raise Exception('The table `UserProfile` is empty, you have to fill it first')

        errors = 0
        ratings_per_user = options['ratings']
        products = Product.objects.all()

        print('The process is started...')
        for user in users:
            for rtg in range(ratings_per_user):
                try:
                    product = random.choice(products)
                    rating = UserRating()
                    rating.user = user
                    rating.product = product
                    rating.rating = random.randrange(0, 51) / 10  # число от 0.0 до 5.0
                    rating.save()
                except IntegrityError:
                    errors += 1

        # расчет общего рейтинга
        for store in Store.objects.all():
            store.save()

        print(f'Done, {users.count()}*{ratings_per_user} ',
              f'(subtract {errors} errors)' if errors else '',
              f' = {users.count() * ratings_per_user - errors} ratings were added. ',
              f'The rating column of the Store model has been recalculated.', sep='')
