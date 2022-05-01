import { rest } from "msw";

let mockId = 0;

const lists = [
  {
    _id: mockId++,
    name: "TestList1",
    cards: [
      { _id: mockId++, name: "TestCard1" },
      { _id: mockId++, name: "TestCard2" },
    ],
  },
  {
    _id: mockId++,
    name: "TestList2",
    cards: [],
  },
];

export const handlers = [
  rest.get("/lists/:listId/cards", (req, res, ctx) => {
    const list = lists.find((item) => {
      return item._id === parseInt(req.params.listId);
    });
    return res(ctx.status(200), ctx.json({ cards: list.cards }));
  }),
  rest.post("/lists/:listId/cards/new", (req, res, ctx) => {
    const list = lists.find((item) => {
      return item._id === parseInt(req.params.listId);
    });
    const newId = mockId++;
    list.cards.push({ _id: newId, name: req.body.cardName });
    return res(ctx.status(200), ctx.json({ response: "Success", _id: newId }));
  }),
  rest.delete("/lists/:listId/cards/:cardId", (req, res, ctx) => {
    console.log("MOCKED DELETE CARDS");
    return res(ctx.status(200));
  }),
  rest.get("/lists", (req, res, ctx) => {
    const listResp = lists.map((item) => {
      return { _id: item._id, name: item.name };
    });
    return res(ctx.status(200), ctx.json({ lists: listResp }));
  }),
  rest.post("/lists/new", (req, res, ctx) => {
    const newId = mockId++;
    lists.push({ _id: newId, name: req.body.listName, cards: [] });
    return res(ctx.status(200), ctx.json({ response: "Success", _id: newId }));
  }),
  rest.delete("/lists/:listId", (req, res, ctx) => {
    console.log("MOCKED DELETE LIST");
    return res(ctx.status(200));
  }),
];
