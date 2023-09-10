import { expect } from 'chai';
import { getLists, createList, deleteList, getCards, createCard, deleteCard } from '../controller.js';
import { v4 as uuidv4 } from "uuid";

import sql from '../db/db.js';

describe('Controllers - Test Database', async function() {
  before(async function() {
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
  })
  
  it('should return lists when getting lists with status 200', async function () {
    const idList = [uuidv4(), uuidv4(), uuidv4()];
    const nameList = ["Test1", "Test2", "Test3"];

    for (let i = 0; i < idList.length; i++) {
      await sql`
        insert into lists
          (id, name)
        values
          (${ idList[i] }, ${ nameList[i] })
      `;
    }

    let savedStatus;
    let savedResp;

    const req = {};
    const res = {
      status: function (stat) {
        savedStatus = stat;
        return this;
      },
      json: function (resp) {
        savedResp = resp;
      }
    };

    await getLists(req, res);

    expect(savedStatus).to.equal(200);
    expect(savedResp).to.have.property('lists');
    expect(savedResp.lists).to.have.lengthOf(idList.length);
    for (const list of savedResp.lists) {
      expect(list).to.have.property('id');
      expect(list).to.have.property('name');
      expect(idList).to.include(list.id);
      expect(nameList).to.include(list.name);
    }

    await sql`delete from lists`;
  })
  
  it('should create a list and return response with id and status 201', async function () {
    let savedStatus;
    let savedResp;
    const lName = 'Testing-name';

    const req = {
      body: {
        listName: lName
      }
    };
    const res = {
      status: function (stat) {
        savedStatus = stat;
        return this;
      },
      json: function (resp) {
        savedResp = resp;
      }
    };

    await createList(req, res);
    
    expect(savedStatus).to.equal(201);
    expect(savedResp).to.have.property('response');
    expect(savedResp.response).to.equal('List created successfully');
    expect(savedResp).to.have.property('id');

    const id = savedResp.id;
    const result = await sql`
      select name
      from lists
      where id = ${ id } 
    `;
    expect(result).to.have.lengthOf(1);
    expect(result[0]).to.have.property('name');
    expect(result[0].name).to.equal(lName);
    
    await sql`delete from lists`;
  })

  it ('should delete list with all its cards and return response with status 200', async function () {
    let savedStatus;
    let savedResp;
    const id = uuidv4();
    const name = 'List1';
    const cards = [
      {
        id: uuidv4(),
        name: 'Card1'
      },
      {
        id: uuidv4(),
        name: 'Card2'
      }
    ];

    await sql`
      insert into lists
        (id, name)
      values
        (${ id }, ${ name })
    `;
    for (const card of cards) {
      await sql`
        insert into cards
          (id, name)
        values
          (${ card.id }, ${ card.name })
      `;
      await sql`
        insert into list_cards
          (list_id, card_id)
        values
          (${ id }, ${ card.id })
      `;
    }

    const req = {
      params: {
        id
      }
    };
    const res = {
      status: function (stat) {
        savedStatus = stat;
        return this;
      },
      json: function (resp) {
        savedResp = resp;
      }
    };

    await deleteList(req, res);

    expect(savedStatus).to.equal(200);
    expect(savedResp).to.have.property('response');
    expect(savedResp.response).to.equal('List deleted successfully');

    let result = await sql`
      select card_id
      from list_cards
      where list_id = ${ id } 
    `;
    expect(result).to.have.lengthOf(0);
    for (const card of cards) {
      result = await sql`
        select id
        from cards
        where id = ${ card.id } 
      `;
      expect(result).to.have.lengthOf(0);
    }
    result = await sql`
      select id
      from lists
      where id = ${ id }
    `;
    expect(result).to.have.lengthOf(0);
    
    await sql`delete from list_cards`;
    await sql`delete from cards`;
    await sql`delete from lists`;
  })
  
  it('should get cards from a list and return status 200', async function() {
    const listId = uuidv4();
    const listName = 'ListTest';
    const cards = [
      {
        id: uuidv4(),
        name: 'CardTest1'
      },
      {
        id: uuidv4(),
        name: 'CardTest2'
      }
    ];
    const cardIds = cards.map((card) => card.id);
    const cardNames = cards.map((card) => card.name);

    await sql`
      insert into lists
        (id, name)
      values
        (${listId}, ${listName})
    `;
    for (const card of cards) {
      await sql`
        insert into cards
          (id, name)
        values
          (${card.id}, ${card.name})
      `;
      await sql`
        insert into list_cards
          (list_id, card_id)
        values
          (${listId}, ${card.id})
      `;
    }
    
    const req = {
      params: {
        id: listId
      }
    };
    let savedStatus;
    let savedResp;
    const res = {
      status: function (stat) {
        savedStatus = stat;
        return this;
      },
      json: function (resp) {
        savedResp = resp;
      }
    };

    await getCards(req, res);

    expect(savedStatus).to.equal(200);
    expect(savedResp).to.have.property('cards');
    expect(savedResp.cards).to.have.lengthOf(cardIds.length);
    for (const card of savedResp.cards) {
      expect(card).to.have.property('id');
      expect(card).to.have.property('name');
      expect(cardIds).to.include(card.id);
      expect(cardNames).to.include(card.name);
    }

    await sql`delete from list_cards`;
    await sql`delete from cards`;
  })

  after(async function() {
    await sql`delete from list_cards`;
    await sql`delete from cards`;
    await sql`delete from lists`;
  
    await sql`drop table list_cards`;
    await sql`drop table cards`;
    await sql`drop table lists`;
  })
})

