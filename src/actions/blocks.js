import fetch from 'cross-fetch';
import * as types from '../constants/actionTypes';

const retrieveBlocksStatusStart = (node) => {
  return {
    type: types.BLOCK_RETRIEVAL_STATUS_START,
    payload: { node },
  };
};

const retrieveBlocksStatusSuccess = (node, data) => {
  return {
    type: types.BLOCK_RETRIEVAL_STATUS_SUCCESS,
    payload: { node, data }
  };
};

const retrieveBlocksStatusFailure = node => {
  return {
    type: types.BLOCK_RETRIEVAL_STATUS_FAILURE,
    payload: { node },
  };
};

export function retrieveBlocksFromNode (node) {
    return async (dispatch) => {
        try {
            dispatch(retrieveBlocksStatusStart(node));
            const res = await fetch(`${node.url}/api/v1/blocks`);

            if (res.status >= 400) {
                dispatch(retrieveBlocksStatusFailure(node));
            }
            const json = await res.json();
            dispatch(retrieveBlocksStatusSuccess(node, json.data));
        } catch (err) {
            console.error(err);
            dispatch(retrieveBlocksStatusFailure(node));
        }
    };
};