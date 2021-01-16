import {BLOCK_RETRIEVAL_STATUS_FAILURE, BLOCK_RETRIEVAL_STATUS_SUCCESS, BLOCK_RETRIEVAL_STATUS_START} from '../constants/actionTypes';
import initialState from './initialState';

export default function blocksReducer(state = initialState().blocks, action) {
    if (action.payload && action.payload.node) {
        const { node } = action.payload;
        let nodeState = {...(state[node.url] || initialState().block)};
        switch (action.type) {
            case BLOCK_RETRIEVAL_STATUS_START:
                nodeState.loading = true;
                nodeState.error = false;
                nodeState.data = [];
                break;
            case BLOCK_RETRIEVAL_STATUS_SUCCESS:
                nodeState.loading = false;
                nodeState.error = false;
                nodeState.data = action.payload.data || [];
                break;
            case BLOCK_RETRIEVAL_STATUS_FAILURE:
                nodeState.loading = false;
                nodeState.error = true,
                nodeState.data = [];
                break;
        };
        return {
            ...state,
            [node.url]: nodeState,
        };
    } else {
        return state;
    }
};