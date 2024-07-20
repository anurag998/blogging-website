import { Hono } from 'hono'

import { user } from './routes/user'
import { blog } from './routes/blog'
import { cors } from 'hono/cors'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables: {
    userId: string
  }
}>();

app.use('*', cors())

app.get('/', (c) => {
  return c.text('Hello Hono!');
})

app.route('/api/v1/blog', blog);
app.route('/api/v1/user', user);



export default app
