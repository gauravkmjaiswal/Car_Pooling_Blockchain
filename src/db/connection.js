const mongoose= require("mongoose")
mongoose.connect("mongodb+srv://gaurav:dLGZtH3HiJdTmDX4@cluster0.dckjaj5.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successful")
}).catch((e)=>{
    console.log("no connection")
})