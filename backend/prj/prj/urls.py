from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions

from market.views.index import index

schema_view = get_schema_view(
    openapi.Info(
        title="reCommendme API",
        default_version='v1',
        description='''
                    ### Сервис доставки продуктов
                    [**Swagger**](/swagger/)  
                    [**ReDoc**](/redoc/)
                    ''',
        contact=openapi.Contact(email="pyth0n@inbox.ru"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('', index),
    re_path(r'^catalog.*', index),
    re_path(r'^basket.*', index),
    re_path(r'^profile.*', index),
    re_path(r'^order.*', index),
    path('v1/', include([
        path('market/', include('market.urls')),
    ])),
]

urlpatterns += [
   path('admin/', admin.site.urls),
   path('swagger/', schema_view.with_ui('swagger', cache_timeout=None), name='schema-swagger-ui'),
   path('redoc/', schema_view.with_ui('redoc', cache_timeout=None), name='schema-redoc')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
