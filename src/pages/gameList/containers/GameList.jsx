import {useIntl} from 'react-intl';
import Typography from 'components/Typography';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import actionGames from '../actions/gameList';
import GameList from '../components/GameList';
import Snackbar from "../components/Snackbar";
import Button from "../components/Button";
import FilterForm from '../components/FilterForm';
import Pagination from "@mui/material/Pagination";
import Grid from "../../gameDetails/components/Grid";
import {Box} from "@mui/material";

function GameListPage() {
    const {formatMessage} = useIntl();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {games, loading, error, totalPages} = useSelector((state) => state.gameList);

    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [filters, setFilters] = useState({developerId: '', yearReleased: ''});
    const [page, setPage] = useState(1);

    useEffect(() => {
        const savedFilters = JSON.parse(localStorage.getItem('gameListFilters'));
        const savedPage = JSON.parse(localStorage.getItem('gameListCurrentPage'));

        if (savedFilters) {
            setFilters(savedFilters);
        }
        if (savedPage) {
            setPage(parseInt(savedPage));
        }

        if (!loading) {
            dispatch(actionGames.fetchGames(savedFilters, savedPage));
        }
    }, [dispatch]);

    const handleDeleteGame = async (gameId) => {
        try {
            await dispatch(actionGames.deleteGame(gameId));
            setSnackbarMessage(formatMessage({id: 'snackbar-message'}));
            setShowSnackbar(true);
        } catch (error) {
            setSnackbarMessage(formatMessage({id: 'snackbar-error-message'}));
            setShowSnackbar(true);
        }
    };

    const handleApplyFilters = (newFilters) => {
        setFilters(newFilters);
        setPage(1);
        localStorage.setItem('gameListFilters', JSON.stringify(newFilters));
        localStorage.setItem('gameListCurrentPate', JSON.stringify(1));
        dispatch(actionGames.fetchGames(newFilters, 1));
    };

    const handleAddGame = () => {
        navigate('/game/new', { state: { isNewGame: true } });
    };

    const handlePageChange = (event, value) => {
        setPage(value);
        dispatch(actionGames.fetchGames(filters, value));
        localStorage.setItem('gameListCurrentPage', value);
    };

    return (
        <div>
            <Typography variant={"title"}>
                    {formatMessage({id: 'title'})}
            </Typography>
            <Grid container >
                <Button onClick={handleAddGame}>{formatMessage({ id: 'add-game' })}</Button>
                <FilterForm filters={filters} setFilters={handleApplyFilters} />
            </Grid>
            {loading ? (
                <Typography variant={"subTitle"}>{formatMessage({id: 'loading'})}</Typography>
            ) : (
                <Box>
                    <GameList games={games} handleDeleteGame={handleDeleteGame} />
                </Box>
            )}
            <Pagination count={totalPages} page={page} onChange={handlePageChange} />
            <Snackbar
                open={showSnackbar}
                message={snackbarMessage}
                onClose={() => setShowSnackbar(false)}
                autoHideDuration={3000}
            />
        </div>
    );
}

export default GameListPage;
