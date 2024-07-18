import bcrypt from 'bcrypt';
import { db } from '@vercel/postgres';
import { policyTiers, policyHolders, policies, policyInfos,chats,messages } from '../lib/placeholder-data';

const client = await db.connect();

async function seedDatabase() {

  await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Policy_Tier (
      tier_id SERIAL PRIMARY KEY,
      tier_name VARCHAR(50) NOT NULL,
      tier_description TEXT
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Policy_Holder (
      holder_id SERIAL PRIMARY KEY,
      holder_name VARCHAR(100) NOT NULL,
      holder_address VARCHAR(255),
      holder_phone VARCHAR(20)
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Policy (
      policy_id SERIAL PRIMARY KEY,
      policy_number VARCHAR(50) NOT NULL,
      tier_id INT REFERENCES Policy_Tier(tier_id) ON DELETE SET NULL,
      holder_id INT REFERENCES Policy_Holder(holder_id) ON DELETE CASCADE,
      start_date DATE NOT NULL,
      end_date DATE NOT NULL
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Policy_Info (
      info_id SERIAL PRIMARY KEY,
      policy_id INT REFERENCES Policy(policy_id) ON DELETE CASCADE,
      info_details TEXT
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Chat (
      chat_id SERIAL PRIMARY KEY,
      chat_name VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await client.query(`
    CREATE TABLE IF NOT EXISTS Messages (
      message_id SERIAL PRIMARY KEY,
      chat_id INT REFERENCES Chat(chat_id) ON DELETE CASCADE,
      sender_id INT REFERENCES Policy_Holder(holder_id) ON DELETE CASCADE,
      content TEXT NOT NULL,
      sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await Promise.all(policyTiers.map(tier => {
    return client.query(`
      INSERT INTO Policy_Tier (tier_name, tier_description)
      VALUES ($1, $2)
      ON CONFLICT (tier_id) DO NOTHING;
    `, [tier.tier_name, tier.tier_description]);
  }));

  await Promise.all(policyHolders.map(holder => {
    return client.query(`
      INSERT INTO Policy_Holder (holder_name, holder_address, holder_phone)
      VALUES ($1, $2, $3)
      ON CONFLICT (holder_id) DO NOTHING;
    `, [holder.holder_name, holder.holder_address, holder.holder_phone]);
  }));

  await Promise.all(policies.map(policy => {
    return client.query(`
      INSERT INTO Policy (policy_number, tier_id, holder_id, start_date, end_date)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (policy_id) DO NOTHING;
    `, [policy.policy_number, policy.tier_id, policy.holder_id, policy.start_date, policy.end_date]);
  }));

  await Promise.all(policyInfos.map(info => {
    return client.query(`
      INSERT INTO Policy_Info (policy_id, info_details)
      VALUES ($1, $2)
      ON CONFLICT (info_id) DO NOTHING;
    `, [info.policy_id, info.info_details]);
  }));

  await Promise.all(chats.map(chat => {
    return client.query(`
      INSERT INTO Chat (chat_name, created_at)
      VALUES ($1, $2)
      ON CONFLICT (chat_id) DO NOTHING;
    `, [chat.chat_name, chat.created_at]);
  }));

  await Promise.all(messages.map(message => {
    return client.query(`
      INSERT INTO Messages (chat_id, sender_id, content, sent_at)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (message_id) DO NOTHING;
    `, [message.chat_id, message.sender_id, message.content, message.sent_at]);
  }));

}


export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    await client.sql`BEGIN`;
    await seedDatabase();
    // await seedCustomers();
    // await seedRevenue();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}
