const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//es6
const { Schema } = mongoose;

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [String], // Array containing Strings. Should be a Recipient model?
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	}
	//user: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});

mongoose.model('surveys', surveySchema);