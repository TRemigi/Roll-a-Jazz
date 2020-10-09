import {
  CREATE_CARDS,
  DELETE_CARDS,
  ADD_CARDS,
  REMOVE_CARDS
} from "./actions";

const initialState = {
  cards: [],
  cardsCollected: []
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARDS:
      return {
        ...state,
        cards: [...action.cards]
      };

    case DELETE_CARDS:
      let newState = {
        ...state
      };
      delete state[action._id];
      return state;

    case ADD_CARDS:
      return {
        ...state,
        cardsCollected: action.cardsCollected,
      };

    case REMOVE_CARDS:
      let newState2 = state.cardsCollected.filter((card) => {
        return card._id !== action._id;
      });
      return {
        ...state,
        cardsCollected: newState2,
      };
  }
};

export default reducers;