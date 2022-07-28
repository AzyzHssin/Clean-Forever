'use strict';
const firebase=require('../db');
const Complain = require('../models/complain');
const complains = require('../routes/complains');
const firestore=firebase.firestore();


const addComplain = async (req,res,next)=>{
    try{
        const data =req.body;
        await firestore.collection('complains').doc().set(data);
        res.send('Record saved successfly')
    }catch(error){
        res.status(400).send(error.message)
    }
}
const getAllComplains =async (req,res,next)=>{
    try{
        const complain=await firestore.collection('complains');
        const data= await complains.get()
        const complainsArray=[];
        if(data.empty){
            res.status(400).send('No Complain record found')
        }
        else{
            data.forEach(doc => {
                const complain=new Complain(
                    doc.id,
                    doc.data().title,
                    doc.data().body,
                    doc.data().date,
                    doc.data().status,
                    doc.data().subject
                );
                complainsArray.push(complain);
            });
            res.send(complainsArray )
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getOneComplain= async(req,res,next)=>{
    try{
        const id=req.params.id;
        const complain = await firestore.collection('complains').doc(id);
        const data = await complain.get();
        if(!data.exists){
            res.status(400).send('complain with the given ID not found');
        }
        else{
            res.send(data.data());
        }
    } catch(error){
        res.status(400).send(error.message)
    }
}
const updateComplain = async(req,res,next)=>{
    try{    
        const id=req.params.id;
        const data= req.body;
        const complain = await firestore.collection('complains').doc(id);
        await complain.update(data)
        res.send('Complain record updated successfully');
    }catch(error){
        res.status(400).send(error.message)
    }
}
 const deletecomplain = async (req,res,next)=>{
    try{    
        const id=req.params.id;
        await firestore.colletion('complains').doc(id).delete()
        res.send('Complain record deleted successfully');
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {
    addComplain,
    getAllComplains,
    getOneComplain,
    updateComplain,
    deletecomplain
}