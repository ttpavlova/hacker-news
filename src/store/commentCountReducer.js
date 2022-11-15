const initialState = {
    commentCount: 0
}

const INCREASE_COMMENT_COUNT = "ADD_COMMENT";
const RESET_COMMENT_COUNT = "RESET_COMMENT_COUNT";

export const commentCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREASE_COMMENT_COUNT:
            return { ...state, commentCount: state.commentCount + action.payload };
        case RESET_COMMENT_COUNT:
            return { commentCount: 0 };
        default:
            return state;
    }
}

export const increaseCommentCount = (payload) => ({ type: INCREASE_COMMENT_COUNT, payload });
export const resetCommentCount = () => ({ type: RESET_COMMENT_COUNT });