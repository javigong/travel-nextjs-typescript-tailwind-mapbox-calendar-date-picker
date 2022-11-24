import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../server/db/prismadb";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {hotelId, userEmail} = req.body;
  if (req.method === "DELETE") {
    const hotel = await prisma.hotel.delete({
      where: { hotelId_userEmail: { hotelId: hotelId as string, userEmail: userEmail as string } },
    });
    res.json(hotel);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
