import {
  CREATE_CARDS,
  DELETE_CARDS,
  ADD_CARDS,
  REMOVE_CARDS,
  ADD_ALL, 
  UPDATE_SCANNED_ID
} from "./actions";

const initialState = {
  cards: [],
  collectedCards: [], 
  scannedId: ""
};

const reducers = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALL:
      return {
        ...state,
        cards: [...action.cards],
        collectedCards: [...action.collectedCards]
      };
    case CREATE_CARDS:
      return {
        ...state,
        cards: [...action.cards]
      };

      // case DELETE_CARDS:
      //   let newState = {
      //     ...state
      //   };
      //   delete state[action._id];
      //   return state;

    case ADD_CARDS:
      return {
        ...state,
        collectedCards: [action.collectedCards],
      };

      // case REMOVE_CARDS:
      //   let newState2 = state.collectedCards.filter((card) => {
      //     return card._id !== action._id;
      //   });
      //   return {
      //     ...state,
      //     collectedCards: newState2,
      //   };

      case UPDATE_SCANNED_ID: 
      return {
        ...state, 
        scannedId: action.scannedId
      }

      default:
        return state;
  }
};

export default reducers;