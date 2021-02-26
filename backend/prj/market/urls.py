from django.urls import path

from market.views.auth import AuthView
from market.views.basket import BasketInfoView
from market.views.category import CategoryListView
from market.views.product import ProductListView

urlpatterns = [
    path('userlogin/', AuthView.as_view()),
    path('product_list/', ProductListView.as_view()),
    path('category_list/', CategoryListView.as_view()),
    path('basket_list/', BasketInfoView.as_view()),
]
