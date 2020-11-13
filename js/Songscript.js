console.log("song 스크립트 로드");

// 스크롤 구현
// 음악을 묶은 콘테이너와 음악을불러왔습니다.
var music_container = document.getElementById("music-container");
var music = document.getElementsByClassName("music");
// 음악들 오퍼시티와 스케일값 초기화.
for(var i = 0; i < music.length; i++){
    music[i].style.opacity = 0.2;
    music[i].style.transform = "scale(0.77)"
    music[0].style.opacity = 1;
    music[0].style.transform = "scale(1)"
}
// 마우스 스크롤링 이외에 키보드의 좌우 버튼을 눌렀을때 이동되는 이벤트도 적용해보았습니다.
window.addEventListener("keydown", onKeyDown);
function onKeyDown(e){ // 스크롤링되는 로직은 PaulScript에서 이미지 갤러리 제어 와 같은 방식으로 제어해주었습니다.
    // console.log("키눌림" + e.which);
    var KeyCode = e.which;
    var pos = 0;
    if(KeyCode == 37 && limit > 0){
        // console.log("왼쪽 방향키눌림");

        var scrollani = setInterval(sclani, 1);
        limit--;
        //console.log("리밋 " + limit);

        for(var i = 0; i < music.length; i++){
            music[i].style.opacity = 0.2;
            music[i].style.transform = "scale(0.77)"
            music[limit].style.opacity = 1;
            music[limit].style.transform = "scale(1)"
        }

        function sclani(){
            if (pos == 50){
                clearInterval(scrollani);
            } else { 
                // music_container.style.transform += "translateX(" + 10 + "px)";
                scrollNow = scrollNow  + 1;
                pos++;
                
            }
            //console.log("위로스크롤");
            music_container.style.left = scrollNow + "%";
        }
    }
    else if(KeyCode == 39 && limit < 5){
        // console.log("오른쪽 방향키눌림");

        var scrollani = setInterval(sclani, 1);
        limit++;
        //console.log("리밋 " + limit);

        for(var i = 0; i < music.length; i++){
            music[i].style.opacity = 0.2;
            music[i].style.transform = "scale(0.77)"
            music[limit].style.opacity = 1;
            music[limit].style.transform = "scale(1)"
        }

        function sclani(){
            if (pos == 50){
                clearInterval(scrollani);
            } else { 
                // music_container.style.transform += "translateX(" + -10 + "px)";
                scrollNow = scrollNow -1;
                pos++;
                
            }
            //console.log("아래스크롤");
            music_container.style.left = scrollNow + "%"
        }
    }
}
// 여기까지 키보드 눌렀을때 음악 콘테이너 스크롤링 제어.

// 마우스 휠 이벤트 추가.윈도우에. 
window.addEventListener("mousewheel", onScroll);
var limit = 0; // 리밋을 정해서 스크롤링 오버 방지.
var scrollNow = 40;



function onScroll(e){// 스크롤링되는 로직은 PaulScript에서 이미지 갤러리 제어 와 같은 방식으로 제어해주었습니다.
    var pos = 0;
    if(e.wheelDelta == -120 && limit < 5){
        var scrollani = setInterval(sclani, 1);
        limit++;
        //console.log("리밋 " + limit);

        for(var i = 0; i < music.length; i++){
            music[i].style.opacity = 0.2;
            music[i].style.transform = "scale(0.77)"
            music[limit].style.opacity = 1;
            music[limit].style.transform = "scale(1)"
        }

        function sclani(){
            if (pos == 50){
                clearInterval(scrollani);
            } else {
                // music_container.style.transform += "translateX(" + -10 + "px)";
                scrollNow = scrollNow -1;
                pos++;
                
            }
            //console.log("아래스크롤");
            music_container.style.left = scrollNow + "%"
        }
    }
    else if(e.wheelDelta == 120 && limit > 0){
        var scrollani = setInterval(sclani, 1);
        limit--;
        //console.log("리밋 " + limit);

        for(var i = 0; i < music.length; i++){
            music[i].style.opacity = 0.2;
            music[i].style.transform = "scale(0.77)"
            music[limit].style.opacity = 1;
            music[limit].style.transform = "scale(1)"
        }

        function sclani(){
            if (pos == 50){
                clearInterval(scrollani);
            } else { 
                // music_container.style.transform += "translateX(" + 10 + "px)";
                scrollNow = scrollNow  + 1;
                pos++;
                
            }
            //console.log("위로스크롤");
            music_container.style.left = scrollNow + "%";
        }
    }
}

