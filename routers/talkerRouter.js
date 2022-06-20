const router = require("express").Router();
const { readFile, writeFile } = require("../helpers/readWriteFile");

router.get('/', async (_req, res) => {
    const data = await readFile();
    if (data.length === 0) {
        res.status(200).json([]);
    } else {
        res.status(200).json(data);
    }
}
);


module.exports = router;