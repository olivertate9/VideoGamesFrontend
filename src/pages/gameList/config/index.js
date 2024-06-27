const config = {
    // Services
    GAMES_SERVICE: 'https://videogames-load-balancer-1719973211.eu-north-1.elb.amazonaws.com',
    UI_URL_PREFIX: process.env.REACT_APP_UI_URL_PREFIX || '',
};

export default config;