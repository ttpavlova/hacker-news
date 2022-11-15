const initialState = {
    stories: []
}

const ADD_STORIES = "ADD_STORIES";
const UPDATE_STORY_COMMENTS = "UPDATE_STORY_COMMENTS";

export const storiesReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_STORIES:
            return {...state, stories: action.payload};
        case UPDATE_STORY_COMMENTS:
            return {
                ...state,
                stories: state.stories.map((story) => {
                    if (story.id === action.payload.id) {
                        return {...story, kids: action.payload.kids};
                    }

                    return story;
                })
            };
        default:
            return state;
    }
}

export const addStoriesAction = (payload) => ({ type: ADD_STORIES, payload });
export const updateStoryComments = (payload) => ({ type: UPDATE_STORY_COMMENTS, payload });
export const getAllStories = state => state.stories.stories;