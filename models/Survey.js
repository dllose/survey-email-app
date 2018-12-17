const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
//es6
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
	title: String,
	body: String,
	subject: String,
	recipients: [RecipientSchema], // Array containing RecipientSchema. Should be a Recipient model?
	yes: {
		type: Number,
		default: 0
	},
	no: {
		type: Number,
		default: 0
	},
	// _user: { type: Schema.Types.ObjectId, ref: 'users' }
	_user: { type: Schema.Types.ObjectId, ref: 'User' },
	dateSent: { type: Date },
	lastResponded: { type: Date }
});

mongoose.model('surveys', surveySchema);



// curl --request POST \
// --url https://api.sendgrid.com/v3/mail/send \
// --header 'authorization: Bearer <<YOUR_API_KEY>>' \
// --header 'content-type: application/json' \
// --data '{"personalizations":[{"to":[{"email":"john.doe@example.com","name":"John Doe"}],"subject":"Hello, World!"}],"content": [{"type": "text/plain", "value": "Heya!"}],"from":{"email":"sam.smith@example.com","name":"Sam Smith"},"reply_to":{"email":"sam.smith@example.com","name":"Sam Smith"}}'