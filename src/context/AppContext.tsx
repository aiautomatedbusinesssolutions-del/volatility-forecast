"use client";

import React, { createContext, useContext, useReducer } from "react";

interface AppState {
  watchlist: string[];
  selectedTicker: string | null;
}

type AppAction =
  | { type: "ADD_TO_WATCHLIST"; payload: string }
  | { type: "REMOVE_FROM_WATCHLIST"; payload: string }
  | { type: "SET_SELECTED_TICKER"; payload: string | null };

const initialState: AppState = {
  watchlist: [],
  selectedTicker: null,
};

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case "ADD_TO_WATCHLIST":
      if (state.watchlist.includes(action.payload)) return state;
      return { ...state, watchlist: [...state.watchlist, action.payload] };
    case "REMOVE_FROM_WATCHLIST":
      return {
        ...state,
        watchlist: state.watchlist.filter((t) => t !== action.payload),
      };
    case "SET_SELECTED_TICKER":
      return { ...state, selectedTicker: action.payload };
    default:
      return state;
  }
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within AppProvider");
  return context;
};
