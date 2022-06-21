const router = require('express').Router();
const { readFile, writeFile } = require('../helpers/readWriteFile');
const { isValidToken,
  isNameValid,
  isAgeValid,
  validTalker,
  validateWatchedAt,
  validateRate } = require('../middlewares/validations');

// requisito 1    
router.get('/', async (_req, res) => {
    const data = await readFile();
    if (data.length === 0) {
        res.status(200).json([]);
    } else {
        res.status(200).json(data);
    }
});

// requisito 2
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await readFile();
    const talker = data.find((item) => item.id === Number(id));

    if (!talker) {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talker);
});

  // requisito 5
router.post('/',
    isValidToken,
    isNameValid,
    isAgeValid,
    validTalker,
    validateWatchedAt,
    validateRate,
    async (req, res) => {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const data = await readFile();
        const newTalker = {
            id: data.length + 1,
            name,
            age,
            talk: {
                watchedAt,
                rate,
            },
        };
        data.push(newTalker);
        await writeFile(data);
        return res.status(201).json(newTalker);
    });

//  requisito 6
router.put('/:id',
    isValidToken,
    isNameValid,
    isAgeValid,
    validTalker,
    validateWatchedAt,
    validateRate,
    async (req, res) => {
        const { id } = req.params;
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const data = await readFile();
        const talker = data.find((item) => Number(item.id) === Number(id));
        data.splice(data.indexOf(talker), 1);
        const newTalker = {
            id: Number(id),
            name,
            age,
            talk: {
                watchedAt,
                rate,
            },
        };
        data.push(newTalker);
        await writeFile(data);
        return res.status(200).json(newTalker);
    });

// requisito 7

router.delete('/:id',
    isValidToken,
    async (req, res) => {
        const { id } = req.params;
        const data = await readFile();
        const talker = data.find((item) => Number(item.id) === Number(id));
        data.splice(data.indexOf(talker), 1);
        await writeFile(data);
        return res.status(204).json();
    });

module.exports = router;