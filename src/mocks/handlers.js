import { rest } from "msw";
//import { BACKEND_URL } from "../data/DataConfig";

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
    console.log("MOCKED POST CARD");
    return res(ctx.status(200));
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
    console.log("MOCKED POST LIST");
    return res(ctx.status(200));
  }),
  rest.delete("/lists/:listId", (req, res, ctx) => {
    console.log("MOCKED DELETE LIST");
    return res(ctx.status(200));
  }),
];
