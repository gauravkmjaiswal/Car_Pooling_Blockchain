require('dotenv').config();
const express= require("express")
const hbs= require("hbs")
const path= require("path")
const cookieParser=require("cookie-parser")
const bcrypt= require("bcryptjs")
const auth=require("./middleware/auth")
const app = express()
const { uuid } = require('uuidv4');
const port= process.env.PORT || 8000
require("./db/connection.js")
const RegisterPeople=require("./models/registers")
const static_path=path.join(__dirname,"../public")
const template_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")
// console.log(static_path)
// app.use(express.json())
// app.use(cookieParser())
// app.use(express.urlencoded({extended:false}))
// app.use(express.static(static_path));
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors())


app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path)
app.get('/',(req,res)=>{
    res.render("index")
})



// app.get('/secret',auth,async(req,res)=>{
// res.render("secret")
// })

app.get('/logout',auth,async(req,res)=>{
try {
   
    req.user.tokens=req.user.tokens.filter((cur)=>{
      if(cur.token!==req.token)
      {
            return 1
      }
      else
      {
            return 0
      }
    })

    res.clearCookie("jwtlogin")
    await req.user.save();
    res.render("login")
 
} catch (error) {
    res.status(401).send(error)
}
})
app.get('/register',(req,res)=>{
    res.sendFile('register.html', { root: path.join(__dirname, '../public') });
})
app.get('/confirm',(req,res)=>{
    res.sendFile('confirm.html', { root: path.join(__dirname, '../public') });
})

app.get('/login',(req,res)=>{
    // res.render("login")
    res.sendFile('login.html', { root: path.join(__dirname, '../public') });
})
app.post('/login',async (req,res)=>{
    try {
        const name=req.body.your_name;
        const pass=req.body.your_pass;
        const user=await RegisterPeople.findOne({name:name})
     
        const token=await user.generateAuthToken();
        res.cookie("jwtlogin",token,{
        expires: new Date(Date.now()+300000),
        httpOnly:true
        })
        
    //    console.log(`this is the cookie ${req.cookies.jwtlogin} `)

      if(user)
      {

        const matchh=await bcrypt.compare(pass,user.pass)
        if(matchh)
        {
            res.sendFile('secret.html', { root: path.join(__dirname, '../public') });
        }
        else{
            res.status(400).send("wrong details")
        }

      }
      else{
          res.status(400).send("wrong details this")
      }
 
    }catch(error){
        // res.status(400).send("wrong details what")

        console.log("hello")
    }
})


app.post('/register',async (req,res)=>{
    try{
        const pas= req.body.pass;
        const re_pas= req.body.re_pass;
        if(pas!==re_pas)
        {
            return res.send("password and coonfirm password are diffrent !!!")
        }


        const regisPerson= await new RegisterPeople({
            name: req.body.name,
            email:req.body.email,
            pass:req.body.pass
        })

        const token=await regisPerson.generateAuthToken();

        res.cookie("jwt",token,{
            expires:new Date(Date.now()+300000),
            httpOnly:true
        })

        const finalPeople= await regisPerson.save()
        res.sendFile('login.html', { root: path.join(__dirname, '../public') });

    }catch(e)
    {
        res.status(400).send("error")
    }
})

function getDistance(lat1,lon1,lat2,lon2){
    lon1 = lon1 * Math.PI / 180;
    lon2 = lon2 * Math.PI / 180;
    lat1 = lat1 * Math.PI / 180;
    lat2 = lat2 * Math.PI / 180;
    let dlon = lon2 - lon1;
    let dlat = lat2 - lat1;
    let a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);
    let c = 2 * Math.asin(Math.sqrt(a));
    let r = 6371;
    return (c * r);
}

function getUberData(BaseFare,distance) {
   
    const id = uuid()
    const displayName = "Uber-go"   
    let estimate = 0
    if(distance >=5){
        estimate = BaseFare*5 + (distance-5)*6;
    }else{
        estimate = BaseFare*distance
    }
    return {
        id,
        displayName,
        estimate
    }
}

function getOlaData(BaseFare,distance) {
    const id = uuid()
    const displayName = "OLA mini"
    let estimate
    if (distance >= 5) {
        estimate = BaseFare * 5 + (distance - 5) * 6;
    } else {
        estimate = BaseFare * distance
    }
    return {
        id,
        displayName,
        estimate
    }
}

function getRapidoData(BaseFare,distance){
    const id = uuid()
    const displayName = "Rapido Swiss"
    let estimate
    if (distance >= 5) {
        estimate = BaseFare * 5 + (distance - 5) * 6;
    } else {
        estimate = BaseFare * distance
    }
    return {
        id,
        displayName,
        estimate
    }
}
app.get('/getEstimate',async (req,res)=>{
   console.log(req.query)
    const distance = getDistance(req.query.startLatitude, req.query.startLongitude, req.query.endLatitude, req.query.endLongitude)
    const value = Math.floor(Math.random() * (50) + 1)
    const UberPrice = getUberData(30+value,distance)
    const OlaPrice = getOlaData(27+value,distance)
    const rapidoPrice = getRapidoData(31+value,distance)
    console.log(rapidoPrice)
    res.send({"UBER":UberPrice,"OLA":OlaPrice,"RAPIDO":rapidoPrice})
})

app.listen(port,()=>{
    console.log("server is working well")
})