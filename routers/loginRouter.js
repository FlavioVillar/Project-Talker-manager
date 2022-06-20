const router = require('express').Router();
const generateToken = require('generate-password');
const { validateLogin } = require('../middlewares/validations');

router.post('/', validateLogin, async (_req, res) => {
  const token = generateToken.generate({ length: 16, numbers: true });
  res.status(200).json({ token });
});

module.exports = router;