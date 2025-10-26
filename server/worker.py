"""
Legacy RQ worker runner (deprecated).

NOTE: This project now uses Celery for background processing.
Use the following commands instead:

Celery Worker:
    celery -A server.tasks.celery_notification_tasks.celery_app worker --loglevel=info

Docker Compose (recommended):
    docker compose -f server/docker-compose.celery.yml up

This file is kept for backward compatibility only.
"""
import os
from rq import Worker, Queue
from redis import Redis

REDIS_URL = os.getenv("REDIS_URL", "redis://localhost:6379/0")
listen = [os.getenv("RQ_DEFAULT_QUEUE", "default")]

conn = Redis.from_url(REDIS_URL)

if __name__ == "__main__":
    print("WARNING: RQ worker is deprecated. Please use Celery instead.")
    print("Run: celery -A server.tasks.celery_notification_tasks.celery_app worker")
    worker = Worker(map(Queue, listen), connection=conn)
    worker.work()
