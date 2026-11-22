const test = require('node:test');
const assert = require('node:assert/strict');
const Lead = require('../src/model/lead.model');
const { getLeads } = require('../src/controllers/lead.controller');

test('GET /api/v1/leads returns leads in a success envelope', async () => {
	const leads = [{ _id: 'lead-1', name: 'Example Lead' }];
	const originalFind = Lead.find;
	let responseBody;
	const res = {
		json(body) {
			responseBody = body;
			return this;
		},
	};

	Lead.find = () => ({ sort: async () => leads });
	try {
		await getLeads({}, res, (error) => {
			throw error;
		});
	} finally {
		Lead.find = originalFind;
	}

	assert.deepEqual(responseBody, { success: true, data: leads });
});
