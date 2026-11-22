const router = require('express').Router();
const {
	createLead,
	deleteLead,
	getLeadById,
	getLeads,
	updateLead,
} = require('../controllers/lead.controller');
const {
	createLeadValidator,
	getLeadByIdValidator,
} = require('../validators/lead.validator');

router.post('/', createLeadValidator, createLead);
router.get('/', getLeads);
router.get('/:id', getLeadByIdValidator, getLeadById);
router.put('/:id', getLeadByIdValidator, createLeadValidator, updateLead);
router.delete('/:id', getLeadByIdValidator, deleteLead);

module.exports = router;
