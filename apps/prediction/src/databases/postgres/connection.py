import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def handle_connect():
    conn = psycopg2.connect(
        host=f"#{os.getenv('PG_HOST')}:#{os.getenv('PG_PORT')}",
        database=os.getenv('PG_DATABASE'),
        user=os.getenv('PG_USER'),
        password=os.getenv('PG_PASSWORD')
    )

    return conn