import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userEmail, sessionId, amountTotal, images } = req.body;

  const result = await prisma.booking.create({
    data: {
      userEmail,
      sessionId,
      amountTotal,
      images: JSON.stringify(images),
    },
  });
  res.json(result);
}
