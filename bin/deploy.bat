cd ..\frontend\ng-prj
call ng build --prod
cd ..\..\venv\Scripts
call python ..\..\backend\prj\manage.py collectstatic --noinput
cd ..\..\backend\prj
call gcloud app deploy --quiet
