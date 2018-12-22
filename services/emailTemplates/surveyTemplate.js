const domainLink = require('../../config/keys').domainLink;

module.exports = function(survey) {
	return (
		`<html>
			<body>
				<div style="text-align: center;">
					<h3>I'd like your response</h3>
					<p>Please answer the following question: </p>
					<p>${survey.body}</p>
					<div>
						<a href="${domainLink}/api/surveys/thank-you-page">Yes</a>
					</div>
					<div>
						<a href="${domainLink}/api/surveys/thank-you-page">No</a>
					</div>
				</div>
			</body>
		</html>`
	);
};