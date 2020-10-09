import reducer from "../reducers";
import {
  CREATE_CARDS,
  DELETE_CARDS,
  ADD_CARDS,
  REMOVE_CARDS,
} from "../actions";

const initialState = {
  cards: [
    {
      logoUrl: "",
      companyName: "AlgoRhythmic Development",
      tagline: "We bring the spice and groove.",
      name: "Taylor Remigi",
      jobTitle: "Coffee Maker",
      website: "www.google.com",
      phone: "3854248121",
      email: "tayremigi@gmail.com",
      username: "Tremigi",
    },
  ],
  cardsCollected: [
    {
      logoUrl: "",
      companyName: "Dog Wash Inc.",
      tagline: "We wash your dog",
      name: "Kaya The Bean",
      jobTitle: "Job Doer",
      website: "www.facebook.com",
      phone: "3854248121",
      email: "tayremigi7@gmail.com",
      username: "Kaya",
    },
  ],
};

test("CREATE_CARDS", () => {
  let newState = reducer(initialState, {
    type: CREATE_CARDS,
    cards: [{}, {}],
  });
  expect(newState.cards.length).toBe(2);
  expect(initialState.cards.length).toBe(1);
});

test("DELETE_CARDS", () => {
  let newState = reducer(initialState, {
    type: DELETE_CARDS,
    cards: [],
  });
  expect(newState.cards.length).toBe(0);
  expect(initialState.cards.length).toBe(1);
});

test("ADD_CARDS", () => {
  let newState = reducer(initialState, {
    type: ADD_CARDS,
    cardsCollected: [{}],
  });
  expect(newState.cardsCollected.length).toBe(2);
  expect(initialState.cardsCollected.length).toBe(1);
});

test("REMOVE_CARDS", () => {
  let newState = reducer(initialState, {
    type: REMOVE_CARDS,
    cardsCollected: [],
  });
  expect(newState.cardsCollected.length).toBe(0);
  expect(initialState.cardsCollected.length).toBe(1);
});

// it("creates a card", () => {
//   expect()
// }
// )
