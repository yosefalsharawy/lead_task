function errorHandler(err, _req, res, _next) {
	const statusCode = err.statusCode || 500;
	res.status(statusCode).json({
		success: false,
		error: {
			message: statusCode === 500 ? 'Internal server error.' : err.message,
			details: [],
		},
	});
}

module.exports = { errorHandler };
