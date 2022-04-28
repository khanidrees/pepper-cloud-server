const express =  require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');


const  { Form} = require('./models');

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended : true}));




app.get('/all',async (req,res,next)=>{
  try{
    const allForms = await Form.find({});
    res.json({
      "messsage":"Found all forms",
      "result": allForms
    });
  }catch(e){
    console.log(e);
  }
  
  
});

app.get('/form/:formId',async (req, res,next)=>{
  const formId = req.params.formId;

  if(!formId){
    return res.status(400).json({
      "message": "error while getting form"
    });
  }
  const form = await Form.findById(formId);
  if(!form){
    return res.status(400).json({
      "message": "error while getting form"
    });
  }
  res.json({
    "message" : "form found",
    "result": form
  });
    

});

app.post('/form',async (req, res,next)=>{
  const title = req.body.title;
  const inputs = req.body.inputs;

  if(!title || !inputs){
    return res.status(400).json({
      "message": "error while saving form"
    });
  }
  const form = await new Form({
    title,
    inputs
  }).save();
  return res.json({
      "message": "form saved successfully",
      form
  });

});

app.put('/form/:formId',async (req, res, next)=>{
  const formId = req.params.formId;
  const title = req.body.title;
  const inputs = req.body.inputs;
  if(!formId){
    return res.status(400).json({
      "message": "error while updating form"
    });
  }
  const form = await Form.findByIdAndUpdate(formId,{
    title,
    inputs
  });
  if(!form){
    return res.status(400).json({
      "message": "error while getting form"
    });
  }
  res.json({
    "message" : "form updated",
    "result": form
  });
});



mongoose.connect('mongodb+srv://idrees:idrees@cluster0.7snls.mongodb.net/pepper?retryWrites=true&w=majority',()=>{
  app.listen(8000, ()=>{
  console.log('server started at 8000');
});
});
