const { PrismaClient } = require('@prisma/client');
const { forecast } = require('./data.js');
const prisma = new PrismaClient();

const load = async () => {
  try {
    await prisma.event.deleteMany();
    console.log('Deleted records in event table');
    await prisma.forecast.deleteMany();
    console.log('Deleted records in forecast table');
    await prisma.period.deleteMany();
    console.log('Deleted records in period table');
    await prisma.$queryRaw`ALTER TABLE Forecast AUTO_INCREMENT = 1`;
    console.log('reset forecast auto increment to 1');
    await prisma.forecast.createMany({
      data: forecast,
    });
    console.log('Added category data');
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};
load();
