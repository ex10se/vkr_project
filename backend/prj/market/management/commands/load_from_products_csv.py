import pandas as pd
from django.core.management.base import BaseCommand
from market.models import Category, Product, Aisle
from prj.settings import DATA_DIR


class Command(BaseCommand):
    """
    Создаёт команду python manage.py load_from_csv,
    которая позволяет заполнить таблицы Category, Product, Aisle,
    из products.csv, фильтруя их по категориям и подкатегориям
    """

    def handle(self, *args, **options):
        input('Are you sure you want to flush the database?')
        print('Flushing db tables')
        Category.objects.all().delete()
        Aisle.objects.all().delete()
        Product.objects.all().delete()

        df = pd.read_csv(DATA_DIR / 'products.csv')
        print(f'Start importing from {DATA_DIR}\\products.csv...')
        for index, row in df.iterrows():
            if not Category.objects.filter(name=row['department']):
                category = Category()
                category.id = row['department_id']
                category.name = row['department']
                category.save()

            if not Aisle.objects.filter(name=row['aisle']):
                aisle = Aisle()
                aisle.id = row['aisle_id']
                aisle.category_id = row['department_id']
                aisle.name = row['aisle']
                aisle.save()

        for index, row in df.iterrows():
            product = Product()
            product.name = row['product_name']
            product.category_id = row['department_id']
            product.aisle_id = row['aisle_id']
            product.save()

        print(f'Success!')
