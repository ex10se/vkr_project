import pandas as pd
from django.db.models import F
from surprise import Reader, Dataset, KNNWithMeans
from surprise.dataset import DatasetAutoFolds
from surprise.model_selection import GridSearchCV, train_test_split

from market.models import OrderProduct, Recommendation


def pick_best_params(data: DatasetAutoFolds, algo=KNNWithMeans) -> dict:
    """
    Вычисляет лучшие параметры с помощью Grid Search cross-validation
    :param algo: алгоритм
    :param data: объект Dataset на вход
    :return: словарь с параметрами sim_options
    """
    sim_options = {
        "name": ["msd", "cosine"],
        "min_support": [3, 4, 5],
        "user_based": [False, True],
    }
    param_grid = {
        'n_epochs': [5, 10],
        'lr_all': [0.002, 0.005],
        'reg_all': [0.4, 0.6],
        "sim_options": sim_options
    }
    gs = GridSearchCV(algo, param_grid, measures=["rmse", "mae"], cv=3)
    gs.fit(data)
    return gs.best_params["rmse"]


def get_predictions_list(user_id: int = None):
    """
    Возвращает список рекомендуемых продуктов. Если не задан user_id, возвращает расчет для каждого пользователя
    :param user_id: id пользователя
    :return: словарь с id продуктов и пользователя (-ей)
    """
    df = pd.DataFrame(OrderProduct.objects.annotate(
        user=F('order__consumer'), item=F('product'),
        rating=F('product__userrating__rating')).values('user', 'item', 'rating'))
    reader = Reader(rating_scale=(0, 5))
    data = Dataset.load_from_df(df[['user', 'item', 'rating']], reader)
    algo = KNNWithMeans(sim_options=pick_best_params(data))

    trainset, testset = train_test_split(data, test_size=.25)
    predictions = algo.fit(trainset).test(testset)

    if user_id:
        return [{'user': user_id, 'item': pred[1]} for i, pred
                in enumerate(sorted(predictions, key=lambda x: x[2], reverse=True)) if predictions[i][0] == user_id]
    else:
        return [{'user': pred[0], 'item': pred[1]} for i, pred
                in enumerate(sorted(predictions, key=lambda x: x[2], reverse=True))]


def fill_recommendations(data: list, clear=False):
    """
    Заполняет таблицу рекомендаций
    :param clear: предварительно очистить таблицу
    :param data: список словарей с ключами user и item, id в качестве значений
    """
    recommendations = []
    for n in data:
        recommendations.append(Recommendation(user_id=n['user'], item_id=n['item']))
    if clear:
        Recommendation.objects.all().delete()
    Recommendation.objects.bulk_create(recommendations)
