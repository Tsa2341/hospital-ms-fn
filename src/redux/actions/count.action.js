import { INCREASE_COUNT, DECREASE_COUNT } from "../actionTypes/count.types";

export const increaseCount = (count) => async (dispatch) => {
  try {
    dispatch({
      type: INCREASE_COUNT,
      payload: null,
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const decreaseCount = (count) => async (dispatch) => {
  try {
    dispatch({
      type: DECREASE_COUNT,
      payload: null,
    });
  } catch (error) {
    throw new Error(error);
  }
};
