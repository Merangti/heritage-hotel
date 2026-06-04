# Database Setup Guide

This project uses **Prisma ORM** with **PostgreSQL** for data persistence.

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment Variables

Copy `.env.example` to `.env` and update the database connection:

```bash
cp .env.example .env
```

Edit `.env`:

```
DATABASE_URL="postgresql://user:password@localhost:5432/heritage_hotel?schema=public"
```

### 3. Running the Database (PostgreSQL)

#### Option A: Using Docker (Recommended)

```bash
docker run --name heritage-db \
  -e POSTGRES_USER=heritage \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=heritage_hotel \
  -p 5432:5432 \
  -d postgres:16
```

Then update `.env`:

```
DATABASE_URL="postgresql://heritage:password123@localhost:5432/heritage_hotel?schema=public"
```

#### Option B: Local PostgreSQL Installation

Install PostgreSQL locally and create a database:

```bash
createdb heritage_hotel
```

### 4. Push Schema to Database

```bash
npm run db:push
```

### 5. Seed Initial Data

```bash
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

## Prisma Commands

| Command              | Purpose                                  |
| -------------------- | ---------------------------------------- |
| `npm run db:push`    | Push schema changes to database          |
| `npm run db:migrate` | Create and run migrations                |
| `npm run db:seed`    | Populate database with seed data         |
| `npx prisma studio`  | Open Prisma Studio GUI to view/edit data |

## Database Schema

The database contains three main tables:

### Rooms

- `id` — Primary key
- `key` — Unique room identifier (suite, deluxe, double, twin, single)
- `name` — Display name
- `type` — Room type
- `capacity` — Number of guests
- `rate` — Price per night (INR)
- `total` — Total rooms available
- `booked` — Currently booked count
- `description` — Short description

### Bookings

- `id` — Primary key
- `roomId` — Foreign key to Rooms
- `roomKey` — Room identifier
- `checkIn` — Check-in date
- `checkOut` — Check-out date
- `guests` — Number of guests
- `name` — Guest name
- `email` — Guest email
- `phone` — Guest phone
- `status` — pending | confirmed | cancelled
- `bookingRef` — Unique booking reference
- `totalAmount` — Total cost (INR)
- `createdAt` — Creation timestamp

### Reviews

- `id` — Primary key
- `name` — Guest name
- `origin` — Guest location
- `stars` — Rating (1-5)
- `body` — Review text
- `date` — Review date

## Fallback Mode

If `DATABASE_URL` is not set, the API endpoints fall back to mock data. This allows the app to run without a database for development/testing.

## Next Steps

1. Set up authentication (user accounts)
2. Add payment gateway (Razorpay)
3. Configure email notifications (SendGrid)
4. Add booking management dashboard for admins
