const mongoose = require('mongoose');

const { Schema } = mongoose;

const FormSchema = new Schema({
  title : {
      type : String,
      required : true,
      trim : true
  },
  inputs : [],
  // inputs will contain array of below objects
  // {
  //    type:"",
  //    title:"", 
  //    placeholder: "",
  // }
})



exports.Form = mongoose.model('Form',FormSchema);