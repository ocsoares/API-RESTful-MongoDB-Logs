import { Router } from 'express';
import { AccountController } from '../controllers/AccountController';
import { accountValidation } from '../middleware/accountValidation';
import { handleValidation } from '../middleware/handleValidation';

const accountRoute = Router();

const accountController = new AccountController();

// Registro
accountRoute.post('/account', accountValidation(), handleValidation, accountController.registerAccount);

accountRoute.get('/account', accountController.loginAccount);

export default accountRoute;