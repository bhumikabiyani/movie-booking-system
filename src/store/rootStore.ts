import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { compose, applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import { rootState } from './rootState';
import { rootReducers } from './rootReducer';
import RootAction from './rootAction';
import { rootEpic } from './rootEpic';

export type RootState = ReturnType<typeof rootReducers>;

const epicMiddleware = createEpicMiddleware<RootAction, RootAction, rootState>();

const configureStore = () => {
  const middlewares = [epicMiddleware];
  const enhancer = compose(applyMiddleware(...middlewares));
  const store = createStore(rootReducers, enhancer);
  return store;
};

const RootStore = configureStore();
epicMiddleware.run(rootEpic);
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default RootStore;
