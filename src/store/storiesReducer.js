const initialState = {
    stories: []
}

const GET_STORIES = "GET_STORIES";

export const storiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_STORIES:
            return { ...state, stories: action.payload };
        default:
            return state;
    }
}

export const getStoriesAction = (payload) => ({ type: GET_STORIES, payload });