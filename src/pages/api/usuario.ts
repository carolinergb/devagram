import type { NextApiRequest, NextApiResponse } from 'next';
import { validarToken } from 'middlewares/validarToken';

const usuarioEndpoint = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({msg: 'Usuário autenticado com sucesso'})
}

export default validarToken(usuarioEndpoint);