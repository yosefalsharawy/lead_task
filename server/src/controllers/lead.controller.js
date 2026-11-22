const Lead = require('../model/lead.model');

exports.createLead = async (req, res, next) => {
	try {
		const { name, email, phone } = req.body;
		const newLead = await Lead.create({ name, email, phone });
		res.status(201).json({ success: true, data: newLead });
	} catch (error) {
		next(error);
	}
};

exports.getLeads = async (_req, res, next) => {
	try {
		const leads = await Lead.find().sort({ createdAt: -1 });
		res.json({ success: true, data: leads });
	} catch (error) {
		next(error);
	}
};

exports.getLeadById = async (req, res, next) => {
	try {
		const lead = await Lead.findById(req.params.id);
		if (!lead) {
			return res.status(404).json({
				success: false,
				error: { message: 'Lead not found.', details: [] },
			});
		}
		res.json({ success: true, data: lead });
	} catch (error) {
		next(error);
	}
};
