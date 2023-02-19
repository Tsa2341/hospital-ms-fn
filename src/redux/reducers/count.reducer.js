import { INCREASE_COUNT, DECREASE_COUNT } from "../actionTypes/count.types";

const initialState = {
  count: 0,
};

export const countReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE_COUNT:
      return (state.count += 1);

    case DECREASE_COUNT:
      return (state.count -= 1);

    default:
      return state.count;
  }
};
