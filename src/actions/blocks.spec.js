import * as ActionTypes from '../constants/actionTypes';
import * as ActionCreators from './blocks';

describe('Actions [blocks]', () => {
    beforeAll(() => { });
    afterAll(() => { });

    const node = {
        url: 'http://localhost:3002',
        online: false,
        name: null
    };

    it('should create an action to save blocks belonging to node', () => {
        const dispatch = jest.fn();
        const expected = {
          type: ActionTypes.BLOCK_RETRIEVAL_STATUS_START,
          payload: { node }
        };
    
        // we expect this to return a function since it is a thunk
        expect(typeof (ActionCreators.retrieveBlocksFromNode(node))).toEqual('function');
        // then we simulate calling it with dispatch as the store would do
        ActionCreators.retrieveBlocksFromNode(node)(dispatch);
        // finally assert that the dispatch was called with our expected action
        expect(dispatch).toBeCalledWith(expected);
      });
    
});