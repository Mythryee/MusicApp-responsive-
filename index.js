
console.log("Welcome to music player");
let playbutton = document.getElementById('masterplay');
let playbar = document.getElementById('play-bar');
let songItems = Array.from(document.getElementsByClassName('songItems'))
let smallplaybutton = Array.from(document.getElementsByClassName('playbutton'))
let audio = new Audio()
let songs = [
    {songName:"Allah waariyaan" , filePath:"./song1.mp3"},
    {songName:"Chunari Chunari" , filePath:"./song2.mp3"},
    {songName:"coka 2.0" , filePath:"./song3.mp3"},
    {songName:"Sehri babu" , filePath:"./song4.mp3"},
    {songName:"Laal peeli akhiyaan" , filePath:"./song5.mp3"},
    {songName:"Mann jogiya" , filePath:"./song6.mp3"},
    {songName:"Saanware" , filePath:"./song7.mp3"},
    {songName:"Soni di nakhre" , filePath:"./song8.mp3"},
    {songName:"Teri baaton mein" , filePath:"./song9.mp3"},
    {songName:"Yeh tune kya kiya" , filePath:"./song10.mp3"},
]

songItems.forEach((element,i) => {
    element.innerText = songs[i].songName;
});


let prevClicked = null;
smallplaybutton.forEach((element,i)=>{
    element.addEventListener('click',()=>{
        if(prevClicked){
            prevClicked.src = "play.png";
            audio.pause();
        }
        element.src = "pause.png";
        element.addEventListener('click',()=>{
            element.src = "play.png";audio.pause();

        })
        audio.src = songs[i].filePath;
        audio.play();
        prevClicked = element;
    })
})

let index =0;

playbutton.addEventListener('click',()=>{
    let count=0;
    if(audio.paused || audio.currentTime<=0){      
        playbutton.src="pause.png";
        if(count==0){
            allSongsPlay();
        }
         
    }else{
        audio.pause();
        playbutton.src="play.png";
    }
})

audio.addEventListener('timeupdate',()=>{
    playtime = parseInt((audio.currentTime/audio.duration)*100);
    playbar.value = playtime
    
})

playbar.addEventListener('change',()=>{
    audio.currentTime = playbar.value * audio.duration/100;
    
})

const allSongsPlay = () => {
    audio.src = songs[index].filePath;
    audio.play();
    audio.addEventListener('timeupdate',()=>{
        playtime = parseInt((audio.currentTime/audio.duration)*100);
        playbar.value = playtime
        updateSmallPlayButtonImage(index);
    })
    playbutton.src = "pause.png";
    audio.addEventListener("ended", () => {
      index++;
      if (index < songs.length) {
        audio.src = songs[index].filePath;
        audio.play();
      } else {
        index = 0;
        audio.src = songs[index].filePath;
        audio.play();
      }
    });
  };
allSongsPlay();
document.getElementById('previous').addEventListener('click',()=>{
    if(index<0){
        index=songs.length-1;
    }else{
        index-=1;
    }
    audio.src = songs[index].filePath; 
    audio.play();
})
document.getElementById('forward').addEventListener('click',()=>{
    if(index>songs.length-1){
        index=0;
    }else{
        index+=1;
    }
    
    audio.src = songs[index].filePath;
    audio.play();
})