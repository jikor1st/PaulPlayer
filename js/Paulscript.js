
console.log("Paul스크립트 로드!");

/*음악 랜덤 로드 구현 */

//0~5 랜덤 숫자 생성
// 음악이 총 6개로 페이지가 로드될때 0일때 1번째 음악 display 되고 나머지는 none 5일때 6번째 음악(배열로써 나오게함.)
var rndMusic = Math.round((Math.random() * (5 - 0)) + 0);
console.log(rndMusic);

/*음악을 불러옵니다 총 6개. */
var reco_music_container = document.querySelectorAll(".reco-music-container");
reco_music_container = Array.prototype.slice.call(reco_music_container);

for(var i=0;i < reco_music_container.length; i++){
    reco_music_container[i].style.display="none";
    reco_music_container[rndMusic].style.display="flex"; // 요소를 rndMusic 변수를 받아온것만 나타나게해줘서 랜덤으로 음악이 로드됩니다.
}



/*음악 재생 */

/*음악 이미지를 불러오고 플레이버튼으로써 동작되게 합니다. */
var music_img = document.getElementsByClassName("rndmusic_img");
music_img = Array.prototype.slice.call(music_img);
for(var i = 0; i < music_img.length; i++){ // 모든 음악 이미지요소에 클릭, 마우스 엔터 리브 이벤트 부여.
    music_img[i].addEventListener("click", onClickMusic_Img);
    music_img[i].addEventListener("mouseenter", onMouseMusic_Img);
    music_img[i].addEventListener("mouseleave", onMouseMusic_Img);
}


var audio = document.getElementsByClassName("audio");
audio = Array.prototype.slice.call(audio);// 오디오 소스들 불러오기.

var state = document.getElementsByClassName("state");
state = Array.prototype.slice.call(state); // 음악의 상태바 불러오기.

var music_graph_all = document.getElementsByClassName("music-graph-all");
music_graph_all = Array.prototype.slice.call(music_graph_all); // 음악그래프 불러오기.

for(var i = 0; i < music_graph_all.length; i++){
    music_graph_all[i].innerHTML = ""; // 뮤직그래프를 처음에 innerHTML로 ""넣어 값을 초기화 해줍니다.
}

var state_pause = document.getElementsByClassName("state-pause"); // state_pause라는 클래스를 가진 요소 불러오기.

var graph = document.getElementsByClassName("graph"); // graph 라는 클래스를 가진 요소 불러오기

var nav_music_container = document.querySelector(".nav-music-player-container"); // nav 쪽의 뮤직 플레이어 container 불러오기.

var musicStatus = false; // 음악이 실행되고 있는지 아닌지 판단하기위한 bool 변수 선언




var toggleMusic = true; // 음악 클릭이벤트 토글 제어.

var nav_imgSrc = document.querySelector(".nav-music-player-container img"); // nav음악 실행 이미지 불러오기(네비쪽의 음악 이미지 업데이트용)

var nav_h3 = document.querySelector(".nav-music-inform h3");// nav음악 제목 불러오기

var music_title = document.querySelectorAll(".music-title h3"); // 랜덤 음악의 제목 불러오기
music_title = Array.prototype.slice.call(music_title); // 배열 slice call

var nav_graph = document.querySelectorAll(".nav-graph"); // nav 의 음악 그래프 모두 불러오기.
nav_graph = Array.prototype.slice.call(nav_graph);

var bar_state = document.querySelectorAll(".bar_input > .bar_state"); // 음악 상태바 불러오기.
bar_state = Array.prototype.slice.call(bar_state);

var time01 = document.querySelectorAll(".time01"); // 음악 상태 시간 불러오기.
time01 = Array.prototype.slice.call(time01);

// var totime = true;
function onMouseMusic_Img(e){ // 음악 이미지에 마우스 오버시에.
    e.preventDefault(); // 기본이벤트 방지.

    var mTarget = e.currentTarget; // e.currentTarget으로 마우스를 오버한객체 mTarget으로 배열 순서로 반환

    var index = music_img.indexOf(mTarget); // 인덱스로 1번째를 1번째로 사용하게끔 반환.

    // 마우스를 올렸을때 멈춰있거나 paused상태일땐 이미지 brightness 조정.
    if(e.type == "mouseenter"){ // 마우스가 들어왔을때 
        if(musicStatus){ // 만약 음악이 실행되고있다면 brightenss 100%
            music_img[index].style.filter = "brightness(100%) drop-shadow(0px 0px 15px rgba(20, 142, 166, 0.4))";
        }
        else if(!musicStatus){ // 아니라면 brightness 65%
            music_img[index].style.filter = "brightness(65%) drop-shadow(0px 0px 15px rgba(20, 142, 166, 0.4))";
        }
    } // 나갈때 brightness 다시 100%
    else if(e.type == "mouseleave"){
        if(!musicStatus){
            music_img[index].style.filter = "brightness(100%) drop-shadow(0px 0px 15px rgba(20, 142, 166, 0.4))";
        }
    }  
}

