const gTTS = require('gtts');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

 


function main(data) {

    return new Promise((resolve, reject) => {
        try{ 
         
            console.log(data);
            if ((!data) || !(data.file_path) )   {
                return reject({ status: "error", message: "  Field 'file_path" });
    
            }
          
  let extn = data.file_path.split(".").pop(); 
  if( extn !=="txt"){ 
    return reject({ status: "error", message: "'file_path'   must be a text file  with  file extension 'txt' " });
  }
            let voice_short_path =  "public/upload/"+ uuidv4()+ ".mp3";
            let file_path = __dirname + "/../" +data.file_path
            // let voice_file_path = __dirname + "/../" +voice_short_path; 
            let voice_file_path = __dirname + "/../" +voice_short_path; 
    
            console.log(file_path);
            if (!fs.existsSync(file_path)) {
                return reject({ status: "error", message: "File Not Found" });
    
            }





            fs.readFile(file_path, "utf8", (err, data) => {
                if (err) {
                    console.error(err)
                    return reject({ status: "error", message: err });
                }
                console.log("data")
                console.log(data)
                var speech = data;
              
                try {
                       console.log( "above")
                    console.log( gtts)
                    var gtts = new gTTS(speech, 'en');
                    console.log( "gtts")
                    console.log( gtts)
                    gtts.save(voice_file_path, function (err, result) {
                        if (err) { return reject({ status: "error", message: err }); }
                        console.log( "err")
                        console.log( err)
                        console.log( "result")
                        console.log( result)
                        console.log("Text to speech converted!\n", voice_file_path);
                        return resolve({ status: "ok", message: "text to speech converted",  audio_file_path: voice_short_path });
                    });
                } catch (error) {
                    return reject({ status: "error", message: err });
                }
    
            })
        }catch( err){
            return reject({ status: "error", message: err });
        }
      

    });
}











//     var gtts = new gTTS(speech, 'hi');

//     gtts.save(voice_file_path, function (err, result) {
//         if (err) {
//             return reject({ status: "error", message: err });
//         }
//         return resolve({ status: "ok", message: "text to speech converted" });
//     });




module.exports = main;