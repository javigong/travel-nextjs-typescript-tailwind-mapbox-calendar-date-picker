import { NextApiRequest, NextApiResponse } from "next";
import { IReservation } from "../../types/typings";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    hotelId,
    title,
    description,
    img,
    location,
    startDate,
    endDate,
    price,
    total,
    userEmail,
    long,
    lat,
    star,
    cityId,
  } = req.body;

  const transformedItems : IReservation[] = [
    {
      price_data: {
        currency: "cad",
        unit_amount: total * 100,
        product_data: {
          name: title,
          description: description,
          images: [img],
        },
      },
      quantity: 1,
    },
  ];

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_options: [{ shipping_rate: "shr_1M86JTEXNZK6Is4blwjE8jYF" }],
    shipping_address_collection: {
      allowed_countries: ["CA", "US", "GB"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/details`,
    metadata: {
      email: userEmail,
      images: JSON.stringify([img]),
      hotelId: hotelId,
      description: description,
      img: img,
      location: location,
      lat: lat,
      long: long,
      price: price,
      star: star,
      title: title,
      total: total,
      userEmail: userEmail,
      cityId: cityId,
      startDate: startDate,
      endDate: endDate,
    },
  });

  res.status(200).json({ id: session.id });
};
