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
  
  it('should return lists when getting lists with status', async function () {
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
  
  after(async function() {
    await sql`delete from list_cards`;
    await sql`delete from cards`;
    await sql`delete from lists`;
  
    await sql`drop table list_cards`;
    await sql`drop table cards`;
    await sql`drop table lists`;
  })
})

//describe('Array', function () {
//    it('should return -1 when the value is not present', function () {
//      expect([1, 2, 3].indexOf(4)).to.equal(-1)
//    })
//})
