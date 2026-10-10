let IS_PROD = true;

const server = IS_PROD ? process.env.BACKEND_PROD_URL : process.env.BACKEND_DEV_URL

export default server;