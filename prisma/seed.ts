import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await prisma.booking.deleteMany();
  await prisma.review.deleteMany();
  await prisma.room.deleteMany();

  // Seed rooms
  const rooms = await Promise.all([
    prisma.room.create({
      data: {
        key: "suite",
        name: "The Japfü Suite",
        type: "Heritage Suite",
        capacity: 2,
        rate: 18500,
        total: 2,
        booked: 1,
        description: "King bed · private hearth · valley view",
      },
    }),
    prisma.room.create({
      data: {
        key: "deluxe",
        name: "Saramati Deluxe",
        type: "Deluxe Room",
        capacity: 2,
        rate: 12500,
        total: 4,
        booked: 2,
        description: "Carved headboard · copper tub",
      },
    }),
    prisma.room.create({
      data: {
        key: "double",
        name: "Dzükou Double",
        type: "Double Room",
        capacity: 2,
        rate: 8500,
        total: 6,
        booked: 3,
        description: "Queen bed · pinewood floor",
      },
    }),
    prisma.room.create({
      data: {
        key: "twin",
        name: "Dzüleke Twin",
        type: "Twin Room",
        capacity: 2,
        rate: 7500,
        total: 5,
        booked: 4,
        description: "Two singles · garden window",
      },
    }),
    prisma.room.create({
      data: {
        key: "single",
        name: "Khonoma Single",
        type: "Single Room",
        capacity: 1,
        rate: 4500,
        total: 4,
        booked: 1,
        description: "Solo loft · reading nook",
      },
    }),
  ]);

  // Seed reviews
  await Promise.all([
    prisma.review.create({
      data: {
        name: "Anjali R.",
        origin: "Bengaluru",
        stars: 5,
        body: "We slept in the Japfü Suite. The fire never went out — neither did the stories from the staff. The smoked pork with anishi was the best meal of our year.",
      },
    }),
    prisma.review.create({
      data: {
        name: "Lukas M.",
        origin: "Munich",
        stars: 5,
        body: "Not a hotel. A morung that lets you sleep in it. Every detail — the brass lamps, the woven shawl on the bed, the log drum at the gate — felt cared for.",
      },
    }),
    prisma.review.create({
      data: {
        name: "Imti A.",
        origin: "Mokokchung",
        stars: 4,
        body: "As an Ao Naga, I came in skeptical. I left convinced. They have honoured the hills without flattening them into a brochure. The kidney bean stew tasted like my grandmother's.",
      },
    }),
  ]);

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
