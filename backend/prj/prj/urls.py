from django.contrib import admin
from django.urls import path, include
from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework import permissions, routers

from market.views.category import CategoryViewSet

schema_view = get_schema_view(
    openapi.Info(
        title="reCommendme API",
        default_version='v1',
        description='''
      ### Product delivery system
      **Swagger** [here](/swagger/)  
      **ReDoc** [here](/redoc/)
      ''',
        contact=openapi.Contact(email="admin@admin.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)


router = routers.DefaultRouter()
router.register(r'category', CategoryViewSet)

urlpatterns = [
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
    path('v1/', include(router.urls)),
]
