# reCommendme - быстрая доставка продуктов
### (Windows 10)
## Подготовка
`git clone https://github.com/ex10se/vkr_project.git`

`cd vkr_project/backend`

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
'market',
модели в market/models.py
python manage.py makemigrations
python manage.py migrate
регистрация в market/admin.py


###Диграмма классов (UML)
pip install pyparsing pydot django-extensions
'django_extensions'
python manage.py graph_models -a > my_project.dot
Засунуть содержимое .dot в https://dotuml.com/playground.html (либо установить https://graphviz.org/download/ > dot -T png my_project.dot -o my_project.png)

