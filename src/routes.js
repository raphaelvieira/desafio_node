import Router from 'express';
//import Brute from 'express-brute';
//import BruteRedis from 'express-brute-redis';
import UserController from './app/controllers/UserController';

import SessionController from './app/controllers/SessionController';
import authMiddleware from './app/middlewares/auth';
import validateSessionStore from './app/validators/SessionStore';
import validateUserStore from './app/validators/UserStore';

const routes = new Router();

/** Prevent brute force attack with redis
const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});
const bruteForce = new Brute(bruteStore);
*/
routes.post(
  '/sessions',
  validateSessionStore,
  // bruteForce.prevent,
  SessionController.store
);
routes.post('/users', validateUserStore, UserController.store);
// global middleware
routes.use(authMiddleware);
routes.get('/users/:id', UserController.index);

export default routes;
