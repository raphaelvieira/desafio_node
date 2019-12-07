import User from '../models/User';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    const {
      id,
      name,
      email,
      cep,
      phones,
      created_at,
      updated_at,
    } = await User.create(req.body);

    const token = jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    });

    await user.update({ token }, { where: id });

    //get location from cep
    const geolocation = null;

    const last_login = created_at;

    return res.json({
      id,
      name,
      email,
      cep,
      geolocation,
      phones,
      token,
      created_at,
      updated_at,
      last_login,
    });
  }

  async index(req, res) {
    const authHeader = req.headers.authorization;
    //  destructuring
    // const [bearer, token] = authHeader.split(' ');
    const [, token] = authHeader.split(' '); // get just the second parameter
    const user = await User.findOne({ where: { id: req.params.id } });

    //jwt token validation is under auth Middleware
    if (token !== user.token) {
      return res.status(401).json({ error: 'Not Authorized' });
    }

    return res.json(user);
  }
}
export default new UserController();
