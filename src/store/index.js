import { applyMiddleware, combineReducers, createStore } from "redux";
import { storiesIdReducer } from "./storiesIdReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { storiesReducer } from "./storiesReducer";

const rootReducer = combineReducers({
    storiesId: storiesIdReducer,
    stories: storiesReducer
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));