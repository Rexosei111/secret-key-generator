from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import os

app = FastAPI()

origin = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def generate():
    try:
        stream = os.popen("openssl rand -hex 32")
    except Exception as msg:
        return HTTPException(status_code = 500, detail="Unable to generate secret key")
    output = stream.read().strip()
    return output

@app.get('/generate')
async def get_secret_key():
    key = generate()
    return {"secret_key": key}



# https://5b9hd1.deta.dev