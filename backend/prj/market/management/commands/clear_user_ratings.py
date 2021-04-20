import random

from django.core.management.base import BaseCommand

from market.models import UserRating, Product, OrderProduct


class Command(BaseCommand):
    """
    Очищает рейтинги
    """

    def handle(self, *args, **options):
        UserRating.objects.all().delete()
        Product.objects.all().update(common_rating=0)
        print('Deleted all ratings')
