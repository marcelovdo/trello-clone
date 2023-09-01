import { expect } from 'chai';
import { getLists, createList, deleteList, getCards, createCard, deleteCard } from '../controller.js';

import sql from '../db/db-test.js';

describe('Controllers', async function() {
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
  
  it('', async function () {
    
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
