import express from 'express';
import errorHandller from './middleware/errorHandller';
import  Router  from "./routes";
import mongoose from 'mongoose';
import path from 'path'

const Port= 3000
const app= express();
// const uri= 'mongodb://localhost:27017/myapp'
const uri = 'mongodb+srv://admin:admin@cluster0.uj8iqnv.mongodb.net/?retryWrites=true&w=majority';
mongoose
  .connect(uri ,(err) => {

    if(err){
      console.log(err)
    }else{

      console.log("we are connected");
    }
  })
//   .catch((err) => console.log(err));
global.appRoot= path.resolve(__dirname) 
app.use(express.urlencoded({extended:false}))

app.use(express.json())
app.use(Router)
app.use('/upload',express.static('upload  '))


app.use(errorHandller)






app.listen(Port,()=>{
   console.log(`app Listen on ${Port}`)

})

