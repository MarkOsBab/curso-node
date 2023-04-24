import dotenv from 'dotenv';
dotenv.config();

const config = {
    dbUrl: process.env.DB_URL
};

export default config;