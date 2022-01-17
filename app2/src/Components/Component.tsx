import { increment } from "../reducers/counter";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";

export default function Component() {
  const dispatch = useAppDispatch();
  const counter = useAppSelector((state) => state.counter1.value);

  const onClickIncrement = () => {
    dispatch(increment());
  };

  return (
    <div>
      App 2
      <div>
        Value: {counter} <button onClick={onClickIncrement}>Increment</button>
      </div>
    </div>
  );
}
