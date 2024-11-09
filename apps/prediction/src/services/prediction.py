import torch
import pandas as pd
import numpy as np
from chronos import ChronosPipeline
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

def predict(pipeline: ChronosPipeline):
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