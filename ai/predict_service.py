from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
from prophet import Prophet
import pickle

app = FastAPI()

# Load pre-trained model (or train here)
model_file = "crop_price_model.pkl"
try:
    model = pickle.load(open(model_file, "rb"))
except:
    model = None

class PredictRequest(BaseModel):
    crop: str
    location: str

@app.post("/predict")
def predict(req: PredictRequest):
    if not model:
        return {"prediction": "Not enough data"}
    future = pd.DataFrame({"ds": pd.date_range(start=pd.Timestamp.today(), periods=7)})
    forecast = model.predict(future)
    return {"crop": req.crop, "location": req.location, "forecast": forecast[['ds','yhat']].to_dict(orient="records")}
