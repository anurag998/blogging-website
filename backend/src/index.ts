import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'


const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables: {
    userId: string
  }
}>();

app.use('/api/v1/blog/*', async (c, next) => {
  
  const jwt = c.req.header('Authorization') || "";
	const token = jwt.split(' ')[1];
  console.log(token);
  
  try {
    const payload = await verify(token, c.env.JWT_SECRET);
    
    console.log(payload);
    if (!payload) {
      c.status(401);
      return c.json({ error: "unauthorized" });
    }
    
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    console.log(error);
    c.status(401);
    return c.json({ error: "unauthorized" });
	}
});

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const email = body.email;
  const password = body.password;
  const name = body.name;

  const newUser = await prisma.user.create({
    data: {
      email:email,
      name: name,
      password: password
    },
  });

  console.log(newUser);

  const token = await sign({id: newUser.id}, c.env.JWT_SECRET);

  return c.json({
    msg: "Signup Successful",
    token: token
  });

})

app.post('/api/v1/user/signin', async (c) => {
  // return c.text("Signin Route");

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  
  const email = body.email;
  const password = body.password;

  const userPresent = await prisma.user.findUnique({
    where: {
      email: email,
      password:password
    }
  })

  console.log(userPresent);

  if(userPresent != null){
    const token = await sign({id: userPresent.id}, c.env.JWT_SECRET);
    // console.log(token)
    return c.json({
      msg: "Signin successful",
      token: token
    })
  }

  return c.json({
    msg: "Wrong creds"
  });

})

app.post('/api/v1/blog', (c) => {
  return c.text("POST blog route");
})

app.put('/api/v1/blog', (c) => {
  return c.text("PUT blogg route");
})

app.get('/api/v1/blog/:id', (c) => {
  return c.text("get blog id API");
})

app.get('/api/v1/blog/bulk', (c) => {
  return c.text("Get blogs bulk");
})

export default app