/*음악 이미지 마우스 클릭시 오디오 실행 */
function onClickMusic_Img(e){ // 음악이미지 클릭시 함수실행
    var mTarget = e.currentTarget; // 클릭한 객체 배열순서로 반환.

    var index = music_img.indexOf(mTarget); // 배열순서 인덱스로 반환.
    var index_num = parseInt(index, 10) + 1; // 뮤직플레이어의 이미지를 해당 음악의 순서와 같게 설정하기 위해 (음악이미지들을 music01.png 이런식으로 이름 부여) 10진수로 +1값만큼 +해서 반환.

    e.preventDefault(); // 기본이벤트 방지

    /*오디오 상태 시간 */
    audio[index].addEventListener("timeupdate", function(e){ // 오디오에 타임 업데이트라는 이벤트를 넣어줍니다. // 교수님께서 간편하게 할 수 있는 방식을 설명해주셔서 이해하고 적용했습니다.

        var cuTime = audio[index].currentTime; // 해당 오디오(index)의 currentTime을 이용해 현재 시간을 cuTime 변수에 반환합니다.
        time01[index].innerText = getTimeFormat(cuTime); // 그리고 getTimeFormat 의 함수를 cuTime을 매개변수로 해서 time01 <- 상태시간 표시 .innerText 로 시간을 변화시켜줍니다.
        //console.log(getTimeFormat(cuTime));
    });
    function getTimeFormat(ms) { // getTimeFormat 함수.
        var hours = Math.floor(ms / 3600), // 3600 // ms를 3600으로 나누어 반환.
            minutes = Math.floor((ms - (hours * 3600)) / 60), // 3600을 나눈값을 60으로 나눔 . 60값 <- 60분은 1시간
            seconds = Math.floor(ms - (hours * 3600) - (minutes * 60)), // hours는 0 ms는 현재 시간 - 0 - ?분 *60 한것을 빼줍니다// 분에 60을 곱하면 초. 
            result = ""; // result 에 값 "" 
        if(minutes < 10) minutes = "0" + minutes; // 만약 분이 10보다 작으면  0을 붙임 1:00 이 되는걸 방지해 01:00로  표시하기위함.
        if(seconds < 10) seconds = "0" + seconds; // 만약 초가 10보다 작으면 0을 붙임 마찬가지로 00:1이 되는걸 방지해 01:01로 표시하기 위함.
        result += minutes + ":" + seconds // result 값에 분 + : + 초로 값을 반환함
        return result; // 결과적으로  result 값을 함수실행시에 반환합니다.
    }

    if(toggleMusic && !musicStatus){ // 음악 토글
        audio[index].play(); // 음악 플레이 초기상태 toggleMusic 은 true여서 실행가능;
        //console.log(audio[index].currentTime);
        bar_state[index].style.animationName= "mbar"; // 음악 상태바 애니메이션 줍니다.
        bar_state[index].style.animationPlayState="running"; // 음악 상태바의 애니메이션을 토글로써 음악이 중지되면 애니메이션의 실행을 중지시키고 실행시키고를 해주어 상태바를 구현하였습니다.
        
        
        musicStatus = true; // 음악 스태이터스 bool 값을 트루로 반환. -> 음악 이미지의 불투명도를 조절하여 이미지를 누르게 유도하는 인터랙션 적용

        nav_music_container.style.transform = "translateX(0)"; // nav네비게이션 음악 상태를 표시.

        state[index].innerHTML = "<span class=\"mp\">Music Playing</span>"; // 음악 실행 표시에 innerHTML로 스판으로 음악 실행이라는 /mp -> 불투명도가 점점1이되는 애니메이션효과줌./ 글자를 삽입.
        music_graph_all[index].innerHTML = "<div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div><div class=\"graph\" >Graph</div>"; // 뮤직 그래프도 그래프값을 html로 넣어 자연스러운 전환효과를 주었습니다(뮤직그래프 -> 일시정지 이미지 토글)
        for(var i = 0; i < graph.length; i++){ // 그래프를 보이게끔 해줍니다.
            graph[i].style.opacity = 0.55;
        }
        nav_imgSrc.src = "./img/music/music0" + index_num + ".png"; // 네비에 클릭한 이미지의 인덱스를 music01~06으로 저장해 해당 이미지로 src를 변경.
        nav_h3.innerText = music_title[index].innerText; // h3 음악 제목도 music_title 의 각 인덱스의 innerText 값을 네비게이션 제목에 반환해줍니다.
        for(var i =0; i< nav_graph.length; i++){ // 음악 그래프 실행.
            nav_graph[i].style.animationName = "music-graph";
        }
        music_img[index].style.filter = "brightness(100%) drop-shadow(0px 0px 15px rgba(20, 142, 166, 0.4))"; // 눌렀을때 음악 재생상태이면 음악 이미지 명도 100
        
    }
    else if(!toggleMusic){ // 토글로써 음악을 일시정지하는 기능입니다. 음악 실행과 비슷한 로직으로 값을 반대로 돌아가는 형태로 계획.
        audio[index].pause();
        //console.log(audio[index].currentTime);
        bar_state[index].style.animationPlayState="paused"
        
        musicStatus = false;
        nav_music_container.style.transform = "translateX(-500px)";

        state[index].innerHTML = "<span class=\"mp\">Music Paused</span>";
        music_graph_all[index].innerHTML += "<img src=\"./img/pause.png\" class=\"state-pause\" alt = \"nav-pause\" width = \"9\" style= 'opacity: 0.5'/>";
        for(var i = 0; i < graph.length; i++){
            graph[i].style.opacity = 0;
        }
        for(var i =0; i< nav_graph.length; i++){
            nav_graph[i].style.animationName = "";
        }
        music_img[index].style.filter = "brightness(65%) drop-shadow(0px 0px 15px rgba(20, 142, 166, 0.4))";
    }
    toggleMusic = !toggleMusic; // 토글의 핵심입니다. if와 else if를 읽고 toggleMusic의 현재값을 ! 반전시켜서 반환합니다.
    // totime = !totime;
}


