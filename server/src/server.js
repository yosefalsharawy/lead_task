const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = require('../src/app');
const connectDB = require('../src/config/database');
const port = process.env.PORT || 3000;

const startServer = async () => {
	try {
		await connectDB();

		app.listen(port, () => {
			console.log(`Server listening on port ${port}`);
			console.log('database is initialized');
		});
	} catch (error) {
		console.error('Failed to initialize database:', error);
		process.exit(1);
	}
};

startServer();
