import postgres from "postgres";
import { v4 as uuidv4 } from "uuid";

const sql = postgres({
  host: "postgres",
  port: 5432,
  database: "postgres",
  username: "postgres",
  password: "1234",
});

const seedDb = async () => {
  // check if data already exists
  await sql`delete from list_cards`;
  await sql`delete from cards`;
  await sql`delete from lists`;
  
  await sql`drop table list_cards`;
  await sql`drop table cards`;
  await sql`drop table lists`;

  await sql`
    create table cards (
      id uuid primary key,
      name text
    )
  `;

  await sql`
    create table lists (
      id uuid primary key,
      name text
    ) 
  `;

  await sql`
    create table list_cards (
      list_id uuid references lists(id),
      card_id uuid references cards(id),
      primary key (list_id, card_id)
    )
  `;

  const listList = ["To Do", "Doing", "Done"];
  
  for (const name of listList) {
    const lists = await sql`
      insert into lists
        (id, name)
      values
        (${ uuidv4() }, ${ name })
      returning name
    `;
  }  
};

seedDb();

export default sql;

