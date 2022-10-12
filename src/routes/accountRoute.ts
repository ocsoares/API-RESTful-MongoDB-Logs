import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';
import { accountValidation } from '../middleware/accountValidation';
import { AuthenticationMiddleware } from '../middleware/authenticationMiddleware';
import { handleValidation } from '../middleware/handleValidation';

const accountRoute = Router();

const accountController = new AccountController();
const authenticationMiddleware = new AuthenticationMiddleware();

// Registro
accountRoute.post('/account', accountValidation(), handleValidation, accountController.registerAccount);

// Login
accountRoute.get('/account', authenticationMiddleware.basicAuthentication, accountController.loginAccount);

export default accountRoute;