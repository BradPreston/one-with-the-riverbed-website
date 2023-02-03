import { NextApiRequest, NextApiResponse } from "next";

export default async function getShowDates(req: NextApiRequest, res: NextApiResponse) {
  const response = await fetch(`https://rest.bandsintown.com/artists/one%20with%20the%20riverbed/events?app_id=${process.env.APP_ID}&date=upcoming`);
  const data = await response.json()
  res.status(200).json(data)
}