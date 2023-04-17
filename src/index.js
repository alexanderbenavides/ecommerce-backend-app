const mongoose = require('mongoose');
const app = require('./app');

const {   
    DB_USER,
    DB_PASSWORD,
    DB_HOST 
} = require('./config/config');

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`);
      app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
};
  
start();