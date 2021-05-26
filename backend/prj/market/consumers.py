import json

from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer


class MarketConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()
        async_to_sync(self.channel_layer.group_add)("notifications", self.channel_name)

    def disconnect(self, close_code):
        pass

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        self.send(text_data=json.dumps({'message': message}))

    def send_notify(self, event):
        print(event)
        self.send(text_data=json.dumps({"action": "update_notify", "data": "Update please"}))
