const express = require('express');
const cors = require('cors');
const { faker } = require('@faker-js/faker');

const app = express();
app.use(cors());

app.get('/messages/unread', (req, res) => {
  const messages = Array.from({ length: faker.number.int({ min: 0, max: 5 }) }, () => ({
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: faker.lorem.words(3),
    body: faker.lorem.paragraph(),
    received: Math.floor(Date.now() / 1000) - faker.number.int({ min: 0, max: 86400 }),
  }));

  res.json({
    status: 'ok',
    timestamp: Math.floor(Date.now() / 1000),
    messages,
  });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));