# SyncUp Realtime Coaching Feed

A realtime coaching feed application built with:

- Next.js
- Node.js
- Express
- MongoDB Atlas
- Redis Cloud
- Socket.IO
- TypeScript

---

# Features

- Realtime feed updates
- Redis cache-aside pattern
- MongoDB persistence
- Socket.IO websocket communication
- Reconnect handling
- Duplicate event prevention
- Loading & error handling
- Responsive UI

---

# Architecture

Client (Next.js)
↓
Express API + Socket.IO
↓
MongoDB Atlas

Redis Cloud used for caching GET /feed responses.

---

# API Endpoints

## GET /feed

Returns all feeds.

Uses Redis cache before MongoDB lookup.

---

## POST /feed

Creates a new feed.

Flow:
1. Save to MongoDB
2. Invalidate Redis cache
3. Broadcast websocket event

---

# Realtime Strategy

Socket.IO broadcasts new feed events instantly to connected clients.

Duplicate realtime events are prevented on the frontend using feed ID checks.

---

# Setup

## Backend

```bash
cd server
npm install
npm run dev
```

## Frontend

```bash
cd client
npm install
npm run dev
```

---

# Environment Variables

## Server

```env
PORT=5000
MONGO_URI=your_mongodb_uri
REDIS_URL=your_redis_url
```

## Client

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

# Scalability Considerations

- Redis reduces database load
- Cache invalidation ensures consistency
- Socket reconnect handling improves reliability
- Modular architecture improves maintainability
- Duplicate event prevention avoids inconsistent realtime state