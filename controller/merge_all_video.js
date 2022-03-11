const fs = require('fs');
const path = require('path');
// const getMP3Duration = require('get-mp3-duration'); 
// var videoShow = require("videoshow");
var  { exec } = require('child_process');
const { json } = require('body-parser');
const { v4: uuidv4 } = require('uuid');

let videoStitch = require('video-stitch');
let videoConcat = videoStitch.concat;















function main(data) {

    return new Promise((resolve, reject) => {

     
        console.log("merge img + aud")
        console.log(data);
        // return reject({ status: "error", message: "Missing data" });

        if ((!data)  ) {
            return reject({ status: "error", message: "Missing Field 'video_file_path_list'" });

        }
        let video_file_path_list  = data.video_file_path_list; 

        if (!video_file_path_list || !Array.isArray(video_file_path_list)) {
            return reject({ status: "error", message: "Must have field 'video_file_path_list' of type 'Array' containing  path's of Video file " });
  
        }

        let video_absolute_path_file_name_list = []; 

        let video_short_path =  "public/upload/"+ uuidv4()+ ".mp4";
       let new_vid_file_path =  path.resolve (__dirname + "/../" + video_short_path ); 


        for(let i=0 ; i<video_file_path_list.length; i++){
            let curr_file = video_file_path_list[i] ; 
            curr_file =  curr_file ? curr_file.trim(): undefined; 
            if (!curr_file) {
                return reject({ status: "error", message: "Invalid file_path at index " +i + " in 'video_file_path_list'" });
            }
            let file_extn = curr_file.split(".").pop(); 
      
            if(  file_extn !=="mp4"   ){ 
              return reject({ status: "error", message:  "All file in 'video_file_path_list' must be of Video with extension 'mp4' only. Invalid file_path at index " +i + " in 'video_file_path_list'"});
            }
            let vid_file_path = __dirname + "/../" + curr_file ; 

            if (!fs.existsSync(vid_file_path)) {
                return reject({ status: "error", message: "Video File  at index " +i + " in 'video_file_path_list'  Not Exist"});
    
            }
            video_absolute_path_file_name_list.push({ fileName:vid_file_path} ) ; 
        }

        // ----------------

        videoConcat({
            silent: true,
            overwrite: true // if true override the existing file 
          })
            .clips(video_absolute_path_file_name_list)
            .output(new_vid_file_path)
            .concat()
            .then((outputFileName) => {
              fs.readFile(new_vid_file_path, (err, data) => {
                if (err) {
                    reject({ status: "error", message: err });
                }
                resolve({ status: "ok", message:  "Merged All Video Successfully", video_file_path: video_short_path });
              })
            }).catch(err => {
                reject({ status: "error", message: err });
            })
        // ----------------





    //     let ts_file_arr = JSON.parse(data.data); 
    //     console.log( ts_file_arr); 
    //   let token = data.token;
    //   img_impv_0 ->img_cvideo_0
    //   vid_impv_0 ->vid_cvideo_0
// retturn 
return ; 

        let ts_vid_file_str = ""; 
        for(let i=0 ; i<ts_file_arr.length; i++){
            let s_arr = ts_file_arr[i].split("_");
          
            if (s_arr.length != 3) {
                console.log("invalid leng");
                // return reject({ status: "error", message: "Invalid  data format" });
    
            }

           

            let vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_cvideo_" + s_arr[2] + ".ts";
            if (fs.existsSync(vid_file_path)) {
                // return reject({ status: "error", message: "File Not Found" });
                console.log(" file exist \n",vid_file_path);
                ts_vid_file_str +=  vid_file_path + "|" 
            }
    
        }
        let file_path = __dirname + "/../public/upload/" + token + "/" +  token+"_final_vid"  + ".mp4";
        console.log(ts_vid_file_str); 
        if( ts_vid_file_str.length>0 ){
            ts_vid_file_str =  "concat:"+ ts_vid_file_str.slice(0,ts_vid_file_str.length-1);

        }
         
       
        console.log(ts_vid_file_str); 

        if(ts_vid_file_str.length==0){
            return reject({ status: "error", message: "No files found for merge" });
        }
        let ls = exec(`ffmpeg -i "${ts_vid_file_str}" -c copy "${file_path}"   -y`, function (error, stdout, stderr) {
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
            return resolve({ status: "ok", message:  " files  mergeded successfully ", link:   token+"_final_vid" +".mp4" });
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




     console.log(  " last line " ); 

        return; 
//   const { exec } = require('child_process');
//   const ls2 = exec('ffmpeg -i "concat:vid1.ts|vid2.ts" -c copy output100.mp4   -y', function (error, stdout, stderr) {
//     if (error) {
//       console.log(error.stack);
//       console.log('Error code: ' + error.code);
//       console.log('Signal received: ' + error.signal);
//       // res.write('<h1>' + " Signal received: " + error.code + '</h1>');
//       // res.write('<h1>' + " Signal received: " + error.signal + '</h1>');

//     }
//     console.log('Child Process STDOUT: ' + stdout);
//     console.log('Child Process STDERR: ' + stderr);
//     res.write('<h1>' + " Signal received: " + stdout + '</h1>');
//     // res.end();    res.write('<h1>' + " last line " + code + '</h1>');

//     res.end("completed " + "path is : " + __dirname + "output.mp4");
//   });

//   ls2.on('exit', function (code) {
//     console.log('Child process exited with exit code ' + code);









        // let file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + ".txt";
    //     let vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_prog_" + s_arr[2] + "."+data.f_ext;
    //     let voice_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_voice_" + s_arr[2] + ".mp3";

    //    let new_vid_file_path = __dirname + "/../public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4";




    //     console.log(vid_file_path);
    //     if (!fs.existsSync(vid_file_path)) {
    //         return reject({ status: "error", message: "File Not Found" });

    //     }

    //     console.log(voice_file_path);
    //     if (!fs.existsSync(voice_file_path)) {
    //         return reject({ status: "error", message: "File Not Found" });

    //     }

    //     console.log(new_vid_file_path);




        // let ls = exec(`ffmpeg -i ${vid_file_path} -i ${voice_file_path} -c:v copy -c:a aac -map 0:v:0 -map 1:a:0 ${new_vid_file_path} -y`, function (error, stdout, stderr) {
        //     if (error) {
        //       console.log(error.stack);
        //       console.log('Error code: ' + error.code);
        //       console.log('Signal received: ' + error.signal);
        //       return reject({ status: "error", message: error.code });
        //     //   res.write('<h1>' + " Signal received: " + error.code + '</h1>');
        //     //   res.write('<h1>' + " Signal received: " + error.signal + '</h1>');
          
        //     }
        //     console.log('Child Process STDOUT: ' + stdout);
        //     console.log('Child Process STDERR: ' + stderr);
        //     return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
        //     // res.write('<h1>' + " Signal received: " + stdout + '</h1>');
        //     // res.end();
        //     // return resolve({ status: "ok", message:  " image + audio merged ", link: "public/upload/" + token + "/" + s_arr[0] + "_video_" + s_arr[2] + ".mp4" });
        //   }); 
          
        //   ls.on('exit', function (code) {
            console.log('Child process exited with exit code ' + code);
            // return reject({ status: "error", message: 'Child process exited with exit code ' + code });
            // res.write('<h1>' + " last line " + code + '</h1>');
            // res.end(<h1>' + " last line " + code + '</h1>);
        //   });
        //   res.end();




    });
}




module.exports = main;