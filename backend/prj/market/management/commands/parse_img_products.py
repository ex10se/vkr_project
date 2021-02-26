# import requests
# from bs4 import BeautifulSoup
# from django.core.management.base import BaseCommand
#
# from market.models import Product
#
# _WRONG_IMG_URL = 'https://secureir.ebaystatic.com/pictures/aw/pics/stockimage1.jpg'
#
#
# class Command(BaseCommand):
#     """
#         Парсит изображения из интернета для товаров
#     """
#     def handle(self, *args, **options):
#         print('Parsing started...')
#         for item in Product.objects.all().reverse():
#             if item.image == "" or item.image == _WRONG_IMG_URL:
#                 # преобразовываем имя продукта в текст поискового запроса
#                 title = str(item.name).replace(',', '%2C').replace(' ', '+')
#                 url = f'https://www.ebay.com/sch/i.html?_nkw={title}'
#                 req = requests.get(url)
#                 try:
#                     soup = BeautifulSoup(req.text, "html.parser")
#                     # в хроме находим нужный элемент и подставляем его атрибуты в soup.find
#                     content = soup.find('div', {'class': 's-item__image-wrapper'})
#                     # в том нужном элементе ищем картинку
#                     img = content.find('img', {'class': 's-item__image-img'})
#                     # не записываем ненастоящие картинки
#                     img_url = img.get('src') if img.get('src') != _WRONG_IMG_URL else ""
#                     print(f'{item.id}/{Product.objects.count()}: {img_url}')
#                     # сохраняем url в базу данных
#                     item.image = img_url
#                     item.save()
#                 except AttributeError:
#                     continue
#
