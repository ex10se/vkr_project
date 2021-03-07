import random

from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from names_dataset import NameDataset

from market.models import UserProfile


class Command(BaseCommand):
    """
    Заполняет таблицу пользователей случайными данными
    """

    def add_arguments(self, parser):
        parser.add_argument('--flush', action='store_true', help='Delete all existing users except SU and Staff')
        parser.add_argument('users_count', nargs='?', type=int, default=1, help='Count of users to create (def. 1)')

    def handle(self, *args, **options):
        if options['flush']:
            User.objects.filter(is_superuser=False, is_staff=False).delete()
            print('Deleted all users')

        first_names_clear = [''.join(filter(str.isalpha, name.capitalize())) for name in NameDataset().first_names]
        last_names_clear = [''.join(filter(str.isalpha, name.capitalize())) for name in NameDataset().last_names]
        count = options['users_count']
        # TODO на деплой сделать password = None
        password = '123'

        print('The process is started...')

        for i in range(count):
            first_name = random.choice(first_names_clear)
            last_name = random.choice(last_names_clear)
            username = f'{last_name + first_name + str(random.randint(1960, 2005)).lower()}@mail.ru'
            phone = '+79' + str(random.randint(000000000, 999999999))

            user = UserProfile()
            user.username = username
            user.first_name = first_name
            user.last_name = last_name
            user.phone = phone
            user.is_active = True
            user.is_superuser = False
            user.is_staff = False
            user.set_password(password)
            user.save()

        print(f'Done, {count} users were created with password {password}')
