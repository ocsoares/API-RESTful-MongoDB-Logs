declare namespace Express {
    interface Request {
        basicEmail: any; // any porque as Credenciais vão vir do USUÁRIO e vai ser Verificado no Banco de Dados !! <<
        basicPassword: any; // any porque as Credenciais vão vir do USUÁRIO e vai ser Verificado no Banco de Dados !! <<
    }
}