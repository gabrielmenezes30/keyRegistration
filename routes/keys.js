import mongoose from 'mongoose'
import express from 'express'
import Key from '../models/Key.js'
const router = express.Router()

router.get('/', (req, res)=>{
    Key.find().lean().then((keys)=>{
        res.render('keys', {keys})
    }).catch((err)=>{
        console.log(err)
    })
})

router.post('/cadastrar', async (req, res) => {
    const name = req.body.name;
    const errors = [];

    try {
        if (!name || typeof name === 'undefined' || name === null) {
            errors.push({ text: 'Erro ao tentar registrar chave' });
            return res.redirect('/chaves');
        }

        // Verificar se já existe uma chave com o mesmo nome
        const existingKey = await Key.findOne({ name: name });
        if (existingKey) {
            errors.push({ text: 'Uma chave com este nome já existe' });
            return res.redirect('/chaves');
        }

        if (errors.length > 0) {
            console.log('Erro ao tentar registrar chave', errors);
        } else {
            const newKey = { name: name };

            new Key(newKey).save()
                .then(() => {
                    res.redirect('/chaves/');
                    console.log('Sucesso');
                })
                .catch((err) => {
                    console.log('Erro ao salvar chave:', err);
                    res.redirect('/chaves');
                });
        }
    } catch (e) {
        console.log('Erro interno', e);
        res.redirect('/chaves');
    }
});



export default router