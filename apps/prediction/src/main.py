import redis
import requests
import torch
import pandas as pd
import numpy as np
from chronos import ChronosPipeline
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import os
from dotenv import load_dotenv

load_dotenv()

url = os.getenv('RETURN_API_URL')

client = redis.StrictRedis(host=os.getenv('REDIS_HOST'), port=os.getenv('REDIS_PORT'), db=0)

pipeline = ChronosPipeline.from_pretrained(
        "amazon/chronos-t5-tiny",
        device_map="cpu",
        torch_dtype=torch.bfloat16,
    )

pubsub = client.pubsub()
pubsub.subscribe('send-job')

print("Aguardando mensagens...")

def predict():
    df = pd.read_csv("data/Historical Product Demand.csv")

    context = torch.tensor(df["Demand"])
    prediction_length = 4
    forecast = pipeline.predict(context, prediction_length)

    forecast_index = list(range(len(df), len(df) + prediction_length))
    low, median, high = np.quantile(forecast[0].numpy(), [0.2, 0.5, 0.9], axis=0)

    plt.figure(figsize=(10, 6))
    plt.plot(df.index, df["Demand"], label="Histórico de Demanda", color="blue")
    plt.plot(forecast_index, median, label="Previsão Mediana", color="orange")
    plt.fill_between(forecast_index, low, high, color="gray", alpha=0.3, label="Intervalo de Confiança (20%-90%)")
    plt.xlabel("Período")
    plt.ylabel("Demanda")
    plt.legend()
    plt.title("Previsão de Demanda")

    buffer = io.BytesIO()
    plt.savefig(buffer, format="png")
    buffer.seek(0)
    image_base64 = base64.b64encode(buffer.read()).decode("utf-8")
    buffer.close()

    result = {
        "forecast": forecast[0].numpy().tolist(),
        "forecast_index": forecast_index,
        "low": low.tolist(),
        "median": median.tolist(),
        "high": high.tolist(),
        "graph_image": image_base64,
    }

    return result

for message in pubsub.listen():
    if message['type'] == 'message':
        mensagem = message['data'].decode()
        print("Mensagem recebida:", mensagem)

        dados = predict()

        try:
            resposta = requests.post(url, json=dados)

            if resposta.status_code == 200:
                print("Requisição POST enviada com sucesso!")
            else:
                print(f"Erro na requisição POST: {resposta.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Erro ao enviar requisição POST: {e}")
    