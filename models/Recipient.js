const mongoose = require('mongoose');
const { Schema } = mongoose;

const recipientSchema = new Schema({
    name: String,
    email: String,
    hasResponded: { type: Boolean, default: false }
});

// Sub Document so it should be exported
module.exports = recipientSchema;