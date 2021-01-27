import AsyncStorage from '@react-native-community/async-storage';
import { Reducer } from 'redux';
import { persistReducer, PersistConfig } from 'redux-persist';

export const createPersistReducer = (reducer: Reducer, config: Omit<PersistConfig<any, any, any, any>, 'storage'>) =>
  persistReducer({ ...config, storage: AsyncStorage }, reducer);
