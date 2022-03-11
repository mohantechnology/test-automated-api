const fs = require('fs');
// const getMP3Duration = require('get-mp3-duration'); 
// var videoShow = require("videoshow");
var  { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');

















function main(data) {

    return new Promise((resolve, reject) => {

     
        console.log("merge img + aud")
        console.log(data);
        if ((!data)) {
            return reject({ status: "error", message: "Missing field 'video_file_path' and  'audio_file_path'" });

        }
        let video_file_path = data.video_file_path ? data.video_file_path.trim(): undefined; 
        let audio_file_path = data.audio_file_path ? data.audio_file_path.trim(): undefined;  

        if (!video_file_path) {
          return reject({ status: "error", message: "Missing field   'video_file_path'" });

      }
        if (!audio_file_path) {
          return reject({ status: "error", message: "Missing field   'audio_file_path'" });

      }
      let vid_extn = video_file_path.split(".").pop(); 
      let aud_extn = audio_file_path.split(".").pop(); 
      
      if(  vid_extn !=="mp4"   ){ 
        return reject({ status: "error", message: "'video_file_path' must contain path of an video file with   extension must be either   'mp4'" });
      }

      if(  aud_extn !=="mp3"   ){ 
        return reject({ status: "error", message: "'audio_file_path' must contain path of an audio file with   extension must be either   'mp3'  " });
      }
 
        // let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
        let vid_file_path = __dirname + "/../" + video_file_path ; 
        let voice_file_path = __dirname + "/../"+ audio_file_path; 

        let video_short_path =  "public/upload/"+ uuidv4()+ ".mp4";
       let new_vid_file_path = __dirname + "/../" + video_short_path ; 




       
       console.log(vid_file_path);
       if (!fs.existsSync(vid_file_path)) {
           return reject({ status: "error", message: "Video  File Not Found" });

       }

       console.log(voice_file_path);
       if (!fs.existsSync(voice_file_path)) {
           return reject({ status: "error", message: "Audio File Not Found" });

       }


        console.log(new_vid_file_path);




        let ls = exec(`ffmpeg -i ${vid_file_path} -i ${voice_file_path} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${new_vid_file_path} -y`, function (error, stdout, stderr) {
            if (error) {
              console.log(error.stack);
              console.log('Error code: ' + error.code);
              console.log('Signal received: ' + error.signal);
              return reject({ status: "error", message: error.code });
            //   res.write('<h1>' + " Signal received: " + error.code + '</h1>');
            //   res.write('<h1>' + " Signal received: " + error.signal + '</h1>');
          
            }
            console.log('Child Process STDOUT: ' + stdout);
            console.log('Child Process STDERR: ' + stderr);
            return resolve({ status: "ok", message:  "Video and Audio Merged Successfully", video_file_path: video_short_path });
            // res.write('<h1>' + " Signal received: " + stdout + '</h1>');
            // res.end();
            // return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
          }); 
          
          ls.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code);
            // return reject({ status: "error", message: 'Child process exited with exit code ' + code });
            // res.write('<h1>' + " last line " + code + '</h1>');
            // res.end(<h1>' + " last line " + code + '</h1>);
          });
        //   res.end();
















// // const mp3Duration = require('mp3-duration');

// const buffer = fs.readFile(voice_file_path,(err,buffer)=>{
//   if(err){
//     console.log(err) ; 
//     return reject({ status: "error", message: "something went wrong" });
//   }
//   let  duration ; 
//  duration = Math.max( getMP3Duration(buffer),3000);
//   console.log(duration/1000, 'ms') ;
//   // console.log(parseInt(duration/1000), 'ms') ;





// console.log("type of duration + ",duration , Number (duration) ); 

//       //  return;  
// var images = [
//   {
//     path: vid_file_path,
//     caption: "this video  is created using videoshow",
//     loop: (parseInt(duration)/1000)+1
//   }
// ];






// var videoOptions = {
//   loop: (parseInt(duration)/1000)+1,
//   fps: 25,
//   transition: true,
//   transitionDuration: 1, // seconds
//   videoBitrate: 1024,
//   videoCodec: "libx264",
//   size: "640x?",
//   audioBitrate: "128k",
//   audioChannels: 2,
//   format: "mp4",
//   pixelFormat: "yuv420p",
// };



// console.log(images)
// console.log(videoOptions)






// //kdjfls 
// videoShow(images, videoOptions)
//   .audio(voice_file_path)
//   .save(new_vid_file_path)
//   .on('start', function (command) {
//     // res.write('<h1>' + "Conversion started" + command + '</h1>');
//     console.log("Conversion started" + command)
//     // res.setHeader('Content-Type', 'text/html');
//   })
//   .on('error', function (err, stdout, stderr) {
//     // res.write('<h1>' + "Some  error occured" + err + '</h1>');
//     // res.end();
//     console.log("Some error occured" + err)
//     return reject({ status: "error", message: err });
//   })
//   .on('end', function (output) {

//     // res.write('<h1>Conversion completed #: ' + output + '</h1>');
//     // res.end()
//     // res.send({"status":"ok","message":  "output" + output}); 
//     console.log("Conversion completed" + output)
//     return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
//   })




// })  

        // var speech;
        // console.log(speech)
        // return; 



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