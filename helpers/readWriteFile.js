const fs = require('fs').promises;

const readFile = async () => {
  try {
    const response = await fs.readFile('./talker.json', 'utf8');
    const data = JSON.parse(response);
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const writeFile = async (data) => {
  try {
    await fs.writeFile('./talker.json', JSON.stringify(data));
  } catch (err) {
    console.log(err, 'erro writeContentFile');
  }
};

module.exports = { readFile, writeFile };