/* 폴킴 이미지 갤러리 */
/*스크롤링될 갤러리 묶음 불러오기 */
var gallery_container = document.querySelector(".gallery-container > div");
//각 이미지들 불러오기
var gallery_img = document.querySelectorAll(".gallery-img");
gallery_img = Array.prototype.slice.call(gallery_img);
// 이미지 상태바 불러오기
var g_status = document.querySelectorAll(".g-status");
g_status = Array.prototype.slice.call(g_status);
// 이미지는 총 5개 중앙이 보여져야해서 지금 현재상태 3이라고 인식
var indexGallery = 3;
var trans = 3;

//값들을 초기화시켜줍니다. 이미지들을 0번째 1번째 3번째 4번째에 퍼스펙티브 효과를 줍니다.
for(var i=0;i < gallery_img.length;i++){
    gallery_img[0].style.transform = "perspective(450px) rotateY(60deg) scaleX(0.9)";
    gallery_img[1].style.transform = "perspective(450px) rotateY(40deg) scaleX(0.8)";
    gallery_img[0].style.opacity="0.35";
    gallery_img[1].style.opacity="0.35";
    //gallery_img[2].style.transform = ""; // 중앙은 변형시키지 않습니다.
    gallery_img[3].style.opacity="0.35";
    gallery_img[4].style.opacity="0.35";
    gallery_img[3].style.transform = "perspective(450px) rotateY(-40deg) scaleX(0.8)";
    gallery_img[4].style.transform = "perspective(450px) rotateY(-60deg) scaleX(0.9)";

    
}
// 갤러리 콘테이너에 마우스 휠 이벤트를 줍니다// 좌우 스크롤링을 구현합니다.
gallery_container.addEventListener("mousewheel", onScrollGallery);
var scrollNow = 0; // 스크롤 될 변수입니다. 추후에 값을 입력하고 트렌지션효과를 주면 자연스러운 움직임을 구현할수있다는 것을 알았습니다. 그동안은 setInterval 을 통해서 1단위씩 움직여 자연스러운 무빙효과를 주는 로직을 짰습니다.
function onScrollGallery(e){ // 스크롤 하면 실행되는 함수.
    var pos = 0;
    e.preventDefault();
    //console.log("스크롤");

    if(e.wheelDelta == -120 && indexGallery < 5){ // 마우스 휠 아래감지,  갤러리 오버 스크롤링 방지.
        var scrollani = setInterval(sclani, 1); // 라이브페이지에서 영상의 스크롤링의 로직과 동일하게 작동되게 스크립트를 짰습니다. 
        indexGallery++;                         // setInterval 을 주어 몇초마다 css 움직임을주어 해당 값에 도달하면 interval을 제거하는 형식으로 짰습니다. // 이후 songScript와 이전 Live스크립트 등 스크롤링을 구현하는 거의 모든 로직에 이 방식을 사용하였습니다.
        trans++;
        console.log(trans);
        gallery_img[trans-2].style.transform="perspective(450px) rotateY(40deg) scaleX(0.8)"; // 해당 배열 -> trans-1 -> 0번째 배열에 전에있던 이미지들에 퍼스펙티브를 줍니다.
        gallery_img[trans-2].style.opacity = "0.35"; // 현재 중앙에 있는 이미지가 아닌것은 -> 오퍼시티 조정
        gallery_img[trans-1].style.transform="perspective(0px) rotateY(0deg) scaleX(1)"; // 현재 보여지는 배열에 -> trans가 초기값이 3이고 중앙이라 인식하고 배열 0이라 인식하여 사실상 2번째있는 이미지가 0번째라고 인식해주었습니다.
        gallery_img[trans-1].style.opacity = "1";                                        // 퍼스펙티브와 로테이트 y값을 초기화시킵니다. 

        g_status[trans-2].style.flexBasis = "6px"; // 갤러리 상태바도 flex 를 조정해 현재상태의 상태바에 42px을 주고 백그라운드 칼라를 바꾸어주었습니다.
        g_status[trans-2].style.backgroundColor =  "white";
        g_status[trans-1].style.flexBasis = "42px";
        g_status[trans-1].style.backgroundColor = "#2da89c";

        function sclani(){ // 스크롤되는 값 조정 interval 해당 조건을 충족하면 interval 제거
            if (pos == 20){
                clearInterval(scrollani);
            } else {
                // music_container.style.transform += "translateX(" + -10 + "px)";
                scrollNow = scrollNow -1;
                pos++;
                
            }
            //console.log("아래스크롤");
            gallery_container.style.transform = 'translateX(' + scrollNow + "%)"; // 갤러리 콘테이너 translateX로 좌우로 이동.
        }
    }
    else if(e.wheelDelta == 120 && indexGallery > 1){ // 아래로 스크롤된 내용을 반대로 되게끔 해주어 구현하였습니다.
        var scrollani = setInterval(sclani, 1);
        indexGallery--;
        trans--;
        console.log(trans);
        gallery_img[trans-1].style.transform="perspective(0px) rotateY(0deg) scaleX(1)";
        gallery_img[trans-1].style.opacity = "1";
        gallery_img[trans].style.opacity = "0.35";
        gallery_img[trans].style.transform="perspective(450px) rotateY(-40deg) scaleX(0.8)";

        g_status[trans-1].style.flexBasis = "42px";
        g_status[trans-1].style.backgroundColor = "#2da89c";
        g_status[trans].style.flexBasis = "6px";
        g_status[trans].style.backgroundColor =  "white";

        function sclani(){
            if (pos == 20){
                clearInterval(scrollani);
            } else {
                // music_container.style.transform += "translateX(" + -10 + "px)";
                scrollNow = scrollNow +1;
                pos++;
                
            }
            //console.log("아래스크롤");
            gallery_container.style.transform = 'translateX(' + scrollNow + "%)";
        }
    }
}

