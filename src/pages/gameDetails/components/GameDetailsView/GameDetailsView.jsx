import Typography from '../Typography';
import EditIcon from '@mui/icons-material/Edit';
import {useIntl} from "react-intl";
import Button from "../Button";
import React from "react";
import {useNavigate} from "react-router-dom";
import Grid from "../Grid";

function GameDetailsView({gameData, onEdit}) {
    const {formatMessage} = useIntl();
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/game-list');
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} container justifyContent="flex-end">
                    <Button onClick={onEdit} color="primary">
                        <EditIcon />
                    </Button>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">{formatMessage({id: 'title'})}: {gameData.title}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body1">{formatMessage({id: 'yearReleased'})}: {gameData.yearReleased}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">{formatMessage({id: 'genre'})}: {gameData.genre}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body1">{formatMessage({id: 'developer'})}: {gameData.developer?.name}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body1">{formatMessage({id: 'location'})}: {gameData.developer?.location}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        variant="body1">{formatMessage({id: 'year-founded'})}: {gameData.developer?.yearFounded}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body1">
                        {formatMessage({id: 'number-of-employees'})}: {gameData.developer?.numberOfEmployees}
                    </Typography>
                </Grid>
                <Grid container item xs={12} justify-content="space-around">
                        <Button variant="contained" color="primary" onClick={handleBack}>{formatMessage({id: 'back'})}</Button>
                </Grid>
            </Grid>
        </>
    );
}

export default GameDetailsView;
