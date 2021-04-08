import { Request, Response } from 'express'
import userModelTest from '../models/userModel'
import md5 from 'md5'
import { generateToken } from '../utils'

async function getAll(req: Request, res: Response) {
  try {
    const data = await userModelTest.find()

    return res.status(201).send(data)
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function login(req: Request, res: Response) {
  try {
    const data = await userModelTest.findOne(
      {
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
      },
      'name email'
    )

    if (!data) {
      return res.send({ msg: 'User not found' })
    }
    const token = await generateToken(req.body)

    return res.status(200).send({ msg: 'Achou o dito Cujo!!', data, token })
  } catch (error) {
    return res.status(400).send(error)
  }
}

async function create(req: Request, res: Response) {
  try {
    await userModelTest.create({
      name: req.body.name,
      email: req.body.email,
      password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
    })

    const token = await generateToken(req.body)

    return res.status(201).send({ message: 'Deu tudo Certo!!!', token })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function update(req: Request, res: Response) {
  try {
    await userModelTest.findByIdAndUpdate(req.params.id, {
      $set: {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password, process.env.SECRET as string & { asBytes: true }),
      },
    })

    return res.status(200).send({ message: 'Tudo Atualizado com sucesso!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    await userModelTest.findByIdAndRemove(req.params.id)

    return res.status(200).send({ msg: 'Registro apagado!' })
  } catch (error) {
    return res.status(400).send(error)
  }
}

export default { getAll, login, create, update, deleteOne }
