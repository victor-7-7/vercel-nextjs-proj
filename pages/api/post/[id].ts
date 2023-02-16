
import prisma from '../../../lib/prisma';

// DELETE /api/post/:id
export default async function handle(req, res) {
  // This code handles HTTP DELETE requests that are coming in
  // via the /api/post/:id URL. The route handler then retrieves
  // the id of the Post record from the URL and uses Prisma Client
  // to delete this record in the database.
  const postId = req.query.id;
  if (req.method === 'DELETE') {
    const post = await prisma.post.delete({
      where: { id: postId },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`,
    );
  }
}