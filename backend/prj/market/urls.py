from django.urls import path
from rest_framework import routers

from market.views.basket import BasketInfoView, BasketSubmitView
from market.views.category import CategoryViewSet
from market.views.google_auth import GoogleAuthView
from market.views.init import InitView
from market.views.order import OrderView
from market.views.product import ProductListView, PopularProductListView
from market.views.recommender import RecommenderListView
from market.views.user_profile import UserProfileView
from market.views.user_rating import UserRatingView

router = routers.DefaultRouter()
router.register(r'category_list', CategoryViewSet, basename='categories')

urlpatterns = [
    path('product_list', ProductListView.as_view()),
    path('popular_products', PopularProductListView.as_view()),
    path('basket_list', BasketInfoView.as_view()),
    path('order_list', OrderView.as_view()),
    path('user_rating_list', UserRatingView.as_view()),
    path('user_profile', UserProfileView.as_view()),
    path('google_auth', GoogleAuthView.as_view()),
    path('init', InitView.as_view()),
    path('basket_submit', BasketSubmitView.as_view()),
    path('predictions', RecommenderListView.as_view()),
]

urlpatterns += router.urls
