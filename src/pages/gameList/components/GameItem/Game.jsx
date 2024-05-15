import GameItemMUI from "@mui/material/ListItem"
import IconButton from "../IconButton";
import DeleteIcon from "../DeleteIcon";
import DeleteDialog from '../DeleteDialog';
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useIntl} from "react-intl";

function GameItem({game, handleDeleteGame}) {
    const [isHovered, setIsHovered] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {formatMessage} = useIntl();

    const handleConfirmDelete = async () => {
        try {
            await handleDeleteGame(game.id);
            setOpenDialog(false);
        } catch (error) {
            console.error(error);
            setOpenDialog(true);
            setErrorMessage(formatMessage({ id: 'delete-game-error' }));
        }
    };

    return (
        <GameItemMUI
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/game/${game.id}`}>{game.title} - {game.genre}</Link>
            {isHovered && (
                <IconButton onClick={() => setOpenDialog(true)}>
                    <DeleteIcon/>
                </IconButton>
            )}
            <DeleteDialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                gameTitle={game.title}
                errorMessage={errorMessage}
                onConfirm={handleConfirmDelete}
            />
        </GameItemMUI>
    );
}

export default GameItem;
