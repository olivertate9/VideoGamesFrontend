import {useLocation, useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import Typography from 'components/Typography';
import actionGame from '../actions/gameDetails';
import {useIntl} from "react-intl";
import Paper from "../components/Paper";
import Snackbar from "../../gameList/components/Snackbar";
import GameDetailsEdit from "../components/GameEditForm";
import GameDetailsView from "../components/GameDetailsView";
import useGameValidation from "../hooks/useValidation";

function GameDetails() {
    const params = useParams();
    const gameId = params.id;
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const game = useSelector(state => state.gameDetails.currentGame);
    const [editMode, setEditMode] = useState(false);
    const [gameData, setGameData] = useState({});
    const [editingGameData, setEditingGameData] = useState({});
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [isNewGame, setIsNewGame] = useState(location.state?.isNewGame || false);
    const [titleError, setTitleError] = useState('');
    const [yearReleasedError, setYearReleasedError] = useState('');
    const [developerError, setDeveloperError] = useState('');
    const [genreError, setGenreError] = useState('');
    const {formatMessage} = useIntl();

    const {
        validateYearReleased,
        validateDeveloper,
        validateTitleLength,
        validateGenre,
    } = useGameValidation();

    useEffect(() => {
        if (!isNewGame) {
            dispatch(actionGame.fetchGame(gameId));
        } else {
            const emptyData = {
                title: '',
                yearReleased: '',
                genre: '',
                developer: {
                    name: '',
                    location: '',
                    yearFounded: '',
                    numberOfEmployees: '',
                },
            }
            setEditingGameData(emptyData);
            setEditMode(true);
        }
    }, [dispatch, gameId, location.state]);

    useEffect(() => {
        if (game) {
            setGameData(game);
            setEditingGameData(game);
        }
    }, [game]);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        try {
            await saveGameData();
            setGameData(editingGameData);
            setEditMode(false);
        } catch (error) {
            handleError();
        } finally {
            fetchGameDataIfNeeded();
        }
    };

    const validateForm = () => {
        const isValidTitle = validateTitleLength(editingGameData.title);
        const isValidYearReleased = validateYearReleased(editingGameData.yearReleased);
        const isValidDeveloper = validateDeveloper(editingGameData.developer?.name);
        const isValidGenre = validateGenre(editingGameData.genre);

        setTitleError(isValidTitle ? '' : formatMessage({ id: 'title-validation' }));
        setYearReleasedError(isValidYearReleased ? '' : formatMessage({ id: 'year-validation' }));
        setDeveloperError(isValidDeveloper ? '' : formatMessage({ id: 'dev-validation' }));
        setGenreError(isValidGenre ? '' : formatMessage({ id: 'genre-validation' }));

        return isValidTitle && isValidYearReleased && isValidDeveloper && isValidGenre;
    };

    const saveGameData = async () => {
        if (isNewGame) {
            await dispatch(actionGame.createGame(editingGameData));
            setSnackbarMessage(formatMessage({ id: 'game-created' }));
        } else {
            await dispatch(actionGame.updateGame(gameId, editingGameData));
            setSnackbarMessage(editingGameData.title + formatMessage({ id: 'game-updated' }));
        }
        setShowSnackbar(true);
    };

    const handleError = () => {
        setShowSnackbar(false);
        setEditMode(true);
    };

    const fetchGameDataIfNeeded = () => {
        if (!isNewGame) {
            dispatch(actionGame.fetchGame(gameId));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'developer') {
            setEditingGameData({
                ...editingGameData,
                developer: {
                    ...editingGameData.developer,
                    name: value,
                },
            });
        } else {
            setEditingGameData({
                ...editingGameData,
                [name]: value,
            });
        }
    };


    const handleCancel = () => {
        if (isNewGame) {
            navigate('/game-list');
        }
        setEditingGameData(gameData);
        setEditMode(false);
    };

    return (
        <Paper elevation={3}>
            <Typography variant={"title"}>{formatMessage({id: "game-details-header"})} {gameData.title}</Typography>
            {editMode ? (
                <GameDetailsEdit
                    editingGameData={editingGameData}
                    errors={{title: titleError, yearReleased: yearReleasedError, genre: genreError, developer: developerError}}
                    onChange={handleChange}
                    onSave={handleSave}
                    onCancel={handleCancel}/>
            ) : (
                <GameDetailsView gameData={gameData} onEdit={handleEdit}/>
            )}
            <Snackbar
                open={showSnackbar}
                message={snackbarMessage}
                onClose={() => setShowSnackbar(false)}
                autoHideDuration={3000}
            />
        </Paper>
    );
}

export default GameDetails;
