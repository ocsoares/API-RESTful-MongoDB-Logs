import { body } from "express-validator";

export const accountValidation = () => {
    return [
        body('name').isString().withMessage('Insira um nome válido no formato string !'),
        body('email').isEmail().withMessage('Insira um email válido !').isString().withMessage('Insira um email válido no formato string !'),
        body('password').isString().withMessage('Insira uma senha válida no formato string !').isLength({ min: 6 }).withMessage('No mínimo 6 caracteres !')
    ];
};