import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import mongoose from 'mongoose';

export const conectaBD = (handler: NextApiHandler) => {
  async (req: NextApiRequest, res: NextApiResponse) => {

    if(mongoose.connections[0].readyState) {
      return handler(req, res);
    }

    const {DB_CONEXAO_STRING} = process.env;

    if(!DB_CONEXAO_STRING) {
      return res.status(500).json({erro: 'Env não foi declarada'})
    }

    mongoose.connection.on('connected', () => console.log('Banco de dados conectado'));

    mongoose.connection.on('error', error => console.log(`Erro ao conectar com o banco de dados: ${error}`));

    await mongoose.connect(DB_CONEXAO_STRING);

    return handler(req, res);
  }
}
