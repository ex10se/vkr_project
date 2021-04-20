# reCommendme - быстрая доставка продуктов
Static-файлы хранятся в проекте из-за особенностей webpack. Media-файлы хранятся в Google Cloud Storage.

[Результат](https://recommendme-303303.ew.r.appspot.com/)
## Подготовка
    git clone https://github.com/ex10se/vkr_project.git
    cd vkr_project/backend/prj
## Docker
    docker-compose up --build 
Также поднять PostgreSQL на 5432
## Разработка
### 1. Django сервер разработки
Для базы данных Google Cloud SQL необходимо скачать cloud_sql_proxy и запустить с параметрами

    cloud_sql_proxy -instances=<INSTANCE-NAME>=tcp:5678
Запуск сервера:

    virtualenv -p python venv
    cd venv/Scripts
    activate.bat
    cd ../..
    pip install -r requirements.txt
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

При ошибке "WebpackBundleLookupError at /catalog. Cannot resolve bundle vendor." запустить пересборку Angular (ng build).
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
## Деплой в Google App Engine (Windows 10)
В backend/prj/prj/settings.py: DEBUG=False,

    cd bin
    deploy.bat
