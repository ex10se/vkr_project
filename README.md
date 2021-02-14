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
Засунуть содержимое .dot в https://dotuml.com/playground.html (либо установить https://graphviz.org/download/ > dot -T png my_project.dot -o my_project.png)

### Импорт данных
Заполнил market/management/commands/load_from_products_csv.py
python manage.py load_from_products_csv

### swagger (drf-yasg)
позволяет создавать rest api, документацию, систему для тестирования, проверка endpoints

Apps: 'drf_yasg',

#### Создание API 
market/views/category.py
Serializers - классы, описывающие входные и выходные данные, их структуру
Viewsets - содержит спец. классы (generic). Один созданные класс будет содержать несколько представлений
Permissions - права доступа к endpoint (url)

