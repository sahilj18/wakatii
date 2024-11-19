import { Hono } from 'hono'
import { logger } from 'hono/logger';
import {cors} from'hono/cors';

const app = new Hono()

app.use(logger()); // Enable logger middleware

app.get("/status", (c) => {
  return c.json({ status: "API is Active" });
});

app.get("/", (c) => {
   const text = c.req.query('text')
if (!text) {
  return c.json({ message: "Please provide a text" }, 400);
}

return c.json(text);
}); 
// app.get('/', (c) => {
//   console.log(c.req.query("Hello Hono!"));

// const text = c.req.query('text')

//   if (!text) {
//     c.status(400);
//     return c.json ({error: "Field text is required"});
//   }
//   const length = text.split(/\.s/).length;
// return c.json({length})

// })

export default app;