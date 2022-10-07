import winston from 'winston';

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

// Dependendo do Ambiente, vai lançar AVISOS ou ERROS !! <<
const checkEnvironment = () => {
    if (process.env.NODE_ENV === 'production') {
        return 'warn';
    }
    else {
        return 'debug';
    }
};

const colorsLog = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'white'
};

// Adiciona as Cores passadas no Objeto acima !! <<
winston.addColors(colorsLog);

// Formatando o log com um timestamp no Padrão AMERICANO !! (Ano-mês-dia, hora:minuto:segundo) <<
const formatLog = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} - ${info.level}: ${info.message}`
    )
);

// É um ARRAY !! <<
const transportsLog = [
    new winston.transports.Console(),

    // Vai criar um Arquivo para UM Determinado Log !! <<
    new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error'
    }),

    new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn'
    }),

    // new winston.transports.File({
    //     filename: 'logs/info.log',
    //     level: 'info'
    // }),

    // new winston.transports.File({
    //     filename: 'logs/http.log',
    //     level: 'http',
    // }),

    // new winston.transports.File({
    //     filename: 'logs/debug.log',
    //     level: 'debug'
    // }),

    // Vai criar um Arquivo para TODOS os LOGS !! <<
    new winston.transports.File({
        filename: 'logs/all-logs.log'
    })
];

// Esse vai ser o Comando usado para Determinar o Log !! <<
// OBS: Exportar !! <<
const Logger = winston.createLogger({
    level: checkEnvironment(),
    levels,
    format: formatLog,
    transports: transportsLog
});

export default Logger;