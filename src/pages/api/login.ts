import type { NextApiRequest, NextApiResponse } from 'next';
import { LoginResposta } from 'types/LoginResposta';
import { conectarBD } from 'middlewares/conectarBD';
import { UsuarioModel } from 'models/UsuarioModel';
import md5 from 'md5';
import jwt from 'jsonwebtoken';
import { RespostaPadraoMsg } from 'types/RespostaPadraoMsg';

const endpointLogin = async (req: NextApiRequest, res: NextApiResponse<RespostaPadraoMsg | LoginResposta>) => {

  const { MINHA_CHAVE_JWT } = process.env;

  if(!MINHA_CHAVE_JWT) {
    return res.status(500).json({erro: 'Env JWT não informada'})
  }

  if(req.method === 'POST') {
    const { login, senha } = req.body;

  const usuariosEncontrados = await UsuarioModel.find({email: login, senha: md5(senha)})

  if(usuariosEncontrados && usuariosEncontrados.length > 0) {

    const usuarioEncontrado = usuariosEncontrados[0];

    const token = jwt.sign({id: usuarioEncontrado.id}, MINHA_CHAVE_JWT)

    return res.status(200).json({
      nome: usuarioEncontrado.nome, 
      email: usuarioEncontrado.email, 
      token})
  } 
  return res.status(400).json({erro: 'Usuário ou senha inválidos'})
  }

  return res.status(405).json({erro: 'Método informado não está correto'})
}

export default conectarBD(endpointLogin);