/* +버튼 오버시 */
// 각각 카드에 있는 1번째 -> official 유튜브로 가는 버튼과 2번째 -> song.html 로 가는 버튼들을 불러왔습니다.
var card_offi_btn = document.querySelector(".card-offi-btn");
var card_music_btn = document.querySelector(".card-music-btn");

//마우스오버시에 +였던 글자를 바꿔주고 leave돠었을때 다시 +로 바꿔주는것을 구현하기 위해 마우스 오버와 리브 이벤트를 부여해주었습니다.
card_offi_btn.addEventListener("mouseover", onOverOffi);
card_offi_btn.addEventListener("mouseleave", onleaveOffi);

card_music_btn.addEventListener("mouseover", onOverMus);
card_music_btn.addEventListener("mouseleave", onleaveMus);

// 마우스 오버시에 오퍼시티 0 0.3초후에 다시 1 후 각 해당 글자 innerText로 기입.
function onOverOffi(e){
    setTimeout(function(e){
        card_offi_btn.style.opacity = "0";
    },10);
    setTimeout(function(e){
        card_offi_btn.innerText = "Official";
        card_offi_btn.style.opacity = "1";
    },300);
}
function onleaveOffi(e){
    setTimeout(function(e){
        card_offi_btn.style.opacity = "0";
    },10);
    setTimeout(function(e){
        card_offi_btn.innerText = "+";
        card_offi_btn.style.opacity = "1";
    },300);
}
// 마찬가지로 오버시와 리브시에 오퍼시티와 글자기입을 제어해주었습니다.
function onOverMus(e){
    
    setTimeout(function(e){
        card_music_btn.style.opacity = "0";
    },10);
    setTimeout(function(e){
        card_music_btn.innerText = "More Song";
        card_music_btn.style.opacity = "1";
        card_music_btn.style.backgroundColor = "white";
        card_music_btn.style.color= "#2da89c";
    },300);
}
function onleaveMus(e){
    setTimeout(function(e){
        card_music_btn.style.opacity = "0";
    },10);
    setTimeout(function(e){
        card_music_btn.innerText = "+";
        card_music_btn.style.opacity = "1";
        card_music_btn.style.backgroundColor = "#2da89c";
        card_music_btn.style.color= "white";
    },300);
}

