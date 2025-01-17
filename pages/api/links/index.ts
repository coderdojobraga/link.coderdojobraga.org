import type { NextApiResponse } from 'next';
import pick from 'lodash/pick';
import { withAuth } from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
import dbConnect from '~/lib/database';
import Link, { ILink } from '~/models/Link';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data: ILink | ILink[];
};

type Response = Success | Error;

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const links = await Link.find({}).sort({ index: 'asc' });
        res.status(200).json({ success: true, data: links });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const params = pick(req.body, ['title', 'url', 'emoji', 'attention', 'index', 'slug']);
        const link = await Link.create(params);
        res.status(201).json({ success: true, data: link });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).json({
        success: false,
        error: { message: `Method ${method} Not Allowed` }
      });
      break;
  }
});
