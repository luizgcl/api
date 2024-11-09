from redis import Redis

def subscribe(conn: Redis, channel: str, message: str, callback):
    pubsub = conn.pubsub()
    pubsub.subscribe(channel)

    for received_message in pubsub.listen():
        if received_message['type'] == 'message':
            decoded_message = received_message['data'].decode()
            if message == decoded_message:
                callback()