import * as ActionTypes from '../constants/actionTypes';
import reducer from './blocks';
import initialState from './initialState';


describe('Reducers::Blocks', () => {
    const getInitialState = () => {
        return initialState().blocks;
    };

    const nodeA = {
        url: 'http://localhost:3002',
        online: false,
        name: null
    };

    it('should set initial state by default', () => {
        const action = { type: 'unknown' };
        const expected = getInitialState();

        expect(reducer(undefined, action)).toEqual(expected);
    });

    it('should handle CHECK_NODE_STATUS_START', () => {
        const appState = {
        };
        const action = { type: ActionTypes.BLOCK_RETRIEVAL_STATUS_START, payload: { node: nodeA } };
        let initStateStart = { ...initialState().block };
        initStateStart.loading = true;
        initStateStart.error = false;
        initStateStart.data = [];
        const expected = {
            [nodeA.url]: initStateStart,
        };

        expect(reducer(appState, action)).toEqual(expected);
    });

    it('should handle CHECK_NODE_STATUS_SUCCESS', () => {
        const appState = {
        };
        const action = { type: ActionTypes.BLOCK_RETRIEVAL_STATUS_SUCCESS, payload: { node: nodeA, data: [] } };
        let initStateStart = { ...initialState().block };
        initStateStart.loading = false;
        initStateStart.error = false;
        initStateStart.data = [];
        const expected = {
            [nodeA.url]: initStateStart
        };

        expect(reducer(appState, action)).toEqual(expected);
    });

    it('should handle CHECK_NODE_STATUS_FAILURE', () => {
        let initStateStart = { ...initialState().block };
        initStateStart.loading = true;
        initStateStart.error = false;
        initStateStart.data = [];
        const appState = {
            [nodeA.url]: {
                ...initStateStart
            }
        };
        const action = { type: ActionTypes.BLOCK_RETRIEVAL_STATUS_FAILURE, payload: {node: nodeA} };
        const expected = {
            [nodeA.url]: {
                ...initStateStart,
                error: true,
                loading: false,
            }
        };

        expect(reducer(appState, action)).toEqual(expected);
    });
});
