from django.urls import path

from market.views.auth import AuthView
from market.views.basket import BasketInfoView, BasketSubmitView
from market.views.category import CategoryListView
from market.views.google_auth import GoogleView
from market.views.init import InitView
from market.views.order import OrderView
from market.views.product import ProductListView
from market.views.user_profile import UserProfileView
from market.views.user_rating import UserRatingView

urlpatterns = [
    path('userlogin', AuthView.as_view()),
    path('product_list', ProductListView.as_view()),
    path('category_list', CategoryListView.as_view()),
    path('basket_list', BasketInfoView.as_view()),
    path('order_list', OrderView.as_view()),
    path('user_rating_list', UserRatingView.as_view()),
    path('user_profile', UserProfileView.as_view()),
    path('google_auth', GoogleView.as_view()),
    path('init', InitView.as_view()),
    # path('notification_list', NotifyListView.as_view()),
    path('basket_submit', BasketSubmitView.as_view()),
]
