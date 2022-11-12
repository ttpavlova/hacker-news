const initialState = {
    stories: []
}

const ADD_STORIES = "ADD_STORIES";

export const storiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STORIES:
            return { ...state, stories: action.payload };
        default:
            return state;
    }
}

export const addStoriesAction = (payload) => ({ type: ADD_STORIES, payload });

export const getAllStories = state => state.stories.stories;

export const getStoryById = (state, storyId) => {
    state.stories.stories.find(story => story.id === Number(storyId));
}