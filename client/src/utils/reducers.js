import {
  CREATE_CARDS,
  DELETE_CARDS,
  ADD_CARDS,
  REMOVE_CARDS,
  ADD_ALL,
} from "./actions";

const initialState = {
  cards: [],
  collectedCards: [],
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL:
      return {
        ...state,
        cards: action.cards,
        collectedCards: action.collectedCards,
      };
    case CREATE_CARDS:
      return {
        ...state,
        cards: action.cards,
      };
    case DELETE_CARDS:
      return {
        ...state,
        cards: state.cards.filter(
          (card) => card._id !== action.deletedCard._id
        ),
      };

    case ADD_CARDS:
      return {
        ...state,
        collectedCards: action.collectedCards,
      };
    case REMOVE_CARDS:
      return {
        ...state,
        collectedCards: state.collectedCards.filter(
          (card) => card._id !== action.removedCard._id
        ),
      };
    default:
      return state;
  }
};

export default reducers;
