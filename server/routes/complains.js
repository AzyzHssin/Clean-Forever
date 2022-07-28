const express= require ('express')
const router = express.Router();

const { addComplain ,
    getAllComplains,
    getOneComplain,
    updateComplain,
    deletecomplain
    }= require('../controllers/complain');

router.post('/complain',addComplain);
router.get('/complains',getAllComplains);
router.get('complain/:id',getOneComplain)
router.put('/complain/:id',updateComplain)
router.delete('complain/:id',deletecomplain)
module.exports={
    routes:router
}