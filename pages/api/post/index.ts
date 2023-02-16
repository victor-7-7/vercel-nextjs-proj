
import { getSession } from 'next-auth/react';
import prisma from '../../../lib/prisma';

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req, res) {
  // This code implements the handler function for any requests
  // coming in at the /api/post/ route. The implementation does
  // the following: First it extracts the title and cotent from
  // the body of the incoming HTTP POST request. After that, it
  // checks whether the request is coming from an authenticated
  // user with the getSession helper function from NextAuth.js.
  // And finally, it uses Prisma Client to create a new Post record in the database.
  const { title, content } = req.body;

  const session = await getSession({ req });
  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email } },
    },
  });
  res.json(result);
}
