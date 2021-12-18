import express from 'express';
import * as fs from 'fs';
import fetch from 'node-fetch';
import { instagram } from 'instagram-scraper-api';
import cookieParser from 'cookie-parser';
import ytdl from 'ytdl-core'
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//intialize express app

const app=express();
app.use(cookieParser());
const gt=async(req,res)=>{
 
  var id=req.originalUrl;
 var url=id.split("/p/");
 var ul=id.split("watch?v=");
  if(url.length==2){
   // res.send(url[1]);
    var purl="https://www.instagram.com/p/"+url[1]+"/"+"?__a=1";
    //res.send(murl);
    
    fetch(purl,{mode:'no-mode'}).then(res=>res.json()).then(result=>{
      //analyze the json and get video url from json result
  res.redirect(result.graphql.shortcode_media.video_url);
  })
  
}
else if(ul.length==2){
  

    var vid=id.split("watch?v=");
   

    res.cookie("yt",vid[1],{maxAge:20000});
res.sendFile(path.join(__dirname, '/index.html'));
}
else{
  var id=req.url;
  var p=id.substring(1);
//  var url=id.split("host");
//  var b=url[0];
// console.log(p);

 instagram
 .user(p)
 .then((user) => 
 {
  res.redirect(user.avatar);

  
 })
 .catch((err) => console.error(err));

// }
}
}
const dpo=(req,res)=>{
  res.redirect(req.cookies.dp);
}
const audio=async(req,res)=>{
  const vid=req.cookies.yt;
  let info = await ytdl.getInfo(vid);
let audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
res.redirect(audioFormats[0].url);

}
const v360=async(req,res)=>{
  const vid=req.cookies.yt;
  let info = await ytdl.getInfo(vid);
  let format = ytdl.chooseFormat(info.formats, { quality: '134' });
  res.redirect(format.url)


}
const v720=async(req,res)=>{
  const vid=req.cookies.yt;
  let info = await ytdl.getInfo(vid);
  let format = ytdl.chooseFormat(info.formats, { quality: '136' });
  res.redirect(format.url)

}
const v1080=async(req,res)=>{
  const vid=req.cookies.yt;
  let info = await ytdl.getInfo(vid);
  let format = ytdl.chooseFormat(info.formats, { quality: '137' });
  res.redirect(format.url)

}
const dp=(req,res)=>{
return res.send()
}
app.get("/dp",dp);
app.get("/audio",audio);
app.get("/v360",v360);
app.get("/v720",v720);
app.get("/v1080",v1080);
app.get("*",gt);
app.get("/dpo",dp);
app.listen(3000);
