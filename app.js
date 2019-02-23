const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser: true});

const wikiSchema = new mongoose.Schema({
  title: String,
  content: String
})

const article = mongoose.model("article",wikiSchema);

// const wikiOne = new wiki({
//
// })

// app.get("/articles",(req,res)=>{
//   article.find({},(err,field)=>{
//     if(!err){
//       res.send(field);
//     }else{
//       res.send(err);
//     }
//   })
// });
//
// app.post("/articles",(req,res)=>{
//   const artNew = new article({
//      title: req.body.title,
//      content: req.body.content
//   })
//     artNew.save((err)=>{
//       if (!err){
//         res.send("successfully saved!");
//       }else{
//         res.send(err);
//       }
//     });
// });
//
// app.delete("/articles",(req,res)=>{
//   article.deleteMany({},(err)=>{
//     if (!err){
//       res.send("successfully deleted");
//     } else{
//       lres.send(err);
//     }
//   })
// })

//targeting all articles

app.route("/articles")

  .get((req,res)=>{
      article.find({},(err,field)=>{
        if(!err){
          res.send(field);
        }else{
          res.send(err);
        }
      });
  })

  .post((req,res)=>{
      const artNew = new article({
         title: req.body.title,
         content: req.body.content
      });
        artNew.save((err)=>{
          if (!err){
            res.send("successfully saved!");
          }else{
            res.send(err);
          }
        })
      // console.log(req.body.title);
      // console.log(req.body.content);
  })

  .delete((req,res)=>{
      article.deleteMany({},(err)=>{
        if (!err){
          res.send("successfully deleted");
        } else{
          lres.send(err);
        }
      })
  })

//targeting single article

app.route("/articles/:article")

  .get((req,res)=>{
    article.findOne({title: req.params.article},(err,field)=>{
      if (field){
        console.log("successfully found");
      } else{
        console.log(err);
      }
    });
  })

  .put((req,res)=>{
    article.update({
      title: req.params.article
    },
  {title: req.body.title,
   content: req.body.content},
  {overwrite: true},
  (err)=>{
    req.send("success");
  });
})

.patch((req,res)=>{
  article.update(
    {content: req.params.article},
    {$set: {title: req.body.title, content: req.body.content}},
    (err)=>{
      if (!err){
        res.send("success");
      }
    }
  )
})

.delete((req,res)=>{
  article.deleteOne({title: req.params.article},
  (err)=>{
    if(!err){
      res.send("success");
    }
  });
});







app.listen(3000,()=>{
  console.log("server running at port 3000");
});
