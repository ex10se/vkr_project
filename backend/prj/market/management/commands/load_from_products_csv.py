# import pandas as pd
# from django.core.management.base import BaseCommand
# from market.models import Category, Product
#
#
# class Command(BaseCommand):
#     """
#     Создаёт команду python manage.py load_from_csv,
#     которая позволяет заполнить таблицы Category, Product
#     из products.csv, фильтруя их по категориям и подкатегориям
#     """
#
#     def handle(self, *args, **options):
#         input('Are you sure you want to flush the database?')
#         print('Flushing db tables')
#         Category.objects.all().delete()
#         Product.objects.all().delete()
#
#         print(f'Start importing from {DATA_DIR}\\products.csv...')
#         for index, row in df.iterrows():
#             if not Category.objects.filter(name=row['department']):
#                 category = Category()
#                 category.id = row['department_id']
#                 category.name = row['department']
#                 category.save()
#
#         for index, row in df.iterrows():
#             product = Product()
#             product.name = row['product_name']
#             product.category_id = row['department_id']
#             product.aisle_id = row['aisle_id']
#             product.save()
#
#         print(f'Success!')
