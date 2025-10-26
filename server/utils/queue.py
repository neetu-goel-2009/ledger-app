"""
Queue utility for enqueueing Celery tasks.

Provides a unified interface for enqueueing background tasks to Celery.
"""
import os
import logging
from typing import Any, Iterable, Mapping, Optional

from server.tasks.celery_notification_tasks import celery_app

logger = logging.getLogger("server.queue")


def enqueue_task(func_name: str, args=(), kwargs=None):
    """
    Enqueue a Celery task by name.
    
    Args:
        func_name: Registered task name (e.g., 'send_mobile_notification')
        args: Tuple of positional arguments for the task
        kwargs: Dict of keyword arguments for the task
        
    Returns:
        Celery AsyncResult object
        
    Example:
        enqueue_task("send_mobile_notification", args=(101, "Title", "Body"))
    """
    task = celery_app.send_task(func_name, args=args, kwargs=kwargs or {})
    logger.info("Enqueued celery task %s", func_name)
    return task
