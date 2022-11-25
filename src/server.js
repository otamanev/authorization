const express = require('express');
const router = require('./router');

const app = express();
app.use(router);

app.listen(3001, () => {
  console.log(`Example app listening on port 3001`);
});
