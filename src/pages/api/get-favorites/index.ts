import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail } = req.query;
  if (req.method === "GET") {
    const user = await prisma.user.findUnique({
      where: { email: "jgongora@gmail.com" },
      select: { favorites: true}
    });
    res.json(user);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
