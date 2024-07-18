import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinSchema,signupSchema } from '@fate007/blog-common'

export const user = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables: {
    userId: string
  }
}>();

user.post('signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
    const { success } = signupSchema.safeParse(body)

    if(!success){
      c.status(400);
      return c.json({
        msg: "Invalid inputs"
      });
    }

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
  
user.post('signin', async (c) => {
    // return c.text("Signin Route");
  
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();

    const { success } = signinSchema.safeParse(body);
    console.log(success);

    if(!success){
      c.status(400);
      return c.json({
        msg: "Invalid inputs"
      });
    }

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
