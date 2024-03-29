import { rest } from "msw";

let mockId = 0;

let lists = [
  {
    id: mockId++,
    name: "TestList1",
    cards: [
      { id: mockId++, name: "TestCard1" },
      { id: mockId++, name: "TestCard2" },
    ],
  },
  {
    id: mockId++,
    name: "TestList2",
    cards: [],
  },
];

async function waitMillis(delayTime) {
  await new Promise((r) => setTimeout(r, delayTime));
}

export const handlers = [
  rest.get("/lists/:listId/cards", async (req, res, ctx) => {
    await waitMillis(3000);
    const list = lists.find((item) => {
      return item.id === parseInt(req.params.listId);
    });
    return res(ctx.status(200), ctx.json({ cards: list.cards }));
  }),
  rest.post("/lists/:listId/cards/new", (req, res, ctx) => {
    const list = lists.find((item) => {
      return item.id === parseInt(req.params.listId);
    });
    const newId = mockId++;
    list.cards.push({ id: newId, name: req.body.cardName });
    return res(ctx.status(200), ctx.json({ response: "Success", id: newId }));
  }),
  rest.delete("/lists/:listId/cards/:cardId", (req, res, ctx) => {
    const list = lists.find((item) => {
      return item.id === parseInt(req.params.listId);
    });
    list.cards = list.cards.filter((item) => {
      return item.id !== parseInt(req.params.cardId);
    });
    return res(ctx.status(200), ctx.json({ response: "Success" }));
  }),
  rest.get("/lists", async (req, res, ctx) => {
    await waitMillis(3000);
    const listResp = lists.map((item) => {
      return { id: item.id, name: item.name };
    });
    return res(ctx.status(200), ctx.json({ lists: listResp }));
  }),
  rest.post("/lists/new", (req, res, ctx) => {
    const newId = mockId++;
    lists.push({ id: newId, name: req.body.listName, cards: [] });
    return res(ctx.status(200), ctx.json({ response: "Success", id: newId }));
  }),
  rest.delete("/lists/:listId", (req, res, ctx) => {
    lists = lists.filter((item) => {
      return item.id !== parseInt(req.params.listId);
    });
    return res(ctx.status(200), ctx.json({ response: "Success" }));
  }),
];
