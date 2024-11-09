import requests
import torch
from chronos import ChronosPipeline
import os
from dotenv import load_dotenv

from databases.redis.connection import handle_connect as redis_connect

from services.prediction import predict
from services.redis_listener import subscribe

load_dotenv()

url = os.getenv('RETURN_API_URL')

client = redis_connect()

pipeline = ChronosPipeline.from_pretrained(
        "amazon/chronos-t5-tiny",
        device_map="cpu",
        torch_dtype=torch.bfloat16,
    )

def handle_predict():
    dados = predict(pipeline)

    try:
        resposta = requests.post(url, json=dados)

        if resposta.status_code == 200:
            print("Requisição POST enviada com sucesso!")
        else:
            print(f"Erro na requisição POST: {resposta.status_code}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao enviar requisição POST: {e}")

subscribe(client, 'send-job', 'predict', handle_predict)