//각각 카드의 좌우 클릭 스크롤링과 로드시, 언로드시 애니메이션을 주기위해 불러왔습니다.
var Pcard01 = document.querySelector("#Pcard01");
var Pcard02 = document.querySelector("#Pcard02");
var Pcard03 = document.querySelector("#Pcard03");
var paul_container = document.querySelector("#paul-container");
//console.log(paul_container);

// 각 언로드 로드될 애니메이션을 줄 요소들을 불러왔습니다.
var paulimg01 = document.querySelector(".paulimg01");

var paulimg02 = document.querySelector(".paulimg02"),
    reco_container = document.querySelector(".reco-container"),
    cardTxt = document.querySelectorAll(".cardTxt"),
    cardTxt_h3 = document.querySelectorAll(".cardTxt > div > h3");

var Pcard03H3 = document.querySelector("#Pcard03 > h3"),
    Pcard03P = document.querySelector("#Pcard03 > p"),
    gallery_con = document.querySelector(".gallery-container");
    
// 각각 카드에 클릭 이벤트를 부여합니다.
Pcard01.addEventListener("click", onPcard01);
Pcard02.addEventListener("click", onPcard02);
Pcard03.addEventListener("click", onPcard03);

// 
//var PcardNow = 1;
//var PcardScroll = 0; // 스크롤을 이번엔 트랜지션효과로 주었습니다 //이전엔 interval 로 구현 -> 비효율적.
//
cardReset(); // 카드들 리셋 함수 실행.

function cardReset(){ // 카드 리셋함수 // 첫번째 카드 오퍼시티 1 두번째 세번째 카드 오퍼시티 조정및 크기조정.
    Pcard01.style.opacity = "1";
    Pcard02.style.opacity = "0.25";
    Pcard03.style.opacity = "0.25";
    Pcard01.style.transform = "scale(1)";
    Pcard02.style.transform = "scale(0.85)";
    Pcard03.style.transform = "scale(0.85)";

    paulimg01.style.animationName = "onLoadPaulimg_Ani"; // 로드 애니메이션. //페이지로드//
}

