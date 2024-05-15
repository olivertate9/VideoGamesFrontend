import axios from 'axios';
import config from '../config';
import {
    CREATE_GAME_FAILURE,
    CREATE_GAME_REQUEST,
    CREATE_GAME_SUCCESS,
    FETCH_GAME_FAILURE,
    FETCH_GAME_REQUEST,
    FETCH_GAME_SUCCESS,
    UPDATE_GAME_FAILURE,
    UPDATE_GAME_REQUEST,
    UPDATE_GAME_SUCCESS
} from '../constants/actionTypes';

const fetchGameRequest = (gameId) => ({
    type: FETCH_GAME_REQUEST,
    payload: gameId,
});

const fetchGameSuccess = (gameData) => ({
    type: FETCH_GAME_SUCCESS,
    payload: gameData,
});

const fetchGameFailure = (error) => ({
    type: FETCH_GAME_FAILURE,
    payload: error,
});

const createGameRequest = (gameData) => ({
    type: CREATE_GAME_REQUEST,
    payload: gameData,
});

const createGameSuccess = (gameData) => ({
    type: CREATE_GAME_SUCCESS,
    payload: gameData,
});

const createGameFailure = (error) => ({
    type: CREATE_GAME_FAILURE,
    payload: error,
});

const updateGameRequest = (gameId, gameData) => ({
    type: UPDATE_GAME_REQUEST,
    payload: {gameId, gameData},
});

const updateGameSuccess = (gameId, gameData) => ({
    type: UPDATE_GAME_SUCCESS,
    payload: {gameId, gameData},
});

const updateGameFailure = (gameId, error) => ({
    type: UPDATE_GAME_FAILURE,
    payload: {gameId, error},
});

const getGame = (gameId) => {
    const {GAMES_SERVICE} = config;
    return axios.get(`${GAMES_SERVICE}/api/game/${gameId}`);
};

const putGame = (gameId, gameData) => {
    const {GAMES_SERVICE} = config;
    return axios.put(
        `${GAMES_SERVICE}/api/game/${gameId}`,
        gameData
    );
};

const postGame = (gameData) => {
    const {GAMES_SERVICE} = config;
    return axios.post(
        `${GAMES_SERVICE}/api/game`,
        gameData
    );
};

const fetchGame = (gameId) => (dispatch) => {
    dispatch(fetchGameRequest());
    return getGame(gameId)
        .then((response) => {
            dispatch(fetchGameSuccess(response));
        })
        .catch((error) => {
            dispatch(fetchGameFailure(error.description));
        });
};

const updateGame = (gameId, gameData) => (dispatch) => {
    dispatch(updateGameRequest(gameId, gameData));

    const dataForBackend = {
        title: gameData.title,
        developerName: gameData.developer?.name,
        yearReleased: gameData.yearReleased,
        genre: gameData.genre,
    };
    return putGame(gameId, dataForBackend)
        .then((response) => {
            dispatch(updateGameSuccess(gameId, response));
        })
        .catch((error) => {
            dispatch(updateGameFailure(gameId, error));
        });
};

const createGame = (gameData) => (dispatch) => {
    dispatch(createGameRequest(gameData));

    const dataForBackend = {
        title: gameData.title,
        developerName: gameData.developer?.name,
        yearReleased: gameData.yearReleased,
        genre: gameData.genre,
    };

    return postGame(dataForBackend)
        .then((response) => {
            dispatch(createGameSuccess(response.gameData));
        })
        .catch((error) => {
            dispatch(createGameFailure(error.description));
        });
};

const exportFunctions = {
    fetchGame,
    updateGame,
    createGame,
};

export default exportFunctions;