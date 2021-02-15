from django.urls import re_path

from market.consumers import MarketConsumer

websocket_urlpatterns = [
    re_path(r'market$', MarketConsumer.as_asgi()),
]
