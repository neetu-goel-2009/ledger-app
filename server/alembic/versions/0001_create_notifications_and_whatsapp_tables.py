"""create notifications, device_tokens and whatsapp_messages tables

Revision ID: 0001
Revises: 
Create Date: 2025-10-26 00:00:00.000000
"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '0001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        'device_tokens',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, nullable=False, index=True),
        sa.Column('device_token', sa.String(500), nullable=False),
        sa.Column('platform', sa.String(50), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
    )

    op.create_table(
        'notifications',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('user_id', sa.Integer, nullable=False, index=True),
        sa.Column('title', sa.String(255), nullable=True),
        sa.Column('message', sa.Text, nullable=True),
        sa.Column('status', sa.String(50), nullable=True),
        sa.Column('notification_id', sa.String(200), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
    )

    op.create_table(
        'whatsapp_messages',
        sa.Column('id', sa.Integer, primary_key=True),
        sa.Column('to_number', sa.String(50), nullable=False),
        sa.Column('message', sa.Text, nullable=True),
        sa.Column('status', sa.String(50), nullable=True),
        sa.Column('message_id', sa.String(200), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.text('now()')),
    )


def downgrade():
    op.drop_table('whatsapp_messages')
    op.drop_table('notifications')
    op.drop_table('device_tokens')
