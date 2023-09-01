import sql from "./db/db.js";
import { v4 as uuidv4 } from "uuid";

const getLists = async (req, res) => {
  const result = await sql`
    select * from lists
  `;
  
  const data = { lists: result };

  res.status(200).json(data);
}

const createList = async (req, res) => {
  const result = await sql`
    insert into lists
      (id, name)
    values
      (${ uuidv4() }, ${ req.body.listName })
    returning id
  `;

  res.status(200).json({
    response: "List created successfully",
    id: result[0].id,
  });
}

const deleteList = async (req, res) => {
  const result = await sql`
    select card_id
    from list_cards
    where list_id = ${ req.params.id }
  `;
  
  await sql`
    delete from list_cards
    where list_id = ${ req.params.id }
  `;

  for (const card of result) {
    await sql`
      delete from cards
      where id = ${ card.card_id }
    `;
  }

  await sql`
    delete from lists
    where id = ${ req.params.id }
  `;

  res.status(200).json({
    response: "List deleted successfully",
  });
}

const getCards = async (req, res) => {
  const cardIds = await sql`
    select card_id
    from list_cards
    where list_id = ${ req.params.id }
  `;

  let cardNames = []
  for (const id of cardIds) {
    const result = await sql`
      select name
      from cards
      where id = ${ id.card_id }
    `;

    cardNames.push({ name: result[0].name, id: id.card_id });
  }

  res.status(200).json({ cards: cardNames });
}

const createCard = async (req, res) => {
  const result = await sql`
    insert into cards
      (id, name)
    values
      (${ uuidv4() }, ${ req.body.cardName })
    returning id
  `;

  const newId = result[0].id;
  
  await sql`
    insert into list_cards
      (list_id, card_id)
    values
      (${ req.params.id }, ${ newId })
  `;

  res.status(200).json({ response: "Card created successfully", id: newId });
}

const deleteCard = async (req, res) => {
  await sql`
    delete from list_cards
    where card_id = ${ req.params.id }
  `;

  await sql`
    delete from cards
    where id = ${ req.params.id }
  `;

  res.status(200).json({
    response: "Card deleted successfully",
  });
}

export { getLists, createList, deleteList, getCards, createCard, deleteCard };

