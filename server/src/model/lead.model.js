const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 100,
		},
		email: {
			type: String,
			required: true,
			trim: true,
			lowercase: true,
			unique: true,
		},
		phone: { type: String, required: true, trim: true },
	},
	{ timestamps: true },
);

module.exports = mongoose.model('Lead', leadSchema);
