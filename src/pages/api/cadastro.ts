import type { NextApiRequest, NextApiResponse } from 'next';
import { conectarBD } from 'middlewares/conectarBD';
import type { CadastroUsuario } from 'types/CadastroUsuario';
import { UsuarioModel } from 'models/UsuarioModel';
import md5 from 'md5';

const cadastrarUsuario = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'POST') {
    const usuario = req.body as CadastroUsuario;

    if(!usuario.nome || usuario.nome.length < 2) {
      return res.status(400).json({erro: 'Nome inválido'})
    }

    if (!usuario.email || usuario.email.length < 5 || !usuario.email.includes('@') || !usuario.email.includes('.')) {
      return res.status(400).json({erro: 'Email inválido'})
    }

    if(!usuario.senha || usuario.senha.length < 4) {
      return res.status(400).json({erro: 'Senha inválida'})
    }

    const usuarioSalvo = {
      nome: usuario.nome,
      email: usuario.email,
      senha: md5(usuario.senha)
    }

    const usuarioEncontrado = await UsuarioModel.find({email: usuario.email})

    if(usuarioEncontrado && usuarioEncontrado.length > 0) {
      return res.status(400).json({erro: 'Email já cadastrado'})
    }

    UsuarioModel.create(usuarioSalvo);

    return res.status(200).json({msg: 'Usuario cadastrado com sucesso'})
  }

  return res.status(405).json({erro: 'Método informado não é válido'})
}

export default conectarBD(cadastrarUsuario);