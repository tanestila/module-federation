import { useEffect } from "react";
import { Provider, useDispatch, useSelector, useStore } from "react-redux";
import todoApi, { useGetTodoQuery } from "../reducers/todos";
import counter, { decrement } from "../reducers/counter";
import { useAppDispatch, useAppSelector } from "../reducers/hooks";
import store from "../store";

const remoteAppScope = "remoteApp";

export function CommonComponent({ text }: { text?: string }) {
  const { data, isLoading } = useGetTodoQuery({});
  // const dispatch = useAppDispatch();
  // const counter = useSelector((state: any) => state.counter1.value);

  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.counter1);

  useEffect(() => {
    console.log("2");
  }, []);

  const onClickIncrement = () => {
    dispatch(decrement());
  };

  return (
    <div>
      <div>
        RemoteApp's name from the redux store : {state && state.appName}
      </div>
      <div>counter : {state && state.value}</div>
      this component in app2 {text}
      Value: {state && state.value}{" "}
      <button onClick={onClickIncrement}>Increment</button>
      {isLoading ? "loading" : data.map((item) => <p>{item.title}</p>)}
    </div>
  );
}

const RemoteAppWrapper = () => {
  // const store: any = useStore();

  useEffect(() => {
    console.log(store);
    // store.injectReducer(remoteAppScope, counter);
  }, []);

  return (
    <Provider store={store}>
      <CommonComponent />
    </Provider>
  );
};

export default RemoteAppWrapper;
