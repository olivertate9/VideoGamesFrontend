import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';
import configureStore from 'misc/redux/configureStore';
import rootReducer from './reducers';

import getMessages from './intl';
import GameList from './containers/GameList';
import {Provider} from "react-redux";

const store = configureStore(rootReducer);

function Index(props) {
    const {
        lang,
    } = useLocationSearch();

    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <IntlProvider messages={messages}>
            <Provider store={store}>
                <GameList {...props} />
            </Provider>
        </IntlProvider>
    );
}

export default Index;