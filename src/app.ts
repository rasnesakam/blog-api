import express from 'express';
import PostRouter from './posts/router'
import LinktreeRouter from './linktree/router';
const app = express();
const port = 3000;



app.use('/posts',PostRouter);
app.use('/links',LinktreeRouter);

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});