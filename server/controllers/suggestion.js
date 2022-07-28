'use strict';
const firebase=require('../db');
const Suggestion = require('../models/suggestion');
const Suggestions = require('../routes/suggestion');
const firestore=firebase.firestore();


const addSuggestion = async (req,res,next)=>{
    try{
        const data =req.body;
        await firestore.collection('suggestions').doc().set(data);
        res.send('Suggestion Record saved successfly')
    }catch(error){
        res.status(400).send(error.message)
    }
}
const getAllSuggestions =async (req,res,next)=>{
    try{
        const suggestions=await firestore.collection('suggestions');
        const data= await suggestions.get()
        const suggestionsArray=[];
        if(data.empty){
            res.status(400).send('No suggestion record found')
        }
        else{
            data.forEach(doc => {
                const suggestion=new Suggestion(
                    doc.id,
                    doc.data().title,
                    doc.data().body,
                    doc.data().date
                );
                suggestionsArray.push(suggestion);
            });
            res.send(suggestionsArray )
        }
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

const getOneSuggestion= async(req,res,next)=>{
    try{
        const id=req.params.id;
        const suggestion = await firestore.collection('suggestions').doc(id);
        const data = await suggestion.get();
        if(!data.exists){
            res.status(400).send('suggestion with the given ID not found');
        }
        else{
            res.send(data.data());
        }
    } catch(error){
        res.status(400).send(error.message)
    }
}
const updateSuggestion = async(req,res,next)=>{
    try{    
        const id=req.params.id;
        const data= req.body;
        const suggestion = await firestore.collection('suggestions').doc(id);
        await suggestion.update(data)
        res.send('suggestions record updated successfully');
    }catch(error){
        res.status(400).send(error.message)
    }
}
 const deleteSuggestion = async (req,res,next)=>{
    try{    
        const id=req.params.id;
        await firestore.colletion('suggestions').doc(id).delete()
        res.send('suggestion record deleted successfully');
    }catch(error){
        res.status(400).send(error.message)
    }
}

module.exports = {
    addSuggestion,
    getAllSuggestions,
    getOneSuggestion,
    updateSuggestion,
    deleteSuggestion
}