// 카드 01 을 선택했을시에 translateX 를 기본으로 주어 카드 1이 보이게합니다. 그리고 카드들의 로드/언로드 애니메이션들을 제어합니다.
function onPcard01(e){
    e.preventDefault();
    e.stopPropagation();

    paul_container.style.transform = 'translateX(' + 0 + "px)";
    Pcard01.style.opacity = "1";
    Pcard02.style.opacity = "0.25";
    Pcard03.style.opacity = "0.25";

    Pcard01.style.transform = "scale(1)";
    Pcard02.style.transform = "scale(0.85)";
    Pcard03.style.transform = "scale(0.85)";

    setTimeout(function(){
        /* Pcard01 애니메이션 */
        paulimg01.style.opacity = "0";
        paulimg01.style.animationName = "Paulimg_Ani";
        cardTxt[0].style.opacity = "0";
        cardTxt[0].style.animationName = "cardTxt_Ani";
        cardTxt_h3[0].style.opacity = "0";
        cardTxt_h3[0].style.animationName = "cardTxtIn_Ani";
    },400);

    /* Pcard02 애니메이션 */
    paulimg02.style.opacity = "1";
    paulimg02.style.animationName = "unLoadPaulimg_Ani";
    reco_container.style.animationName = "unLoadreco_container_Ani";
    reco_container.style.opacity = "1";
    cardTxt[1].style.animationName = "unLoadcardTxt_Ani";
    cardTxt[1].style.opacity = "1";
    cardTxt_h3[1].style.opacity = "1";
    cardTxt_h3[1].style.animationName = "unLoadcardTxtIn_Ani";
}
// 카드 02 눌렀을때 카드 02가 보이도록 translateX값 조정 트랜지션 // 마찬가지로 로드/언로드 애니메이션 제어.
function onPcard02(e){
    e.preventDefault();
    e.stopPropagation();
    paul_container.style.transform = 'translateX(-' + 1120 + "px)";
    Pcard02.style.opacity = "1";
    Pcard01.style.opacity = "0.25";
    Pcard03.style.opacity = "0.25";

    Pcard02.style.transform = "scale(1)";
    Pcard01.style.transform = "scale(0.85)";
    Pcard03.style.transform = "scale(0.85)";

    
    /*Pcard01 애니메이션 */
    paulimg01.style.opacity = "1";
    paulimg01.style.animationName = "unLoadPaulimg01_Ani";
    cardTxt[0].style.animationName = "unLoadcardTxt_Ani";
    cardTxt[0].style.opacity = "1";
    cardTxt_h3[0].style.opacity = "1";
    cardTxt_h3[0].style.animationName = "unLoadcardTxtIn_Ani";
    
    setTimeout(function(){
        /*Pcard02 애니메이션 */
        reco_container.style.opacity = "0";
        reco_container.style.animationName = "reco_container_Ani";
        cardTxt[1].style.opacity = "0";
        cardTxt[1].style.animationName = "cardTxt_Ani";
        cardTxt_h3[1].style.opacity = "0";
        cardTxt_h3[1].style.animationName = "cardTxtIn_Ani";
        paulimg02.style.opacity = "0";
        paulimg02.style.animationName = "Paulimg_Ani";
    },400);

    Pcard03H3.style.animationName = "unLoadcardTxt_Ani";
    Pcard03H3.style.opacity = "1";
    Pcard03P.style.animationName = "unLoadcardTxtIn_Ani";
    Pcard03P.style.opacity = "1";
    gallery_con.style.opacity = "1";
    gallery_con.style.animationName = "unLoadgallery_Ani";
}
// 위와 동일한 로직으로 구현.
function onPcard03(e){
    e.preventDefault();
    e.stopPropagation();
    paul_container.style.transform = 'translateX(-' + 2310 + "px)";
    Pcard03.style.opacity = "1";
    Pcard01.style.opacity = "0.25";
    Pcard02.style.opacity = "0.25";

    Pcard03.style.transform = "scale(1)";
    Pcard01.style.transform = "scale(0.85)";
    Pcard02.style.transform = "scale(0.85)";

    paulimg02.style.opacity = "1";
    paulimg02.style.animationName = "unLoadPaulimg01_Ani";
    cardTxt[1].style.animationName = "unLoadcardTxt_Ani";
    cardTxt[1].style.opacity = "1";
    cardTxt_h3[1].style.opacity = "1";
    cardTxt_h3[1].style.animationName = "unLoadcardTxtIn_Ani";
    reco_container.style.animationName = "unLoadreco_container_Ani";
    reco_container.style.opacity = "1";

    setTimeout(function(){
        /*Pcard03 애니메이션 */
        Pcard03H3.style.animationName = "cardTxt_Ani";
        Pcard03H3.style.opacity = "0";
        Pcard03P.style.animationName = "cardTxtIn_Ani";
        Pcard03P.style.opacity = "0";
        gallery_con.style.opacity = "0";
        gallery_con.style.animationName = "gallery_Ani";
    },400);
}