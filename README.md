# reCommendme - быстрая доставка продуктов
#### (Windows 10)
## Подготовка
    git clone https://github.com/ex10se/vkr_project.git
    cd vkr_project
    virtualenv -p python venv
    cd venv/Scripts
    activate.bat
    cd ../..
    pip install -r requirements.txt
    django-admin startproject prj  
    cd prj
    python manage.py migrate
    python manage.py createsuperuser
    python manage.py runserver

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
(либо установить https://graphviz.org/download/ и затем
dot -T png my_project.dot -o my_project.png)

### Импорт данных
Заполнил market/management/commands/load_from_products_csv.py
python manage.py load_from_products_csv

## swagger (drf-yasg)
Позволяет создавать rest api, документацию, систему для тестирования, 
проверка endpoints

Apps: 'drf_yasg',

## Создание API 
market/views/category.py
Роуты в prj/urls.py
Serializers - классы, описывающие входные и выходные данные, их структуру
Viewsets - содержит спец. классы (generic). Один созданные класс будет содержать 
несколько представлений
Permissions - права доступа к endpoint (url)

## Channels
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

## Список товаров
market/product.py
Постраничный вывод: settings > REST_FRAMEWORK
Сериализаторы для вывода категорий
при запросе списка товаров находятся рядом с вьюсетами: 
market/category.py и зарегистрированы в роутере prj/urls.py

в market/models.py в Product появилась функция image_tag, которая будет помогать выводить изображение в админке
для этого в соответствующем классе market/admin.py нужно добавить атрибут list_display

                        Парсинг изображений продуктов с помощью команды parse_img_products
                        используется requests для отправки запроса на получение страницы
                        и beautiful soup 4 для обработки html-кода и поиска в нем картинок

парсинг продуктов и категорий www.delikateska.ru

## Angular
Установка  
https://www.jetbrains.com/help/webstorm/angular.html  
https://angular.io/guide/setup-local  
Установить Node.js, затем:

    npm install -g @angular/cli

    cd frontend
    ng new ng-prj
    cd ng-prj
    ng serve
Исходный код проекта Angular находится в src/app
Добавляем библиотеку flex-layout https://github.com/angular/flex-layout

    npm i -s @angular/flex-layout @angular/cdk

Импорт в app.module.ts  
Написание кода страницы в файлах app.component  
Глобальные стили в styles.scss  

Добавляем https://material.angular.io/  

    ng add @angular/material

### Angular ssr (server-side rendering)
По умолчанию исходный код angular-страницы почти пустой, 
а пользователям нужно каждый раз ждать прогрузки ангуляра.
Server-side rendering позволяет решить проблему.
https://angular.io/guide/universal  
Запускается bin/ssr.bat  

SSR очень важно устанавливать с самого начала.

## Http-запросы
https://angular.io/guide/http

Сервер django/swagger не позволяет слать http-запросы другим серверам
(другим сайтам, т.е. серверу angular).  
Для решения нужно поставить и настроить
https://pypi.org/project/django-cors-headers/  

## Каталог продуктов и роутинг
    ng g m catalog
-создает модуль каталог

    ng g c catalog/list
-создает компонент list в модуле каталог

    ng g m basket
    ng g c basket/list
    ng g m profile
    ng g c profile/edit
Роуты прописываются в app-routing.module.ts

Переносим содержимое app в catalog/list

    ng g s api
Создаем сервис api, выносим getProductList() в api.service.ts

## Категории товаров
Добавляем getCategoryList в app.component

## Корзина
    ng g s basket
Создаем сервис Basket  
Знаком $ заканчивают названия объектов, на которые можно подписаться (basket$)  
В tslint.json добавил возможность переменным начинаться с подчеркивания ("variable-name": "options": "allow-leading-underscore")  

Корзина пропадает при F5 -> 
сделать ее хранение в session storage или local storage  
+ Сделать удаление из корзины

Чиню корзину отсюда https://stackblitz.com/edit/localstorage-stackoverflow  

## Дружим ангуляр с джанго
То есть повесить ангуляр на index.html джанго   
ng build собирает проект в папку dist  
В angular.json в build находятся настройки сборщика  
В нем меняем "outputPath": "../../backend/prj/static/angular", добавляем deployURL  
Нужно использовать другой сборщик, удобный для джанго:

    npm install @angular-builders/custom-webpack@8.1.0 --save
    npm install @angular-devkit/build-angular@0.803.24 --save
    npm install --save-dev webpack-bundle-tracker@0.4.3
    
Custom-webpack позволяет задавать дополнительные опции для сборки  
webpack-bundle-tracker "выплевывает" статистику компиляции 
в отдельный файл, который будет использован джанго, 
чтобы найти скрипты для включения их в страницу, 
потому что при каждой сборке их имена будут меняться  

Создаем файл с настройками билдера django-webpack.config.js
https://github.com/owais/django-webpack-loader

ng build --watch обновляет изменения исходников сервера 
в реальном времени 

## Авторизация через гугл
Добавляем приложение rest_framework.authtoken  
Добавляем google_auth

    npm i -s angularx-social-login@2.1.1
Устанавливаем на фронтенде 

## Авторизация по токену
Нужна чтоб оставалась авторизация и после обновления страницы.
Создаем InitView

    ng g s login
    ng g s auth-interceptor
Interceptor будет вешать на все запросы заголовок с токеном авторизации.

### Далее самостоятельно
Пагинация каталога +
Цена товара +

Команды для генерации случайных данных бд:
 Пользователи +
 Оценки пользователей +

Подсчет общей оценки продукта +

#### Рейтинговая система
    ng add @ng-bootstrap/ng-bootstrap


### Рендеринг на стороне сервера
https://senior.ua/articles/rendering-na-storone-servera-v-angular

    npm install --save @angular/platform-server @nguniversal/module-map-ngfactory-loader ts-loader @nguniversal/express-engine

Сервис socket:

    ng g s socket








Для мобильного приложения на ангуляре можно Ionic

ng serve
ng install

Запуск серверов:
ng build --watch
python manage.py runserver

