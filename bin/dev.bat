cd ..\frontend\ng-prj
call ng build
cd ..\..\venv\Scripts
set DJANGO_DEBUG=1
call python ..\..\backend\prj\manage.py runserver
