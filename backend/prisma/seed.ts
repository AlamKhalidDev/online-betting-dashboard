import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.event.deleteMany();

  // Create new events
  const events = await prisma.event.createMany({
    data: [
      { event_name: "Soccer: Team A vs Team B", odds: 1.75 },
      { event_name: "Basketball: Lakers vs Celtics", odds: 2.3 },
      { event_name: "Tennis: Player X vs Player Y", odds: 1.95 },
      { event_name: "Boxing: Fighter 1 vs Fighter 2", odds: 3.1 },
      { event_name: "Cricket: India vs Australia", odds: 2.5 },
    ],
    skipDuplicates: true, // Optional safety
  });

  console.log("Seeded events:", events);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