//음악 플레이 일시정지 제어
var music_img = document.getElementsByClassName("img-music");
music_img = Array.prototype.slice.call(music_img);
for(var i = 0; i < music_img.length; i++){ // 음악이미지들에 이벤트 적용. 마우스 엔터,리브,클릭.
    music_img[i].addEventListener("mouseenter", onMouseMusic);
    music_img[i].addEventListener("mouseleave", onMouseMusic);
    music_img[i].addEventListener("click", onClickMusic_Img);
}
//마우스를 올렸을때 올라올 뮤직에대한 인포를 볼수있는 박스 불러오기.
var music_box = document.getElementsByClassName("music-box");
music_box = Array.prototype.slice.call(music_box);
//오디오 불러오기.
var audio = document.getElementsByClassName("audio");
audio = Array.prototype.slice.call(audio);
//플레이 상태 블러오기.
var state = document.getElementsByClassName("state");
state = Array.prototype.slice.call(state);
//음악 그래프 불러오기.
var music_graph_all = document.getElementsByClassName("music-graph-all");
music_graph_all = Array.prototype.slice.call(music_graph_all);
//뮤직 그래프에 innerHTML로 ""넣어 값 초기화. 플레이/일시정지때마다 값을 주어 제어.
for(var i = 0; i < music_graph_all.length; i++){
    music_graph_all[i].innerHTML = "";
}
/*전반적인 음악 제어 방식은 PAUL 스크립트의 음악 제어부분과 동일합니다.*/
var state_pause = document.getElementsByClassName("state-pause");

var graph = document.getElementsByClassName("graph");

var nav_music_container = document.querySelector(".nav-music-player-container");

var musicStatus = false;

//음악 이미지에 마우스를 올렸을때 실행 함수.
function onMouseMusic(e){
    var mTarget = e.currentTarget;

    var index = music_img.indexOf(mTarget); // 해당 요소의 인덱스값을 반환.

    var opStatus = music[index].style.opacity; // opStatus 는 해당 요소의 오퍼시티 값을 반환받아. 1일때만 실행되게끔 해주었습니다.

    if(e.type === "mouseenter" && opStatus == 1){ //마우스 엔터와 오퍼시티가 1인것을 두개를 충족해야만 if문 실행.
        //console.log("over " + index);
        //console.log(music_box[index]);
        music_box[index].classList.add("music-box-change");
        
        music_box[index].style.transform = "translateY(0) scaleY(1)";
        music_box[index].style.opacity = 1;
        nav_music_container.style.transform = "translateX(-500px)";

        if(!musicStatus){
            music_img[index].style.filter = "brightness(65%) drop-shadow(25px 25px 20px rgba(20, 142, 166, 0.4))";
        }
        else if(musicStatus){
            music_img[index].style.filter = "brightness(100%) drop-shadow(25px 25px 20px rgba(20, 142, 166, 0.4))";
        }
    }
    
    else if(e.type === "mouseleave"){
        //console.log("leave " + index);
        //console.log(music_box[index]);
        music_box[index].classList.remove("music-box-change");
        music_box[index].style.transform = "translateY(950px) scaleY(0.5)";
        music_box[index].style.opacity = 0;
        if(musicStatus){
            nav_music_container.style.transform = "translateX(0)";
        }
        else if(!musicStatus){
            music_img[index].style.filter = "brightness(100%) drop-shadow(25px 25px 20px rgba(20, 142, 166, 0.4))";
        }
    }
    
}
var toggleMusic = true;

var nav_imgSrc = document.querySelector(".nav-music-player-container img");

var nav_h3 = document.querySelector(".nav-music-inform h3");

var music_title = document.querySelectorAll(".music-title h3");
music_title = Array.prototype.slice.call(music_title);

var nav_graph = document.querySelectorAll(".nav-graph");
nav_graph = Array.prototype.slice.call(nav_graph);

var bar_state = document.querySelectorAll(".bar_input > .bar_state");
bar_state = Array.prototype.slice.call(bar_state);

var time01 = document.querySelectorAll(".time01");
time01 = Array.prototype.slice.call(time01);

//var totime = true;

