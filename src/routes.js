const { Router } = require('express');

const StudentController = require('./app/controllers/StudentController');

const router = Router();

router.get('/students', StudentController.index);
router.get('/students/:id', StudentController.show);
router.delete('/students/:id', StudentController.delete);
router.post('/students', StudentController.store);
router.put('/students/:id', StudentController.update);

module.exports = router;
