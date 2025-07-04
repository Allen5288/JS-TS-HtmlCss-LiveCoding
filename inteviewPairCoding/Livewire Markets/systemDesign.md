# Article Like System API Design

## Overview

A website where users can register, post their own content, and like official articles. The system supports user management, article management, liking/unliking articles, and retrieving the top liked articles.

---

## Entities

- **User**
  - `id`: string
  - `username`: string
  - `email`: string
  - `passwordHash`: string
  - ...

- **Article**
  - `id`: string
  - `title`: string
  - `content`: string
  - `authorId`: string (user or 'official')
  - `likeCount`: integer
  - `createdAt`: datetime
  - ...

- **Like**
  - `userId`: string
  - `articleId`: string
  - `timestamp`: datetime

---

## API Endpoints

### 1. User Management

#### `POST /users` — Register a new user

- **Request Body:**

  ```json
  { "username": "string", "email": "string", "password": "string" }
  ```

- **Response:**

  ```json
  { "id": "u123", "username": "string", "email": "string" }
  ```

#### `GET /users/:id` — Get user profile

- **Path Param:** `id` (string)
- **Response:**

  ```json
  { "id": "u123", "username": "string", "email": "string" }
  ```

#### `POST /auth/login` — User login

- **Request Body:**

  ```json
  { "email": "string", "password": "string" }
  ```

- **Response:**

  ```json
  { "token": "jwt-token", "user": { "id": "u123", "username": "string" } }
  ```

#### `GET /users/me` — Get current user info (auth required)

- **Header:** `Authorization: Bearer <token>`
- **Response:**

  ```json
  { "id": "u123", "username": "string", "email": "string" }
  ```

### 2. Article Management

#### `POST /articles` — Create a new article (auth required)

- **Header:** `Authorization: Bearer <token>`
- **Request Body:**

  ```json
  { "title": "string", "content": "string" }
  ```

- **Response:**

  ```json
  { "id": "a10", "title": "string", "content": "string", "authorId": "u123", "likeCount": 0, "createdAt": "2025-07-04T12:00:00Z" }
  ```

#### `GET /articles/:id` — Get article details

- **Path Param:** `id` (string)
- **Response:**

  ```json
  { "id": "a10", "title": "string", "content": "string", "authorId": "u123", "likeCount": 0, "createdAt": "2025-07-04T12:00:00Z" }
  ```

#### `GET /articles` — List all articles (pagination/filter supported)

- **Query Params:** `page` (int, optional), `limit` (int, optional), `authorId` (string, optional)
- **Response:**

  ```json
  [
    { "id": "a1", "title": "Hot News", "likeCount": 100, ... },
    { "id": "a2", "title": "Trending", "likeCount": 95, ... }
  ]
  ```

### 3. Like System

#### `POST /articles/:id/like` — Like an article (auth required)

- **Header:** `Authorization: Bearer <token>`
- **Path Param:** `id` (string)
- **Response:**

  ```json
  { "success": true, "likeCount": 42 }
  ```

#### `DELETE /articles/:id/like` — Unlike an article (auth required)

- **Header:** `Authorization: Bearer <token>`
- **Path Param:** `id` (string)
- **Response:**

  ```json
  { "success": true, "likeCount": 41 }
  ```

#### `GET /articles/:id/likes` — Get all users who liked this article

- **Path Param:** `id` (string)
- **Query Params:** `page` (int, optional), `limit` (int, optional)
- **Response:**

  ```json
  [
    { "userId": "u123", "timestamp": "2025-07-04T12:00:00Z" },
    { "userId": "u456", "timestamp": "2025-07-04T12:01:00Z" }
  ]
  ```

#### `GET /articles/:id/like-status` — Check if current user liked this article (auth required)

- **Header:** `Authorization: Bearer <token>`
- **Path Param:** `id` (string)
- **Response:**

  ```json
  { "liked": true }
  ```

### 4. Top Articles

#### `GET /articles/top?limit=3` — Get top N articles by like count (default 3)

- **Query Param:** `limit` (int, optional, default 3)
- **Response:**

  ```json
  [
    { "id": "a1", "title": "Hot News", "likeCount": 100 },
    { "id": "a2", "title": "Trending", "likeCount": 95 },
    { "id": "a3", "title": "Editor's Pick", "likeCount": 90 }
  ]
  ```

---

## Example Requests & Responses

### Like an Article

- `POST /articles/123/like`
- Body: `{ "userId": "u456" }`
- Response: `{ "success": true, "likeCount": 42 }`

### Get Top 3 Articles

- `GET /articles/top?limit=3`
- Response:

  ```json
  [
    { "id": "a1", "title": "Hot News", "likeCount": 100 },
    { "id": "a2", "title": "Trending", "likeCount": 95 },
    { "id": "a3", "title": "Editor's Pick", "likeCount": 90 }
  ]
  ```

### Create an Article

- `POST /articles`
- Body: `{ "title": "My Post", "content": "...", "authorId": "u123" }`
- Response: `{ "id": "a10", "title": "My Post", "likeCount": 0, ... }`

---

## Database Schema (Simplified)

### users

| id (PK) | username | email | passwordHash |
|---------|----------|-------|--------------|

### articles

| id (PK) | title | content | authorId (FK) | likeCount | createdAt |
|---------|-------|---------|---------------|-----------|-----------|

### likes

| userId (PK, FK) | articleId (PK, FK) | timestamp |
|-----------------|-------------------|-----------|

---

## Notes & Considerations

- All endpoints (except public article listing) require authentication.
- Rate limit likes/unlikes to prevent abuse.
- Use pagination for article and like lists.
- For scalability, consider caching top articles and using database indexes on `likeCount`.
- Optionally, support soft delete for articles and users.

---

### How to Record Whether a User Liked an Article

- Use a `likes` table with a composite primary key (`userId`, `articleId`).
- When a user likes an article, insert a row: (`userId`, `articleId`, `timestamp`).
- To check if a user liked an article, query:

  ```sql
  SELECT 1 FROM likes WHERE userId = ? AND articleId = ?
  ```

- Enforce a unique constraint on (`userId`, `articleId`) to prevent duplicate likes.
- For performance, index both columns.

---

**End of API Design**
