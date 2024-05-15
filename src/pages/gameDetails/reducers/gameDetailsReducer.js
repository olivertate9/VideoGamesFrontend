import {
    FETCH_GAME_REQUEST,
    FETCH_GAME_SUCCESS,
    FETCH_GAME_FAILURE,
    CREATE_GAME_REQUEST,
    CREATE_GAME_SUCCESS,
    CREATE_GAME_FAILURE,
    UPDATE_GAME_REQUEST,
    UPDATE_GAME_SUCCESS,
    UPDATE_GAME_FAILURE,
} from '../constants/actionTypes';

const initialState = {
    currentGame: null,
    loading: false,
    error: null,
};

function gameReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_GAME_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case FETCH_GAME_SUCCESS: {
            return {
                ...state,
                loading: false,
                currentGame: action.payload,
            };
        }
        case FETCH_GAME_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case CREATE_GAME_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case CREATE_GAME_SUCCESS: {
            return {
                ...state,
                loading: false,
                currentGame: action.payload,
            };
        }
        case CREATE_GAME_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        case UPDATE_GAME_REQUEST: {
            return {
                ...state,
                loading: true,
                error: null,
            };
        }
        case UPDATE_GAME_SUCCESS: {
            return {
                ...state,
                loading: false,
                currentGame: action.payload,
            };
        }
        case UPDATE_GAME_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

export default gameReducer;
