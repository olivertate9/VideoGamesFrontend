import GameListMUI from '@mui/material/List';
import GameItem from '../GameItem';
import React from "react";

function GameList({games, handleDeleteGame}) {
    return (
        <GameListMUI>
            {games.map((game) => (
                <GameItem
                    key={game.id}
                    game={game}
                    handleDeleteGame={handleDeleteGame}
                />
            ))}
        </GameListMUI>
    );
}

export default GameList;
