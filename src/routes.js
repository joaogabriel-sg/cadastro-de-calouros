const { Router } = require('express');

const StudentController = require('./app/controllers/StudentController');

const router = Router();

router.get('/students', StudentController.index);
router.get('/students/:id', StudentController.show);

module.exports = router;