from google.oauth2 import service_account
from market.models import UserProfile, UserRating, Product

# credentials = service_account.Credentials.from_service_account_file(
#     'sa_for_rec_ai/recommendme-303303-5f0320abeef4.json')

user = UserProfile.objects.get(id=1239)
ratings = UserRating.objects.filter(user=user)
products = Product.objects.all()

print(ratings)
