const router = require('express').Router();
const { readFile } = require('../helpers/readWriteFile');

router.get('/', async (_req, res) => {
    const data = await readFile();
    if (data.length === 0) {
        res.status(200).json([]);
    } else {
        res.status(200).json(data);
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const data = await readFile();
    const talker = data.find((item) => item.id === Number(id));

    if (!talker) {
        res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }

    return res.status(200).json(talker);
});

module.exports = router;