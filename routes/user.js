import express from 'express'
const router = express.Router()

router.get('/', (req, res)=>{
    res.send('rota de usuarios')
})

export default router