"""
Celery configuration.

Configures broker, backend, and serialization for Celery workers.
"""
import os

# Redis broker and result backend
broker_url = os.getenv("CELERY_BROKER_URL", "redis://localhost:6379/0")
result_backend = os.getenv("CELERY_RESULT_BACKEND", "redis://localhost:6379/0")

# Serialization and timezone
accept_content = ["json"]
task_serializer = "json"
result_serializer = "json"
timezone = "UTC"
enable_utc = True
