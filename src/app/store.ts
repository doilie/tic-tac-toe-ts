import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "../features/game/gameSlice";
import {useDispatch} from "react-redux";

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types

export type RootState = ReturnType<typeof store.getState>
export default store;
