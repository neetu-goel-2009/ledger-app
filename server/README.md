# Ledger App - Server Documentation

FastAPI backend with WhatsApp messaging and mobile push notification modules, featuring Celery-based background processing.

## Quick Start

1. **Install dependencies:**

```powershell
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt
```

2. **Configure environment variables** in `server/.env` (see Environment Variables section).

3. **Run database migrations:**

```powershell
alembic -c server/alembic.ini upgrade head
```

4. **Start infrastructure** (Redis, Celery worker, beat):

```powershell
docker compose -f server/docker-compose.celery.yml up -d
```

5. **Start the application:**

```powershell
uvicorn server.main:app --reload --port 8000
```

## Environment Variables

Configure these in `server/.env`:

```properties
# Database
RDS_URL=postgresql://postgres:postgres@localhost:5432/contractor-app

# WhatsApp Provider (mock|twilio|meta)
WHATSAPP_PROVIDER=mock
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_WHATSAPP_FROM=+14155238886
META_WHATSAPP_TOKEN=your_meta_token
META_PHONE_NUMBER_ID=your_phone_number_id

# Mobile Notifications (mock|fcm)
NOTIFICATION_PROVIDER=mock
FCM_SERVER_KEY=your_fcm_server_key

# Celery / Redis
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0

# Retry Configuration
WHATSAPP_RETRIES=3
WHATSAPP_BACKOFF=0.5
NOTIFICATION_RETRIES=3
NOTIFICATION_BACKOFF=0.5
```

**Note:** Use `mock` providers for development. Set to `twilio`/`meta` or `fcm` for production.

## API Modules

### WhatsApp Messaging

Send WhatsApp messages via Twilio, Meta Cloud API, or mock provider.

**Endpoints:**
- `POST /api/whatsapp/send` - Send message
  ```json
  { "to": "+911234567890", "message": "Hello", "templateId": null, "mediaUrl": null }
  ```
- `POST /api/whatsapp/send-template` - Send template message
  ```json
  { "to": "+911234567890", "templateId": "invoice_alert", "parameters": ["John", "₹500"] }
  ```
- `GET /api/whatsapp/status/{messageId}` - Check delivery status

**Example:**
```powershell
$body = @{ to = "+911234567890"; message = "Hello" } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8000/api/whatsapp/send" -Method Post -Body $body -ContentType "application/json"
```

### Mobile Push Notifications

Send push notifications via Firebase Cloud Messaging (FCM) or mock provider.

**Endpoints:**
- `POST /api/notifications/register-device` - Register device token
  ```json
  { "userId": 101, "deviceToken": "fcm_token", "platform": "android" }
  ```
- `POST /api/notifications/send` - Send notification (enqueued via Celery)
  ```json
  { "userId": 101, "title": "Payment Reminder", "body": "Invoice due", "data": { "invoiceId": 102 } }
  ```
- `GET /api/notifications/status/{notificationId}` - Check status

**Example:**
```powershell
$body = @{ userId = 101; title = "Alert"; body = "Test message"; data = @{} } | ConvertTo-Json
Invoke-RestMethod -Uri "http://localhost:8000/api/notifications/send" -Method Post -Body $body -ContentType "application/json"
```
## Background Processing with Celery

The application uses Celery for asynchronous task processing with Redis as broker/backend.

**Architecture:**
- Notifications are enqueued to Celery tasks
- Workers process tasks independently with retry logic
- Flower provides monitoring UI

**Start Services:**
```powershell
# Using Docker Compose (recommended)
docker compose -f server/docker-compose.celery.yml up -d

# Or manually
celery -A server.tasks.celery_notification_tasks.celery_app worker --loglevel=info
celery -A server.tasks.celery_notification_tasks.celery_app beat --loglevel=info
```

**Monitor Tasks:**
```powershell
celery -A server.tasks.celery_notification_tasks.celery_app flower
# Access at http://localhost:5555
```

**Note:** If Celery is unavailable, tasks fall back to synchronous execution.

## Production Deployment

**Pre-deployment checklist:**
1. Run migrations: `alembic -c server/alembic.ini upgrade head`
2. Set production credentials in `.env` (Twilio/Meta/FCM keys)
3. Configure proper DATABASE_URL with production DB
4. Start Redis, Celery workers, and beat scheduler
5. Enable monitoring with Flower
6. Configure health checks and logging

**Recommended improvements:**
- Use Firebase Admin SDK instead of legacy FCM server key
- Implement health check endpoints (`/health`, `/readiness`)
- Configure Celery task retry policies and rate limits
- Set up centralized logging (e.g., CloudWatch, ELK)
- Add admin endpoints for task management

## Database Schema

Migrations create these tables:
- `notifications` - Push notification logs
- `device_tokens` - User device FCM tokens
- `whatsapp_messages` - WhatsApp message logs

Run `alembic -c server/alembic.ini upgrade head` to apply all migrations.
