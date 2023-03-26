const express=require("express")
const todoRouter=express.Router()
const {TodoModel}=require("../model/todo.model")
const jwt=require("jsonwebtoken")

todoRouter.get("/",async(req,res)=>{
    const token=req.headers.authorization.split(" ")[1]
    const decoded=jwt.verify(token,"masai")
    try{
        if(decoded){
            const todos=await TodoModel.find({"userID":decoded.userID})
            res.status(200).send(todos)
        }
    } catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

todoRouter.post("/add",async(req,res)=>{
    try{
        const note=new TodoModel(req.body)
        await note.save()
        res.status(200).send({"msg":"A new todo has been added"}) 
    }catch(err){
        res.status(400).send({"msg":err.message}) 
    }
})

todoRouter.patch("/update/:id",async(req,res)=>{
    const payload=req.body
    const todoID=req.params.id
    try {
        await TodoModel.findByIdAndUpdate({_id:todoID},payload)
        res.status(200).send({"msg":"Todo has been updated"})
    } catch (error) {
        res.status(400).send({"msg":err.message})
    }
})

todoRouter.delete("/delete/:id",async(req,res)=>{
    const payload=req.body
    const todoID=req.params.id
    try {
        await TodoModel.findByIdAndDelete({_id:todoID})
        res.status(200).send({"msg":"Todo has been deleted"})
    } catch (error) {
        res.status(400).send({"msg":err.message})
    }
})

module.exports={
    noteRouter
}


