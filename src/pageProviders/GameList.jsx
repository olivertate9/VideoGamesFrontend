import * as authorities from 'constants/authorities';
import GameListPage from 'pages/gameList';
import React from 'react';

import PageAccessValidator from './components/PageAccessValidator';
import PageContainer from './components/PageContainer';

const GameList = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <GameListPage {...props} />
            </PageContainer>
        </PageAccessValidator>
    );
};

export default GameList;