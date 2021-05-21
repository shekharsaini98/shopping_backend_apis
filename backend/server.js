const app = require('./app');
const connectDatabase = require('./config/database');
const dotenv = require('dotenv');

// Handle Uncaught Exeception
process.on('uncaughtException', err => {
    console.log(`Error : ${err.message}`);
    console.log('Shutting down server due to Uncaught exeception');
    process.exit(1);
});
dotenv.config({ path: 'backend/config/config.env' });
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`process start on port ${process.env.PORT} in ${process.env.NODE_ENV}`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', err => {
    console.log(`Error : ${err.message}`);
    console.log('Shutting down server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1);
    });
});