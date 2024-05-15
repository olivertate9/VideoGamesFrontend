import axios from 'misc/requests';
import config from '../config';
import {
    DELETE_GAME_FAILURE,
    DELETE_GAME_REQUEST,
    DELETE_GAME_SUCCESS,
    FETCH_GAMES_FAILURE,
    FETCH_GAMES_REQUEST,
    FETCH_GAMES_SUCCESS,
} from '../constants/actionTypes';
import {mockGamePages} from "../mockData/mockGames";

const fetchGamesRequest = () => ({
    type: FETCH_GAMES_REQUEST,
});

const fetchGamesSuccess = (games, totalPages) => {
    return {
        type: FETCH_GAMES_SUCCESS,
        payload: { games, totalPages },
    }
};

const fetchGamesFailure = (error) => ({
    type: FETCH_GAMES_FAILURE,
    payload: error,
});

const deleteGameRequest = () => ({
    type: DELETE_GAME_REQUEST,
});

const deleteGameSuccess = (gameId) => ({
    type: DELETE_GAME_SUCCESS,
    payload: {id: gameId},
});

const deleteGameFailure = (error) => ({
    type: DELETE_GAME_FAILURE,
    payload: error,
});

const getGames = async (params) => {
    const {
        GAMES_SERVICE,
    } = config;
    return axios.post(
        `${GAMES_SERVICE}/api/game/_list`,
        params,
    )
};

const deleteGameById = async (gameId) => {
    const {
        GAMES_SERVICE,
    } = config;
    return axios.delete(
        `${GAMES_SERVICE}/api/game/${gameId}`,
    )
};

// Завантаження мокових даних. Я зміг замокати тільки завантаження даних.
// Видалення, фільтри та перехід до детальної інформації не зміг симулювати. З бекендом все працює.
const fetchGames = (filters, page) => async (dispatch) => {
    dispatch(fetchGamesRequest());

    const currentPage = page - 1;
    const games = mockGamePages[currentPage] || [];
    const totalPages = mockGamePages.length;

    dispatch(fetchGamesSuccess(games, totalPages));
};

// Виклик до бекенду
// const fetchGames = (filters, page) => async (dispatch) => {
//     dispatch(fetchGamesRequest());
//
//     const defaultParams = {
//         page: page || 1,
//         size: 10,
//     };
//
//     const params = { ...defaultParams, ...filters };
//     return getGames(params)
//         .then((response) => {
//             dispatch(fetchGamesSuccess(response.games, response.totalPages));
//         })
//         .catch((error) => {
//             dispatch(fetchGamesFailure(error.description));
//         });
// };


const deleteGame = (gameId) => async (dispatch) => {
    dispatch(deleteGameRequest());
    try {
        await deleteGameById(gameId);
        dispatch(deleteGameSuccess(gameId));
    } catch (error) {
        console.error('Error deleting game in action:', error);
        dispatch(deleteGameFailure(error.toString()));
    }
};

const exportFunctions = {
    fetchGames,
    deleteGame,
};

export default exportFunctions;

