import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  console.log(c.req.query("Hello Hono!"));

const text = c.req.query('text')

  if (!text) {
    c.status(400);
    return c.json ({error: "Field text is required"});
  }
  const length = text.split(/\.s/).length;
return c.json({length})

})

export default app