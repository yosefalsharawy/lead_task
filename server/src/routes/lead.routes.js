const router = require('express').Router();
const {
	createLead,
	getLeadById,
	getLeads,
} = require('../controllers/lead.controller');
const {
	createLeadValidator,
	getLeadByIdValidator,
} = require('../validators/lead.validator');

router.post('/', createLeadValidator, createLead);
router.get('/', getLeads);
router.get('/:id', getLeadByIdValidator, getLeadById);

module.exports = router;
