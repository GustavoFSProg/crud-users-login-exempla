import Router from 'express'
import controller from '../src/controllers/controller'

const route = Router()

route.get('/', controller.getAll)
route.post('/register', controller.create)
route.post('/login', controller.login)
route.put('/update/:id', controller.update)
route.delete('/delete/:id', controller.deleteOne)

export default route
