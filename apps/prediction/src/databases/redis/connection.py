import redis
import os
from dotenv import load_dotenv

load_dotenv()

def handle_connect():
    conn = redis.StrictRedis(host=os.getenv('REDIS_HOST'), port=os.getenv('REDIS_PORT'), db=0)
    return conn