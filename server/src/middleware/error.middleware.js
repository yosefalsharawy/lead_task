function errorHandler(err, _req, res, _next) {
	const duplicateEmail =
		err.code === 11000 &&
		(Boolean(err.keyPattern?.email) || Boolean(err.keyValue?.email) || err.message?.includes('email_1'));
	const statusCode = duplicateEmail ? 409 : err.statusCode || 500;
	const message = duplicateEmail
		? 'A lead with this email already exists.'
		: statusCode === 500
			? 'Internal server error.'
			: err.message;
	const details = duplicateEmail
		? [{ field: 'email', message: 'This email is already in use.' }]
		: [];

	res.status(statusCode).json({
		success: false,
		error: {
			message,
			details,
		},
	});
}

module.exports = { errorHandler };
