import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'

export const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables: {
    userId: string
  }
}>();


blog.use('*', async (c, next) => {
  
    const jwt = c.req.header('Authorization') || "";
      const token = jwt.split(' ')[1];
    console.log(token);
    
    try {
      const payload: any = await verify(token, c.env.JWT_SECRET);
      
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

blog.post('', (c) => {
return c.text("POST blog route");
})

blog.put('', (c) => {
return c.text("PUT blogg route");
})

blog.get(':id', (c) => {
return c.text("get blog id API");
})

blog.get('bulk', (c) => {
return c.text("Get blogs bulk");
})