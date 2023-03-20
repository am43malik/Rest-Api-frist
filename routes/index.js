import express from 'express'
import loginController from '../controller/loginController'
import productsController from '../controller/produtsController'
import registerController from '../controller/registerController'
import userController from '../controller/userController'
import admin from '../middleware/admin'
import  userauth from '../middleware/usermiddlewere'

 const router= express.Router()

router.post('/register',registerController.register)
router.post('/login', loginController.login)
router.get('/me', userauth, userController.me)
router.post('/prosuts',[userauth,admin],productsController.store)
router.put('/prosuts/:id',[userauth,admin],productsController.update)
router.delete('/prosuts/:id',[userauth,admin],productsController.destroy)
router.get('/prosuts',productsController.index)
router.get('/prosut/:id',productsController.one)








 export default router;




































