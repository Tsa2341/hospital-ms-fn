import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increaseCount, decreaseCount } from '../../redux/actions/count.action';

const Counter = () => {
  const { count } = useSelector((state) => state.cou);
  const dispatch = useDispatch();
  return (
    <div className="">
      <h1>Redux setup tesing: {count}</h1>
      <button onClick={() => dispatch(increaseCount())}>increment</button>
      <h1>{count}</h1>
      <button onClick={() => dispatch(decreaseCount())}>decrement</button>
    </div>
  );
};

export default Counter;
