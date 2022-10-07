import 'dotenv/config';
import mongoose from 'mongoose';
import Logger from '../config/logs';

// IMPORTANTE: A senha do Atlas em URL PRECISA Retirar os <> !! <<

const atlasDBConnection = async () => {
    // Logger.http('TESTE');
    try {
        await mongoose.connect(process.env.ATLAS_URL as string);
        console.log('Conectado com sucesso ao Atlas !');
    }
    catch (error: any) {
        console.log(error);
        console.log('Não foi possível conectar ao Atlas !');
    }
};

export default atlasDBConnection;