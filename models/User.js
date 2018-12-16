// const SurveySchema = require('./Survey');
const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    firstname: String,
    lastname: String,
    email: String,
    credits: {
        type: Number,
        default: 0
    }
    // surveys: [SurveySchema]
});

// mongoose.model('nameOfCollection', schema);
mongoose.model('users', userSchema);

