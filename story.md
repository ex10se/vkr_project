## swagger (drf-yasg)
Позволяет создавать rest api, документацию, систему для тестирования, 
проверка endpoints

Apps: 'drf_yasg',

## Создание API 
market/views/category.py
Роуты в prj/urls.py
Serializers - классы, описывающие входные и выходные данные, их структуру
Viewsets - содержит спец. классы (generic). Один созданный класс будет содержать 
несколько представлений
Permissions - права доступа к endpoint (url)

## Channels
Расширяет возможности django, накладывая поверх http WebSockets 
для поддержания постоянного соединения между клиентом и сервером 
и реагирования на клиенте на события сервера и наоборот, 
передачи сообщений в полнодуплексном режиме от сервера клиенту и наоборот

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
Сериализаторы для вывода категорий при запросе списка товаров находятся рядом с вьюсетами: 
market/category.py и зарегистрированы в роутере prj/urls.py

в market/models.py в Product появилась функция image_tag, которая будет помогать выводить изображение в админке
для этого в соответствующем классе market/admin.py нужно добавить атрибут list_display

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
Профиль со сменой данных +

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
Для WebSocket запросов — они стали передаваться не по порту 8000, а по разным

Для списка заказов

    ng g m order
    ng g c order/list


Увеличение фоток продуктов при клике

    npm i @crystalui/angular-lightbox --save

# Деплой в Google Cloud
Перенос папок media, static из локального диска в Google Cloud Storage выполняется командой 

    gsutil -m cp -r путь-до-папки gs://recommendme-303303.appspot.com

    gsutil ls gs://recommendme-303303.appspot.com/
    gsutil -m rm -r gs://recommendme-303303.appspot.com/*100x100*


    https://django-storages.readthedocs.io/en/latest/backends/gcloud.html
- Для настройки удаленного хранилища media- и static-файлов


    ng build --prod
    python manage.py collectstatic
    gcloud app deploy


Создание docker-образа:

    docker build .

Сборка образа:

    docker-compose build

Запуск контейнера:

    docker-compose up -d



## Оптимизация базы данных (слишком долгие запросы)
- Объединил таблицы Product и Store - GET-запрос Product стал выполняться за 300 мс вместо 1200 мс!








## Всякое
Поменял в angular.json "deployUrl": "/static/angular/" на "deployUrl": "/" для удобства разработки

Для мобильного приложения на ангуляре можно Ionic

    ng serve
    ng install

Запуск серверов в варианте webpack (angular внутри django):

    ng build --watch
    python manage.py runserver


Запись зависимостей в requirements.txt

    pipreqs --force
    pip list --format freeze > requirements.txt


    runserver --insecure


# Recommender

https://github.com/benfred/implicit/
Установить средства сборки c++ в visual studio installer, затем:

    pip install implicit

