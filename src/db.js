import mongoose from "mongoose";
import config from "./config/config.js";
import { logger } from "./utils/logger.js";

const { 
    mongo: { dbUrl } 
} = config;
const database = {
    connect: async function() {
        try {
            await mongoose.connect(dbUrl);
        } catch (error) {
            logger.error(error);
        }
    }
};

export default database;