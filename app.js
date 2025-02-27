const fs = require('fs').promises;

const text = 'This is a test - and it should be';

fs.writeFile('node-message.txt', text)
  .then(() => {
    console.log('Successfully written! Node');
  })
  .catch((err) => {
    console.error('Error writing file:', err);
  });