const { validationResult } = require('express-validator');

const validationMiddleware = (req, res, next) => {
	const result = validationResult(req);
	if (!result.isEmpty()) {
		return res.status(400).json({
			success: false,
			error: {
				message: 'Validation failed.',
				details: result.array().map(({ path, msg }) => ({
					field: path,
					message: msg,
				})),
			},
		});
	}
	next();
};

module.exports = validationMiddleware;
