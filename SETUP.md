# Heritage Hotel — Quick Setup

## Prerequisites

- Node.js 18+
- PostgreSQL 14+ (or Docker)

## ⚡ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Database URL

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` with your PostgreSQL connection:

```
DATABASE_URL="postgresql://user:password@localhost:5432/heritage_hotel?schema=public"
```

### 3. Set Up Database

Push schema:

```bash
npm run db:push
```

Seed with sample data:

```bash
npm run db:seed
```

### 4. Run Dev Server

```bash
npm run dev
```

Visit: http://localhost:5173

---

## 🐳 Using Docker (Easiest)

```bash
# Start PostgreSQL
docker run --name heritage-db \
  -e POSTGRES_USER=heritage \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_DB=heritage_hotel \
  -p 5432:5432 \
  -d postgres:16

# Update .env with:
# DATABASE_URL="postgresql://heritage:password123@localhost:5432/heritage_hotel?schema=public"

# Then run:
npm install
npm run db:push
npm run db:seed
npm run dev
```

---

## 📋 What's Working Now

✅ Room availability & booking API  
✅ Guest reviews API  
✅ Interactive booking modal (3-step form)  
✅ Guest journal with form submission  
✅ Real-time availability checking  
✅ Fallback mode (works without DB)

## 🚀 Next Integrations

- [ ] Payment gateway (Razorpay)
- [ ] Email notifications (SendGrid)
- [ ] User authentication
- [ ] Admin dashboard

---

## 📚 Database Schema

See [DATABASE.md](./DATABASE.md) for full schema details.

## 🛠️ Useful Commands

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run db:push          # Sync schema with DB
npm run db:seed          # Populate initial data
npm run db:migrate       # Create migrations
npx prisma studio       # Open GUI database viewer
```

---

## 🐛 Troubleshooting

**"DATABASE_URL not set"**

- Create `.env` file (copy from `.env.example`)
- App falls back to mock data if no DB

**Prisma client not found**

```bash
npm install @prisma/client
```

**Port 5432 already in use**

```bash
docker run -p 5433:5432 ... # Use different port
# Update DATABASE_URL port to 5433
```

---

Questions? Check [DATABASE.md](./DATABASE.md) for detailed docs.
