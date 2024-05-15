import {
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
    FETCH_GAMES_FAILURE,
    DELETE_GAME_REQUEST,
    DELETE_GAME_SUCCESS,
    DELETE_GAME_FAILURE,
} from '../constants/actionTypes';

const initialState = {
    games: [],
    loading: false,
    error: null,
    totalPages: 1,
    page: 1
};

function gameListReducer (state = initialState, action) {
    switch (action.type) {
        case FETCH_GAMES_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GAMES_SUCCESS:
            return {
                ...state,
                loading: false,
                games: action.payload.games,
                totalPages: action.payload.totalPages,
            };
        case FETCH_GAMES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case DELETE_GAME_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case DELETE_GAME_SUCCESS:
            return {
                ...state,
                loading: false,
                games: state.games.filter((game) => game.id !== action.payload.id),
            };
        case DELETE_GAME_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
}

export default gameListReducer;