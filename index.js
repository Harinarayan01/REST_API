const express=require('express');
const fs=require('fs')
const users=require("./mock_data.json")
const app=express();
const PORT=8000;
// middleware-Plugin
app.use(express.urlencoded({extended:false}));
// Routes
app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map((users)=>`<li>${users.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html)
  
})
  
 app.get("/",(req,res)=>{
    return res.json(users);
 })
// routes 
app
.route("/api/users/:id")
.get((req,res) =>{ 
   const id=Number(req.params.id);
    const user=users.find(user=>user.id===id)
    return res.json(user);
})
.patch((req,res)=>{
    // edit user with id
    return res.json({status:"panding"});
})
.delete((req,res)=>{
    //edit user with id 
    return res.json({status:"panding"}) 
});
app.post("/api/users",(req,res)=>{
    const body=req.body;
    users.push({...body,id: users.length+1});
    fs.writeFile('./mock_data.json',JSON.stringify(users),(err,data)=>{
        return res.json({status:"success",id:users.length})

    })
})
 
app.listen(PORT,()=> console.log(`server started at port number :${PORT}`))