import { CREATE_CARDS, DELETE_CARDS, ADD_CARDS, REMOVE_CARDS } from "./actions";

const initialState = {
  cards: [],
  cardsCollected: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARDS:
      // let newState = {...state, cards:}
      // state.cards.filter((card) => {
      //   return card._id !== action._id;
      // });
      // console.log(state);
      return {
        ...state,
        cards: [...action.cards],
      };
    // case DELETE_CARDS:
    // let newState = state.cards.filter((card) => {
    //   return card._id !== action._id;
    // });
    // console.log(newState);
    // return {
    //   ...state,
    //   cards: newState,
    // };
    case DELETE_CARDS:
      let newState = { ...initialState };
      // console.log(action);
      delete initialState[action._id];
      return initialState;
    // state.cards.filter((card) => card._id !== action._id);
    case ADD_CARDS:
      return {
        ...state,
        cardsCollected: [...state.cardsCollected, action.card],
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

export default reducer;
