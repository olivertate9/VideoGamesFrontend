import GameDetailsPage from 'pages/gameDetails';
import React from 'react';
import PageContainer from './components/PageContainer';

const GameDetails = (props) => {
    return (
            <PageContainer>
                <GameDetailsPage {...props} />
            </PageContainer>
    );
};

export default GameDetails;