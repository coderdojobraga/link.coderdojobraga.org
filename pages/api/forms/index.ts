import type { NextApiResponse } from 'next';
import pick from 'lodash/pick';
import { withAuth } from '~/lib/auth';
import { NextIronRequest } from '~/lib/session';
import dbConnect from '~/lib/database';
import Form, { IForm } from '~/models/Form';

type Error = {
  success: false;
  error: {
    message: string;
  };
};

type Success = {
  success: true;
  data: IForm | IForm[];
};

type Response = Success | Error;

export default withAuth(async (req: NextIronRequest, res: NextApiResponse<Response>) => {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const forms: IForm[] = await Form.find({}).populate({ path: 'editedBy', select: '-password' }).sort({ created: 'asc' });
        res.status(200).json({ success: true, data: forms });
      } catch (error) {
        res.status(400).json({ success: false, error: { message: error.message } });
      }
      break;
    case 'POST':
      try {
        const params = pick(req.body, ['name', 'slug', 'url']);
        const currentUser = req.session.get("currentUser");

        const form = await Form.create({ ...params, editedBy: currentUser._id });

        res.status(201).json({ success: true, data: await Form.populate(form, { path: 'editedBy', select: '-password' }) });
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
