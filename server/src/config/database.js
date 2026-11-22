const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		if (!process.env.DB_URL) {
			throw new Error('Database is not configured');
		}
		await mongoose.connect(process.env.DB_URL);
	} catch (err) {
		console.error(`Error: ${err.message}`);
		process.exit(1);
	}
};

module.exports = connectDB;
