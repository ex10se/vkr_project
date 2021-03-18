import os
from pathlib import Path

from google.oauth2 import service_account
from prj.secrets.secrets import DB_PASSWORD, DJANGO_SECRET_KEY

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = DJANGO_SECRET_KEY
# SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY")
DEBUG = True
# DEBUG = False
# DEBUG = int(os.environ.get("DEBUG", default=0))
ALLOWED_HOSTS = ('*',)
# ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS").split(" ")

INSTALLED_APPS = (
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
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

# Local database
# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.sqlite3',
#         'NAME': BASE_DIR / 'db.sqlite3',
#     }
# }

# [START db_setup]
if os.getenv('GAE_APPLICATION', None):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'HOST': '/cloudsql/recommendme-303303:europe-north1:postgres-1',
            'NAME': 'postgres',
            'USER': 'postgres',
            'PASSWORD': DB_PASSWORD,
            # 'PASSWORD': os.environ.get("DB_PASSWORD"),
        }
    }
else:
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'HOST': '127.0.0.1',
            'PORT': '5678',
            'NAME': 'postgres',
            'USER': 'postgres',
            'PASSWORD': DB_PASSWORD,
            # 'PASSWORD': os.environ.get("DB_PASSWORD"),
        }
    }
# [END db_setup]

# Use a in-memory sqlite3 database when testing in CI systems
if os.getenv('TRAMPOLINE_CI', None):
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }

AUTH_PASSWORD_VALIDATORS = (
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'}
)

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Moscow'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# STATICFILES_FINDERS = [
#     'django.contrib.staticfiles.finders.FileSystemFinder',  # searches in STATICFILES_DIRS
#     'django.contrib.staticfiles.finders.AppDirectoriesFinder',  # searches in STATIC subfolder of each app
# ]

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

# media files into google cloud storage bucket
GS_BUCKET_NAME = 'recommendme-303303.appspot.com'
DEFAULT_FILE_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'
# STATICFILES_STORAGE = 'storages.backends.gcloud.GoogleCloudStorage'

GS_CREDENTIALS = service_account.Credentials.from_service_account_file(
    BASE_DIR / "prj/secrets/recommendme-303303-b9ec319ab4d9.json"
)
