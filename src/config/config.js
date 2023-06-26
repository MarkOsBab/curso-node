import dotenv from 'dotenv';
dotenv.config();

const config = {
    mongo: {
        dbUrl: process.env.DB_URL,
    },
    session: {
        sessionSecret: process.env.SESSION_SECRET,
    },
    github: {
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackUrl: process.env.CALLBACK_URL,
    },
    server: {
        port: process.env.PORT,
        developmentMode: process.env.DEV_MODE
    }
};

export default config;