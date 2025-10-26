# TallyXpert

**TallyXpert** is a comprehensive financial management and accounting application designed to help users manage their accounts, track expenses, handle investments, and receive real-time notifications about financial activities.

## Overview

TallyXpert provides a modern, full-stack solution for personal and business financial management with features including:

- 📊 **Account Management** - Track multiple accounts with real-time balance updates
- 💰 **Investment Tracking** - Monitor shares, SIPs, and other investments
- 📱 **Mobile Notifications** - Push notifications via Firebase Cloud Messaging
- 💬 **WhatsApp Integration** - Send payment reminders and alerts via WhatsApp
- 📈 **Reports & Analytics** - Visual dashboards with graphs and insights
- 🔐 **Secure Authentication** - JWT-based authentication system
- 📄 **Document Management** - Store and manage financial documents

## Architecture

TallyXpert consists of two main components:

### Frontend (`/web`)
- **Framework**: React 18 with TypeScript
- **UI Library**: Material-UI (MUI)
- **Styling**: SASS + Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Build Tool**: Vite
- **PWA Support**: Service Worker for offline capabilities

### Backend (`/server`)
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Task Queue**: Celery with Redis
- **Authentication**: JWT tokens
- **Migrations**: Alembic
- **API Documentation**: Auto-generated OpenAPI/Swagger

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 18+
- PostgreSQL 13+
- Redis 7+

### Backend Setup

```powershell
# Navigate to server directory
cd server

# Create virtual environment and install dependencies
python -m venv .venv
.\.venv\Scripts\Activate
pip install -r requirements.txt

# Configure environment variables in server/.env
# Run migrations
alembic -c alembic.ini upgrade head

# Start Celery workers and Redis
docker compose -f docker-compose.celery.yml up -d

# Start the API server
uvicorn main:app --reload --port 8000
```

### Frontend Setup

```powershell
# Navigate to web directory
cd web

# Install dependencies
npm install

# Start development server
npm run dev
```

## Features in Detail

### Account Management
- Create and manage multiple bank accounts
- Track credit/debit transactions
- Real-time balance calculations
- Account selection UI with quick actions

### Notifications System
- Register device tokens for push notifications
- Send notifications for invoices, payments, reminders
- Celery-based async processing
- Fallback to synchronous execution

### WhatsApp Messaging
- Send WhatsApp messages via Twilio or Meta Cloud API
- Template message support
- Delivery status tracking
- Rate limiting and retry logic

### Investment Tracking
- Monitor shares and mutual funds
- Track SIP investments
- Performance analytics
- Visual charts and reports

## Project Structure

```
TallyXpert/
├── server/              # Backend API
│   ├── routers/        # API endpoints
│   ├── sql_app/        # Database models and CRUD
│   ├── tasks/          # Celery background tasks
│   ├── utils/          # Utility functions
│   └── alembic/        # Database migrations
│
└── web/                # Frontend application
    ├── src/
    │   ├── components/ # Reusable UI components
    │   ├── pages/      # Page components
    │   ├── store/      # Redux store and services
    │   ├── styles/     # Global styles
    │   └── utils/      # Helper functions
    └── public/         # Static assets
```

## API Endpoints

### Authentication
- `POST /api/users/login` - User login
- `POST /api/users/register` - User registration

### Accounts
- `GET /api/accounts` - List all accounts
- `POST /api/accounts` - Create new account
- `PUT /api/accounts/{id}` - Update account
- `DELETE /api/accounts/{id}` - Delete account

### WhatsApp
- `POST /api/whatsapp/send` - Send WhatsApp message
- `POST /api/whatsapp/send-template` - Send template message
- `GET /api/whatsapp/status/{messageId}` - Check delivery status

### Notifications
- `POST /api/notifications/register-device` - Register device token
- `POST /api/notifications/send` - Send push notification
- `GET /api/notifications/status/{notificationId}` - Check notification status

## Configuration

### Environment Variables

**Backend** (`server/.env`):
```properties
RDS_URL=postgresql://postgres:postgres@localhost:5432/tallyxpert
CELERY_BROKER_URL=redis://localhost:6379/0
CELERY_RESULT_BACKEND=redis://localhost:6379/0
WHATSAPP_PROVIDER=mock
NOTIFICATION_PROVIDER=mock
FCM_SERVER_KEY=your_fcm_key
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

**Frontend** (`web/.env`):
```properties
VITE_API_URL=http://localhost:8000
```

## Documentation

- [Server Documentation](./server/README.md) - Backend API documentation
- [Web Documentation](./web/README.md) - Frontend setup and development guide

## Deployment

### Production Checklist
1. Update database URL to production PostgreSQL
2. Set production API keys (Twilio, FCM, Meta)
3. Configure CORS origins
4. Enable SSL/TLS
5. Set up monitoring and logging
6. Configure backup strategy
7. Run migrations: `alembic upgrade head`
8. Start Celery workers with supervisor/systemd

### Docker Deployment

```powershell
# Build and start all services
docker compose up --build -d
```

## Development

### Running Tests

```powershell
# Backend tests
cd server
pytest

# Frontend tests
cd web
npm test
```

### Code Style

- Backend: Black formatter, isort
- Frontend: ESLint + Prettier

## Technologies Used

### Backend
- FastAPI
- SQLAlchemy
- Celery
- Redis
- Alembic
- PyJWT
- Pydantic

### Frontend
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- RTK Query
- Vite
- SASS/Tailwind

### Infrastructure
- PostgreSQL
- Redis
- Docker
- Nginx

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

## Support

For issues and questions:
- Email: support@tallyxpert.com
- GitHub Issues: [Create an issue](https://github.com/neetu-goel-2009/tallyxpert/issues)

---

**TallyXpert** - Smart Financial Management Made Simple
