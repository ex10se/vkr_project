import os
from pathlib import Path

from google.oauth2 import service_account
from prj.secrets.secrets import DJANGO_SECRET_KEY, DB_PASSWORD, DB_HOST

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = DJANGO_SECRET_KEY
DEBUG = int(os.environ.get('DEBUG', default=1))
ALLOWED_HOSTS = ['*']

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'rest_framework',
    'drf_yasg',
    'channels',
    'corsheaders',
    'rest_framework.authtoken',
    'webpack_loader',
    'market.apps.MarketConfig',
)

MIDDLEWARE = (
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
)

ROOT_URLCONF = 'prj.urls'

TEMPLATES = (
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
)

WSGI_APPLICATION = 'prj.wsgi.application'
ASGI_APPLICATION = 'prj.asgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'HOST': DB_HOST,
        'NAME': 'postgres',
        'USER': 'postgres',
        'PASSWORD': DB_PASSWORD,
    }
}

AUTH_PASSWORD_VALIDATORS = (
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'}
)

LANGUAGE_CODE = 'ru-ru'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'
STATICFILES_DIRS = (
    BASE_DIR / 'assets',
)

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# DRF settings
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'PAGE_SIZE': 24,
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ),
}

# django-cors-headers
CORS_ALLOW_ALL_ORIGINS = True

CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': 'angular/',
        'STATS_FILE': BASE_DIR / 'assets/webpack-stats-angular.json',
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# media files into google cloud storage bucket
GS_BUCKET_NAME = 'recommendme-313210.appspot.com'
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
# STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    f"{BASE_DIR}/prj/secrets/recommendme-313210-021766baa7a9.json"
)

SITE_ID = 1
