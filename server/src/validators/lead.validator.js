const { body, param } = require('express-validator');
const validationMiddleware = require('../middleware/validation.middleware');

const phoneOk = (v) => {
	const digits = v.replace(/\D/g, '').length;
	return /^\+?[\d\s().-]+$/.test(v) && digits >= 7 && digits <= 15;
};

const createLeadValidator = [
	body('name', 'Enter a name between 2 and 100 characters.')
		.isString()
		.trim()
		.isLength({ min: 2, max: 100 }),
	body('email', 'Enter a valid email address.')
		.isString()
		.trim()
		.toLowerCase()
		.isEmail()
		.isLength({ max: 254 }),
	body('phone', 'Enter a phone number with 7 to 15 digits.')
		.isString()
		.trim()
		.custom(phoneOk),
	validationMiddleware,
];

const getLeadByIdValidator = [
	param('id', 'Invalid lead id.').isMongoId(),
	validationMiddleware,
];

module.exports = { createLeadValidator, getLeadByIdValidator };
