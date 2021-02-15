# reCommendme - быстрая доставка продуктов
### (Windows 10)
## Подготовка
`git clone https://github.com/ex10se/vkr_project.git`

`cd vkr_project`

`virtualenv -p python venv`

`cd venv/Scripts`

`activate.bat`

`cd ../..`

`pip install -r requirements.txt`

django-admin startproject prj  

`cd prj`

`python manage.py migrate`

`python manage.py createsuperuser`

`python manage.py runserver`

python manage.py startapp market
Apps: 'market',
Заполнил модели в market/models.py
python manage.py makemigrations
python manage.py migrate
Регистрация моделей в market/admin.py


### Диграмма классов (UML)
pip install pyparsing pydot django-extensions
Apps: 'django_extensions'
python manage.py graph_models -a > my_project.dot
Засунуть содержимое .dot в https://dotuml.com/playground.html 
(либо установить https://graphviz.org/download/ >
dot -T png my_project.dot -o my_project.png)

### Импорт данных
Заполнил market/management/commands/load_from_products_csv.py
python manage.py load_from_products_csv

### swagger (drf-yasg)
позволяет создавать rest api, документацию, систему для тестирования, 
проверка endpoints

Apps: 'drf_yasg',

#### Создание API 
market/views/category.py
Роуты в prj/urls.py
Serializers - классы, описывающие входные и выходные данные, их структуру
Viewsets - содержит спец. классы (generic). Один созданные класс будет содержать 
несколько представлений
Permissions - права доступа к endpoint (url)

### Channels
Расширяет возможности django, накладывая поверх http WebSockets 
для поддержания постоянного соединения между клиентом и сервером 
и реагирования на клиенте на события сервера и наоборот, 
передавания сообщений в дуплексе от сервера клиенту и наоборот

(Инфу из видео https://youtu.be/HHzWDXjE5To 
переделывал по инструкции
https://channels.readthedocs.io/en/stable/tutorial/part_2.html)
market/consumers.py
market/routing.py
prj/asgi.py
index.html

#### Список товаров
market/product.py
Постраничный вывод: settings > REST_FRAMEWORK
Сериализаторы для вывода категорий и подкатегорий
при запросе списка товаров находятся рядом с вьюсетами: 
market/category(aisle).py и зарегистрированы в роутере prj/urls.py

в market/models.py в Product появилась функция image_tag, которая будет помогать выводить изображение в админке
для этого в соответствующем классе market/admin.py нужно добавить атрибут list_display

парсинг изображений продуктов с помощью команды parse_img_products
используется requests для отправки запроса на получение страницы
и beautiful soup 4 для обработки html-кода и поиска в нем картинок

в результате я не стал сохранять изображения на компьюьтере, потому что их вышло бы почти 50000 штук
изображения берутся напрямую из ebay