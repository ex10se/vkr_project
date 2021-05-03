from collections import defaultdict

import pandas as pd
from surprise import Reader, Dataset, SVD
from surprise.model_selection import train_test_split

from market.models import OrderProduct


def get_top_n(predictions_list: list, n=10) -> dict:
    """
    Возвращает топ-N рекомендаций для каждого пользователя из набора предсказаний

    :param predictions_list: Список предсказаний, возвращаемых методом тестирования алгоритма
    :param n: Количество рекомендаций для вывода для каждого пользователя. По умолчанию - 10
    :return: Словарь, ключами которого являются идентификаторы пользователей (необработанные),
             а значениями - списки кортежей: [(raw item id, rating estimation), ...] размером n.
    """
    result = defaultdict(list)
    for user_id, item_id, true_rating, est, _ in predictions_list:
        result[user_id].append((item_id, est))

    for user_id, user_ratings in result.items():
        user_ratings.sort(key=lambda x: x[1], reverse=True)
        result[user_id] = user_ratings[:n]

    return result


def get_predictions_list(user_id: int) -> list:
    """
    Возвращает список id рекомендуемых продуктов

    :param user_id: id пользователя
    :return: список id продуктов
    """
    df = pd.DataFrame()
    order_products = OrderProduct.objects.filter(order__consumer_id=user_id)
    if not order_products:
        return []
    for item in order_products:
        df = df.append({
            'user': item.consumer.id,
            'item': item.product.id,
            'rating': float(item.user_rating)
        }, ignore_index=True)
    reader = Reader(rating_scale=(1, 5))
    data = Dataset.load_from_df(df[['user', 'item', 'rating']], reader)
    trainset, testset = train_test_split(data, test_size=.25)
    algo = SVD()
    predictions = algo.fit(trainset).test(testset)
    top_n = get_top_n(predictions, n=10)
    return [rate[0] for rate in top_n.get(user_id)]
