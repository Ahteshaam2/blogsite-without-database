import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
const port=3000;

const app=express();
const about = "Excited him now natural saw passage offices you minuter. At by asked being court hopes. Farther so friends am to detract. Forbade concern do private be. Offending residence but men engrossed shy. Pretend am earnest offered arrived company so on. Felicity informed yet had admitted strictly how you.";
app.use(bodyParser.urlencoded({extended: true}));
let posts=[];
app.use(express.static("public"));
app.get("/",(req,res)=>{
   res.render("index.ejs" , {content : about,
   posts : posts});
   
})
app.get("/about",(req,res)=>{
    res.render("about.ejs" , {content : about});
 })
 app.get("/contact",(req,res)=>{
    res.render("contact.ejs" , {content : about});
 })
 app.get("/compose",(req,res)=>{
    res.render("compose.ejs" );
 })
 app.post("/publish",(req,res)=>{
       const Post={
          title: req.body.posttitle,
          postcontent: req.body.post
       };
       posts.push(Post);
       
    res.redirect("/");
 });
 app.get("/post/:postname" , function(req,res){
   const requestedpost = _.lowerCase(req.params.postname);
   posts.forEach(function(post){
      const titles = _.lowerCase(post.title);
      if(requestedpost===titles){
         res.render("post.ejs" , {
            title: post.title,
            content: post.postcontent
         });
      }
     
   });
 });
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
});