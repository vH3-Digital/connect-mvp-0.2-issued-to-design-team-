# VH3Connect Dashboard Documentation

## Overview
VH3Connect is a comprehensive dashboard for managing technical support operations, engineers, and knowledge resources. The application features a modern, dark-themed interface with real-time communication capabilities.

## Core Features

### 1. Authentication
- Secure login/signup system
- JWT-based authentication
- Role-based access control

### 2. Dashboard
- Real-time statistics and metrics
- Interactive charts showing company insights
- Quick access to key performance indicators

### 3. Chat System
- Real-time messaging
- Direct and group chats
- Message history and synchronization
- User presence indicators
- Profile pictures and avatars
- Message read status
- Group chat management

### 4. Technical Bulletins
- AI-powered document processing
- Automated content generation
- Priority-based classification
- Progress tracking
- Assignment management
- Scheduled distribution
- Comprehension verification
- Multi-channel distribution

### 5. Engineer Management
- Track engineer availability and status
- View specialties and skills
- Monitor working hours and locations
- Real-time status updates

### 6. Knowledge Base
- Document management system
- Category-based organization
- Search functionality
- Document preview with AI assistance

## Technical Stack

- **Frontend**: React + TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Query
- **API Integration**: Axios
- **Authentication**: JWT
- **Date Handling**: date-fns
- **Phone Number Validation**: libphonenumber-js

## Environment Configuration

Required environment variables:
```env
VITE_XANO_API_URL=your_xano_api_url
VITE_XANO_API_KEY=your_xano_api_key
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## API Documentation

### Authentication Endpoints
```typescript
POST /auth/login
POST /auth/signup
GET /auth/me
```

### Chat Endpoints
```typescript
GET /chats
  Query Parameters:
    - user_id: number (required)
  Response: Chat[]

GET /refresh_data
  Query Parameters:
    - channel_id: string (optional)
  Response: ChatRefreshResponse

POST /send_message
  Body:
    - channel_id: string (required)
    - message: string (required)
  Response: Message

POST /new_chat
  Body (multipart/form-data):
    - channel.participants_id: number[] (required)
    - channel.name: string (optional)
    - channel.description: string (optional)
    - channel.group_image: File (optional)
  Response: Chat
```

### Data Types

```typescript
interface Chat {
  id: string;
  type: "direct" | "group";
  name: string;
  description: string;
  participants_id: number[];
  group_image: {
    url: string | null;
  };
}

interface Message {
  id: number;
  created_at: number;
  channel_id: string;
  sender_id: number;
  text: string;
  receivers: {
    user_id: number;
    read: boolean;
  }[];
  _sender_info?: {
    name: string;
    profile_picture: {
      url: string;
    } | null;
  };
}

interface Contact {
  id: number;
  name: string;
  profile_picture: {
    url: string;
  } | null;
}
```

## Chat System Features

### Real-time Updates
- Automatic refresh of chat messages
- Message synchronization across clients
- Read status tracking
- User presence indicators

### Message Types
- Text messages
- Group messages
- System notifications
- Read receipts

### User Interface
- Chat list with recent conversations
- Message thread view
- User avatars and initials
- Timestamp formatting
- Message status indicators

### Security
- JWT authentication
- Channel-based access control
- Participant validation
- Input sanitization

## Getting Started

1. Clone the repository
2. Copy `.env.example` to `.env` and configure variables
3. Install dependencies: `npm install`
4. Start development server: `npm run dev`

## Build and Deployment

Build for production:
```bash
npm run build
```

The application will be built to the `dist` directory.