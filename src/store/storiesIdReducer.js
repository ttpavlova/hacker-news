const initialState = {
    storiesId: []
}

const GET_STORIES_ID = "GET_STORIES_ID";

export const storiesIdReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_STORIES_ID:
            return { ...state, storiesId: action.payload };
        default:
            return state;
    }
}

export const getStoriesIdAction = (payload) => ({ type: GET_STORIES_ID, payload });