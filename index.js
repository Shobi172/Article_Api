const express = require('express');
const bodyParser = require('body-parser');
const articlesRouter = require('./routes/ArticleRoute');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use((req,res,next)=>{
    console.log(req.method, req.path);
    next();
});

app.use('/', articlesRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
