import random

from django.core.management.base import BaseCommand

from market.models import UserRating, Product, OrderProduct


class Command(BaseCommand):
    """
    Заполняет таблицу UserRating случайными рейтингами
    """

    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Delete all existing ratings')

    def handle(self, *args, **options):
        if options['flush']:
            UserRating.objects.all().delete()
            Product.objects.all().update(common_rating=0)
            print('Deleted all ratings')

        print('The process is started...')
        order_products = OrderProduct.objects.all()
        for op in order_products:
            ur = UserRating.objects.get_or_create(user=op.consumer, product=op.product)[0]
            if op.user_rating == 0:
                ur.rating = random.randint(1, 5)
            ur.save()
            # расчет общего рейтинга
            Product.objects.get(pk=op.product.id).save()

        print(f'Done, ratings were added')
