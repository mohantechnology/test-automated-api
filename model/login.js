
    require('dotenv').config(); 
    const mongoose = require("mongoose");
const validator = require("validator");

    let link = process.env.DB_LINK; 
    var user_detail_schema = require("./schema/user_detail");
    


    function pr(r1, r2, r3, r4) {

        if (r1) {
            console.log(r1)
        }

        if (r2) {
            console.log(r2)
        }
        if (r3) {
            console.log(r3)
        }
        if (r4) {
            console.log(r4)
        }
    }




    // function connect_to_db() {
    //     mongoose.connect(link, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then() .catch(error => { });

    // }




    // function trim_data(json_data) {
    //     if ( json_data &&  json_data.email && json_data.password) {
    //         json_data.email = json_data.email.trim();
    //         json_data.password = json_data.password.trim();
    //     } else {
    //         return false;
    //     }
    //     if (json_data.email == "" || json_data.password == "") {
    //         return false;
    //     } else {
    //         return json_data;
    //     }
    
    // }



    async function check_login_detail(json_data) {
      // save readed message to collection.chat_message

         // save message to your collection.chat_message 
                let model1  =  mongoose.models["user_detail"] === undefined ?  mongoose.model ("user_detail", user_detail_schema) :  mongoose.model ("user_detail"); 
     

                    result = await  model1.findOne({email:json_data.email,password:json_data.password}); 
                    pr("result of login is: ",result); 
                    if(result ){
                        return {name:result.name,email:result.email,status:"ok" ,u_id: result.u_id }; 
                    }
                    else{
                        return {status:"error" ,message:"Account Not Registered "}; 
                    }
    }






    async function main(data) {
       await mongoose.connect(link, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })

         console.log("connted"); 

         let model1  =  mongoose.models["user_detail"] === undefined ?  mongoose.model ("user_detail", user_detail_schema) :  mongoose.model ("user_detail"); 
     
           return {status:"error" ,message:"Account Not Registered "}; 
        // let result;
        // json_data = 
        // result = trim_data(data )
         
        // if(!result){
        //     mongoose.connection.close();
        //     return {status:"error",message:"missing data"}; 
        // }
        // result = await check_login_detail(result);
        // mongoose.connection.close();
        // return result ; 
    }


// main({ email: "mohan3@gmail.com ", name: "road" }).then(data => {
//     pr("returned data  main is: ", data);

// }).catch(error => {
//     pr("error from main ", error);
// });

module.exports = main;

