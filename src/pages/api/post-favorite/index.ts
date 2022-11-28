import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../server/db/prismadb";

// POST /api/post
// Required fields in body: title
// Optional fields in body: content
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const {
    hotelId,
    description,
    img,
    lat,
    location,
    long,
    price,
    star,
    title,
    total,
    cityId,
  } = req.body;

  const session = await getSession({ req });
  const result = await prisma.hotel.create({
    data: {
      hotelId,
      description,
      img,
      lat,
      location,
      long,
      price,
      star,
      title,
      total,
      userEmail: session?.user?.email!,
      cityId,
    },
  });
  res.json(result);
}