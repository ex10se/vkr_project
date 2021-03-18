# reCommendme - быстрая доставка продуктов
#### (Windows 10)
Static-файлы хранятся в проекте из-за особенностей webpack. Media-файлы хранятся в Google Cloud Storage.
## Подготовка
    git clone https://github.com/ex10se/vkr_project.git
    cd vkr_project/backend/prj

## Разработка
### 1. Django сервер разработки
    virtualenv -p python venv
    cd venv/Scripts
    activate.bat
    cd ../..
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver
### 2. Angular, варианты:
#### 2.1. Запуск автоматической пересборки webpack'а для Django
Установить Node.js, затем:

    cd frontend/ng-prj
    ng build --watch
#### 2.2. Сервер разработки
В frontend/ng-prj/angular.json заменить 26 строку

    "deployUrl": "/static/angular/",
на 

    "deployUrl": "/",
Запуск:

    ng serve
## Деплой в Google App Engine
В backend/prj/prj/settings.py: DEBUG=False,

    cd bin
    deploy.bat
