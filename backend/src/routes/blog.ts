import { Hono } from 'hono'

import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogSchema, updatedBlogSchema } from '@fate007/blog-common'

export const blog = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET: string
	}
  Variables: {
    userId: string
  }
}>();


blog.use('', async (c, next) => {
  
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

blog.post('', async (c) => {

    interface Blog {
        title: string,
        content: string,
        published: boolean
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body: Blog = await c.req.json();
    const { success } = createBlogSchema.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({
        msg: "Invalid inputs"
      });
    }

    const title = body.title;
    const content = body.content;
    const published = body.published;

    const id = c.get('userId');

    const newBlog = await prisma.post.create({
        data: {
            title,
            content,
            published,
            authorId: id,
        }
    })

    return c.json({
        id: newBlog.id
    });

// return c.text("POST blog route");


})

blog.put('', async (c) => {

    interface Blog {
        title: string,
        content: string,
        published: boolean,
        blogId: string,
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body: Blog = await c.req.json();
    const { success } = updatedBlogSchema.safeParse(body);

    if(!success){
      c.status(400);
      return c.json({
        msg: "Invalid inputs"
      });
    }

    const blogId = body.blogId;
    const title = body.title;
    const content = body.content;
    const published = body.published;

    const id = c.get('userId');

    console.log(`ID =  ${id}`);

    // Check if current user is the owner of the blog
    const blogInfo = await prisma.post.findUnique({
        where: {
            id: blogId
        },
        select: {
            authorId: true,
        }
    })

    if(blogInfo == null){
        return c.json({
            msg: "No blog exists with the given author id"
        })
    }

    if(blogInfo.authorId !== id){
        c.status(403);
        return c.json({
            msg: "You are not the owner of this blog",
        });
    }
    

    const updatedBlog = await prisma.post.update({
        where: {
            id: blogId
        },
        data: {
            title,
            content,
            published,
        }
    })

    return c.json({
        id: updatedBlog.id
    });
})

blog.get('bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    
    // console.log("Hello");
    const allBlogs = await prisma.post.findMany();
    // console.log(allBlogs);

    return c.json(allBlogs);
})

blog.get(':id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');

    const blogPost = await prisma.post.findUnique({
        where: {
            id: blogId
        }
    })

    return c.json(blogPost);
})

