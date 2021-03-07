from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include, re_path
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers

from market.views.category import CategoryViewSet
from market.views.index import index

schema_view = get_schema_view(
    openapi.Info(
        title="reCommendme API",
        default_version='v1',
        description='''
                      ### Product delivery system
                      **Swagger** [here](/swagger/)  
                      **ReDoc** [here](/redoc/)
                      ''',
        contact=openapi.Contact(email="pyth0n@inbox.ru"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index),
    re_path(r'^catalog.*', index),
    re_path(r'^basket.*', index),
    re_path(r'^profile.*', index),
    path('profile/notify', index),
    path('v1/', include([
        path('generic/', include(router.urls)),
        path('market/', include('market.urls')),
    ])),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

urlpatterns += [] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
