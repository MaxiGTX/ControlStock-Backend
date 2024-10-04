require("dotenv").config();

const config = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/basedeprueba2',
    SERVER: 'local',
    SECRET: process.env.JWT_SECRET, 
    JWT_SECRET: process.env.JWT_SECRET
};

module.exports = config;
