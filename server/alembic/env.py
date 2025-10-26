import os
import sys
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# add project root to sys.path so imports work when alembic runs from repo root
HERE = os.path.dirname(os.path.dirname(__file__))
if HERE not in sys.path:
    sys.path.append(HERE)

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
fileConfig(config.config_file_name)

# Import your model's MetaData object here
from server.sql_app.database import Base  # noqa: E402

# Import models so they are registered on Base.metadata
try:
    # import packages to ensure models are loaded
    import server.sql_app.notifications.models as _notif_models  # noqa: F401,E402
    import server.sql_app.whatsapp.models as _wh_models  # noqa: F401,E402
except Exception:
    pass

target_metadata = Base.metadata


def get_url():
    # Prefer RDS_URL env var
    return os.getenv('RDS_URL') or os.getenv('SQLALCHEMY_DATABASE_URL') or config.get_main_option('sqlalchemy.url')


def run_migrations_offline():
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    configuration = config.get_section(config.config_ini_section)
    configuration['sqlalchemy.url'] = get_url()

    connectable = engine_from_config(
        configuration,
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
