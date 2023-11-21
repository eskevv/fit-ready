const { db } = require('@vercel/postgres');

async function seedExercises(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS exercises (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        duration INT NOT NULL
      );
    `;

    console.log(`Created "exercises" table`);

    return {
      createTable,
    };
  } catch (error) {
    console.error('Error seeding exercises:', error);
    throw error;
  }
}


async function main() {
  const client = await db.connect();

  await seedExercises(client);
  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
