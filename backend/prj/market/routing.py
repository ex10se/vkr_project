from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import re_path

from market import consumers
from market.consumers import MarketConsumer

# application = ProtocolTypeRouter({
#
#     'websocket': AuthMiddlewareStack(
#         URLRouter([
#             re_path(r'market$', MarketConsumer),
#         ]
#         )
#     ),
#
# })

websocket_urlpatterns = [
    re_path(r'market$', consumers.MarketConsumer.as_asgi()),
]
