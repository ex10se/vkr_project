import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import market.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'prj.settings')

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": AuthMiddlewareStack(
        URLRouter(
            market.routing.websocket_urlpatterns
        )
    ),
})