const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    firstname: String,
    lastname: String,
    email: String
});

// mongoose.model('nameOfCollection', schema);
mongoose.model('users', userSchema);

