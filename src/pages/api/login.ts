import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarBD } from 'middlewares/conectarBD';
import { UsuarioModel } from 'models/UsuarioModel';
import md5 from 'md5';

const endpointLogin = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const { login, senha } = req.body;

    const usuarioEncontrado = await UsuarioModel.find({email: login, senha: md5(senha)})

  if(usuarioEncontrado && usuarioEncontrado.length > 0) {
    res.status(200).json({msg: 'Usuário autenticado com sucesso'})
  } 
  return res.status(400).json({erro: 'Usuário ou senha inválidos'})
  }

  return res.status(405).json({erro: 'Método informado não está correto'})
}

export default conectarBD(endpointLogin);