import React, { useState, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { addAxiosInterceptors } from 'misc/requests';
import * as pages from 'constants/pages';
import AuthoritiesProvider from 'misc/providers/AuthoritiesProvider';
import DefaultPage from 'pageProviders/Default';
import Loading from 'components/Loading';
import LoginPage from 'pageProviders/Login';
import PageContainer from 'pageProviders/components/PageContainer';
import pageURLs from 'constants/pagesURLs';
import GameListPage from 'pageProviders/GameList';
import GameDetailsPage from 'pageProviders/GameDetails';
import SecretPage from 'pageProviders/Secret';
import ThemeProvider from 'misc/providers/ThemeProvider';
import UserProvider from 'misc/providers/UserProvider';

import actionsUser from '../actions/user';
import Header from '../components/Header';
import IntlProvider from '../components/IntlProvider';
import MissedPage from '../components/MissedPage';
import SearchParamsConfigurator from '../components/SearchParamsConfigurator';
import ProfileLoader from '../components/ProfileLoader';

function App() {
  const dispatch = useDispatch();
  const [componentDidMount, setComponentDidMount] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);

  const {
    errors,
    isFailedSignIn,
    isFailedSignUp,
    isFetchingSignIn,
    isFetchingSignUp,
    isFetchingUser,
  } = useSelector(({ user }) => user);

  useEffect(() => {
    addAxiosInterceptors({
      onSignOut: () => dispatch(actionsUser.fetchSignOut()),
    });
    setComponentDidMount(true);
  }, [dispatch]);

  const handleShowLoginMessage = () => {
    console.log('Showing login message');
    setShowLoginMessage(true);
  };

  useEffect(() => {
    console.log('showLoginMessage:', showLoginMessage);
  }, [showLoginMessage]);

  const handleCloseLoginMessage = () => {
    console.log('Closing login message');
    setShowLoginMessage(false);
  };

  return (
      <UserProvider>
        <AuthoritiesProvider>
          <ThemeProvider>
            <BrowserRouter>
              <SearchParamsConfigurator />
              {componentDidMount && (
                  <IntlProvider>
                    <Header onLogout={() => dispatch(actionsUser.fetchSignOut())} />
                    <ProfileLoader onUnauthorized={handleShowLoginMessage} />
                    {showLoginMessage && (
                        <div style={{ textAlign: 'center', padding: '20px', background: '#f8d7da', color: '#721c24' }}>
                          <h2>Unauthorized</h2>
                          <p>You need to login to access this content.</p>
                          <button onClick={() => window.location.href = 'http://13.53.173.115:1000/oauth/authenticate'}>
                            Login
                          </button>
                          <button onClick={handleCloseLoginMessage}>
                            Close
                          </button>
                        </div>
                    )}
                    {isFetchingUser && (
                        <PageContainer>
                          <Loading />
                        </PageContainer>
                    )}
                    {!isFetchingUser && (
                        <Routes>
                          <Route
                              element={<GameListPage />}
                              path={`${pageURLs[pages.gameListPage]}`}
                          />
                          <Route
                              element={<GameDetailsPage />}
                              path={`${pageURLs[pages.gameDetailsPage]}`}
                          />
                          <Route
                              element={<GameDetailsPage />}
                              path={`${pageURLs[pages.gameDetailsPage]}/new`}
                          />
                          <Route
                              element={<DefaultPage />}
                              path={`${pageURLs[pages.defaultPage]}`}
                          />
                          <Route
                              element={<SecretPage />}
                              path={`${pageURLs[pages.secretPage]}`}
                          />
                          <Route
                              element={<LoginPage
                                  errors={errors}
                                  isFailedSignIn={isFailedSignIn}
                                  isFailedSignUp={isFailedSignUp}
                                  isFetchingSignIn={isFetchingSignIn}
                                  isFetchingSignUp={isFetchingSignUp}
                                  onSignIn={({
                                               email,
                                               login,
                                               password,
                                             }) => dispatch(actionsUser.fetchSignIn({
                                    email,
                                    login,
                                    password,
                                  }))}
                                  onSignUp={({
                                               email,
                                               firstName,
                                               lastName,
                                               login,
                                               password,
                                             }) => dispatch(actionsUser.fetchSignUp({
                                    email,
                                    firstName,
                                    lastName,
                                    login,
                                    password,
                                  }))}
                              />}
                              path={`${pageURLs[pages.login]}`}
                          />
                          <Route
                              element={<MissedPage
                                  redirectPage={`${pageURLs[pages.defaultPage]}`}
                              />}
                              path="*"
                          />
                        </Routes>
                    )}
                  </IntlProvider>
              )}
            </BrowserRouter>
          </ThemeProvider>
        </AuthoritiesProvider>
      </UserProvider>
  );
}

export default App;
