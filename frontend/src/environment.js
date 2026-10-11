let IS_PROD = true;

const server = IS_PROD ? process.env.REACT_APP_BACKEND_PROD_URL : process.env.REACT_APP_BACKEND_DEV_URL

export default server;