/*음악 실행 부분입니다.
    스크립트의 내용은 전반적으로 PaulScript의 음악 실행부분이랑 동일합니다.
*/
function onClickMusic_Img(e){ // 음악 이미지에 클릭이벤트를 준 함수.
    var mTarget = e.currentTarget; // 현재 클릭된 배열의 순번을 반환

    var index = music_img.indexOf(mTarget); // 반환된 순번을 index 값으로 반환합니다.
    var index_num = parseInt(index, 10) + 1; // 인덱스 값에 +1 한 값을 반환합니다.

    e.preventDefault(); // 기본적인 이벤트 제거 // 

    audio[index].addEventListener("timeupdate", function(e){ // 오디오에 타임업데이트라는 이벤트를 부여합니다.

        var cuTime = audio[index].currentTime; // 타임업데이트는 1초마다 시간을 업데이트 해주는 함수인듯 했습니다. // 오디오에 .currentTime 으로 현재시간을 반환할수있었습니다. 그값을 cuTime 변수에 반환합니다.
        time01[index].innerText = getTimeFormat(cuTime); // time01의 각 인덱스 값과 맞추어 innerText 로 값을 기입해줍니다 값은 getTimeFormat의 cuTime 매개변수로 기입합니다.
        //console.log(getTimeFormat(cuTime));
    });
    function getTimeFormat(ms) { // getTimeFormat이라는 매개변수 값을 넣은 함수 선언.
        var hours = Math.floor(ms / 3600),  // 3600 // ms를 3600으로 나누어 반환.
            minutes = Math.floor((ms - (hours * 3600)) / 60), // 3600을 나눈값을 60으로 나눔 . 60값 <- 60분은 1시간
            seconds = Math.floor(ms - (hours * 3600) - (minutes * 60)), // hours는 0 ms는 현재 시간 - 0 - ?분 *60 한것을 빼줍니다// 분에 60을 곱하면 초. 
            result = ""; // result 에 값 "" 
        if(minutes < 10) minutes = "0" + minutes; // 만약 분이 10보다 작으면  0을 붙임 1:00 이 되는걸 방지해 01:00로  표시하기위함.
        if(seconds < 10) seconds = "0" + seconds; // 만약 초가 10보다 작으면 0을 붙임 마찬가지로 00:1이 되는걸 방지해 01:01로 표시하기 위함.
        result += minutes + ":" + seconds // result 값에 분 + : + 초로 값을 반환함
        return result; return result; // 결과적으로  result 값을 함수실행시에 반환합니다.
    }
    
    if(toggleMusic && !musicStatus){ // 음악 토글
        audio[index].play(); // 음악 플레이 초기상태 toggleMusic 은 true여서 실행가능;
        console.log(audio[index].currentTime);
        bar_state[index].style.animationName= "mbar"; // 음악 상태바 애니메이션 줍니다.
        bar_state[index].style.animationPlayState="running"; // 음악 상태바의 애니메이션을 토글로써 음악이 중지되면 애니메이션의 실행을 중지시키고 실행시키고를 해주어 상태바를 구현하였습니다.
        

        state[index].innerHTML = "<span class=\"mp\">Music Playing</span>"; // 음악 실행 표시에 innerHTML로 스판으로 음악 실행이라는 /mp -> 불투명도가 점점1이되는 애니메이션효과줌./ 글자를 삽입.
        music_graph_all[index].innerHTML = "<div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div>"; // 뮤직 그래프도 그래프값을 html로 넣어 자연스러운 전환효과를 주었습니다(뮤직그래프 -> 일시정지 이미지 토글)
        for(var i = 0; i < graph.length; i++){ // 그래프를 보이게끔 해줍니다.
            graph[i].style.opacity = 0.55;
        }
        musicStatus = true; // 음악 스태이터스 bool 값을 트루로 반환. -> 음악 이미지의 불투명도를 조절하여 이미지를 누르게 유도하는 인터랙션 적용
        nav_imgSrc.src = "./img/music/music0" + index_num + ".png"; // 네비에 클릭한 이미지의 인덱스를 music01~06으로 저장해 해당 이미지로 src를 변경.
        nav_h3.innerText = music_title[index].innerText; // h3 음악 제목도 music_title 의 각 인덱스의 innerText 값을 네비게이션 제목에 반환해줍니다.
        for(var i =0; i< nav_graph.length; i++){ // 음악 그래프 실행.
            nav_graph[i].style.animationName = "music-graph";
        }

        music_img[index].style.filter = "brightness(100%) drop-shadow(25px 25px 20px rgba(20, 142, 166, 0.4))"; // 눌렀을때 음악 재생상태이면 음악 이미지 명도 100
        
    }
    else if(!toggleMusic){ // 토글로써 음악을 일시정지하는 기능입니다. 음악 실행과 비슷한 로직으로 값을 반대로 돌아가는 형태로 계획.
        audio[index].pause();
        console.log(audio[index].currentTime);
        bar_state[index].style.animationPlayState="paused"

        state[index].innerHTML = "<span class=\"mp\">Music Paused</span>";
        music_graph_all[index].innerHTML += "<img src=\"./img/pause.png\" class=\"state-pause\" alt = \"nav-pause\" width = \"14\" style=\"opacity: 0.5\"/>";
        for(var i = 0; i < graph.length; i++){
            graph[i].style.opacity = 0;
        }
        musicStatus = false;
        for(var i =0; i< nav_graph.length; i++){
            nav_graph[i].style.animationName = "";
        }

        music_img[index].style.filter = "brightness(65%) drop-shadow(25px 25px 20px rgba(20, 142, 166, 0.4))";
        
    }
    toggleMusic = !toggleMusic;  // 토글의 핵심입니다. if와 else if를 읽고 toggleMusic의 현재값을 ! 반전시켜서 반환합니다.
    //totime = !totime;
}