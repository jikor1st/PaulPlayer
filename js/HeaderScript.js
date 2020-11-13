console.log("HeaderScript 로드!"); 

/* header영역을 제어하는 스크립트입니다.*/
var navA = document.querySelectorAll("nav ul  a");
navA = Array.prototype.slice.call(navA);

var navImg = document.querySelectorAll("nav ul img");
navImg = Array.prototype.slice.call(navImg);

// navA를 불러온 요소에(네비게이션) for문으로 마우스 오버와 아웃 이벤트를 부여하고 백그라운드컬러와 글자 컬러를 초기화 시켜줍니다.
for(var i = 0; i < navA.length; i++){
    navA[i].addEventListener("mouseover", onMouseNavLi); // navA요소에 마우스오버 이벤트부여
    navA[i].addEventListener("mouseout", onMouseNavLi); // navA요소에 마우스아웃 이벤트부여
    navA[i].style.backgroundColor = "initial"; // 백그라운드를 기본값으로 초기화
    navA[i].style.color = "#323436"; // 폰트컬러 #323436으로 초기화
    navImg[i].style.opacity = 0; // navImg -> pause이미지 opacity 0으로 초기화
    if(window.document.title == "Paul Player_Song"){ // 헤더가 같이 적용되어있는 모든 곳에 스크립트를 추가해주지 않고 window.document.title을 불러와 해당 파일일때 값을 다시 초기화 시켜줍니다.
        navA[1].style.backgroundColor = "#2da89c";
        navA[1].style.color = "#fff";
        navImg[1].style.opacity = 0.75;
    }
    else if(window.document.title == "Paul Player_Live"){ // window.document.title 불러와 해당파일일때 값들 초기화
        navA[2].style.backgroundColor = "#2da89c";
        navA[2].style.color = "#fff";
        navImg[2].style.opacity = 0.75;
    }
    else if(window.document.title == "Paul Player_Paul"){ // window.document.title 불러와 해당파일일때 값들 초기화
        navA[0].style.backgroundColor = "#2da89c";
        navA[0].style.color = "#fff";
        navImg[0].style.opacity = 0.75;
    }
}



function onMouseNavLi(e){ // navA에 준 이벤트를 불러와 실행되는 함수 구현
    e.preventDefault(); // 기본적으로 가지고 있는 이벤트를 막아줍니다.
    var mTarget = e.currentTarget; // e.currentTarget 이벤트를 불러와 어떤 객체에 마우스를 오버했는지 mTarget에 반환.
    var index = navA.indexOf(mTarget); // 인덱스값으로 반환시켜줍니다.


    if(e.type === "mouseover"){ // e.type 로 마우스를 오버했을때 if문 실행
        for(var i = 0; i < navA.length; i++){ //for문으로 navA배열들을 불러와 초기화시켜주고 index값에만 효과 부여
            navA[i].style.backgroundColor = "initial";
            navA[index].style.backgroundColor = "#2da89c";
            navA[i].style.color = "#323436";
            navA[index].style.color = "white";
        }
    }
    else if(e.type === "mouseout"){ // 위와 동일하게 마우스를 아웃했을때 해당 다큐먼트 타이틀을 불러와 값을 초기화 시켜주고 각 다큐먼트에 머물러있다는 초록색 백그라운드를 깔아줌.
        for(var i = 0; i < navA.length; i++){ 
            navA[i].style.backgroundColor = "initial";
            navA[i].style.color = "#323436";
            if(window.document.title == "Paul Player_Song"){ // paul_Player_Song일때 배열 1번째를 마우스 아웃했을때 초록색 배경과 컬러를 흰색으로 초기화.
                navA[1].style.backgroundColor = "#2da89c";
                navA[1].style.color = "white";
            }
            else if(window.document.title == "Paul Player_Live"){ // Paul Player_Live일때 배열 2번째를 마우스 아웃했을때 초록색 배경과 컬러를 흰색으로 초기화.
                navA[2].style.backgroundColor = "#2da89c";
                navA[2].style.color = "white";
            }
            else if(window.document.title == "Paul Player_Paul"){ //Paul Player_Paul일때 배열 3번째를 마우스 아웃했을때 초록색 배경과 컬러를 흰색으로 초기화.
                navA[0].style.backgroundColor = "#2da89c";
                navA[0].style.color = "white";
            }
            // navLi[index].style.backgroundColor = "#2da89c";
        }
    }
    
}

/*페이지 이동간 자연스러운 전환효과*/
for(var i = 0;i < navA.length; i++){ // navA에 마우스 클릭 이벤트 부여.
    navA[i].addEventListener("click", onClickNavA);
}
/*header 요소 불러오기 */
var headerSec = document.querySelector("header");

/*paul kim 요소 불러오기 */
var paulPage = document.querySelector("#paulPage");
var Pcard01 = document.querySelector("#Pcard01");
var Pcard02 = document.querySelector("#Pcard02");
var Pcard03 = document.querySelector("#Pcard03");

/*paul song 요소 불러오기*/
var music_container = document.querySelector("#music-container");
var songPage = document.querySelector("#songPage");

/*paul live 요소 불러오기*/
var livePage = document.querySelector("#livePage");
var live_content = document.querySelector(".live-content");
var ysc = document.querySelector(".youtube-status-container");

// navA(네비게이션)을 클릭했을때
function onClickNavA(e){
    var mTarget = e.currentTarget;
    var index = navA.indexOf(mTarget); // 각 인덱스 값을 불러오기 -> 각 navA가 가지고있는 .href 을 사용해서 기본으로 가지고 있는 링크 값을 반환하여 location.href를 이용해 링크해줍니다.
    e.preventDefault(); // 기본속성 제거
    if(window.document.title == "Paul Player_Song"){ // 제목이 Paul Player_Song일때 if문 실행
        music_container.style.animationName = "unLoadSongPage"; //각 요소 언로드 되는 애니메이션 부여
        songPage.style.animationName = "unLoadSongPageTitle";
        headerSec.style.animationName = "unLoadHeader"; // 헤더 언로드 애니메이션
    }
    else if(window.document.title == "Paul Player_Live"){ // 제목이 Paul Player_Live일때 if문 실행
        livePage.style.animationName = "unLoadlivepageTitle"; //각 요소 언로드 되는 애니메이션 부여
        live_content.style.animationName = "unLoadlive_content";
        ysc.style.animationName = "unLoadYst";
        headerSec.style.animationName = "unLoadHeader"; // 헤더 언로드 애니메이션
    }
    else if(window.document.title == "Paul Player_Paul"){ // 제목이 Paul Player_Paul일때 if문 실행
        paulPage.style.animationName = "unLoadpaulpageTitle"; //각 요소 언로드 되는 애니메이션 부여

        unLoadPcard(); // 함수에 언로드되는 기능을 넣어 함수 실행.

        headerSec.style.animationName = "unLoadHeader"; // 헤더 언로드 애니메이션
        
    }
    setTimeout(function(e){ // setTimeout함수를 사용해 각 요소들이 언로드 (자연스럽게 opacity 0을 주어 없어지는 효과)를 준후 링크로 이동해서 자연스러운 장면전환 효과를 줍니다.
        location.href = navA[index].href; // 각 요소의 href 값을 이용해 location.href로 페이지 이동.  // 각 페이지별로 css에서 페이지가 로드될때 로드되는 애니메이션을 주어 자연스럽게 페이지 로드가 되도록 해주었습니다.
    },970); // 0.97초 후에 페이지 이동.
}
function unLoadPcard(){ // 폴킴 페이지의 각 카드들이 언로드 되는 기능들이 들어있는 함수.
    Pcard01.style.animationName = "unLoadPcardeach"
    Pcard01.style.animationDuration = "0.7s";
    Pcard01.style.animationFillMode = "forwards";
    Pcard02.style.animationName = "unLoadPcardeach"
    Pcard02.style.animationDuration = "0.7s";
    Pcard02.style.animationDelay = "0.2s";
    Pcard02.style.animationFillMode = "forwards";
    Pcard03.style.animationName = "unLoadPcardeach"
    Pcard03.style.animationDuration = "0.7s";
    Pcard03.style.animationFillMode = "forwards";
    Pcard03.style.animationDelay = "0.4s";
}

var card_offi_btn = document.querySelector(".card-offi-btn"); // a태그를 불러와 해당 div에 마우스 이벤트를 주어 이벤트가 적용되어 따로 자바스크립트에서 링크를 해주었습니다.
var card_music_btn = document.querySelector(".card-music-btn"); // 이버튼은 song.html 을 불러와 따로 장면의 전환효과를 자연스럽게 주기위해 a태그를 불러와 제어해주었습니다.

if(window.document.title == "Paul Player_Paul"){ // 폴 킴 페이지에서만 이벤트 부여
    card_offi_btn.addEventListener("click", onUpOffi); // 마우스 클릭 이벤트 부여
    card_music_btn.addEventListener("click", onclickMus); // 마우스 클릭 이벤트 부여
}


function onclickMus(e){ // muse버튼 클릭했을때
    e.preventDefault(); // 기본 a태그 속성 제거
    paulPage.style.animationName = "unLoadpaulpageTitle"; // 타이틀을 언로드 애니메이션 줍니다.

    unLoadPcard(); // 카드들 언로드.

    headerSec.style.animationName = "unLoadHeader"; // 헤더 언로드
    setTimeout(function(e){ // 0.97초후에 ./song.html 페이지로 이동되게끔 연결.
        location.href = "./song.html";
    },970);
}

function onUpOffi(e){ // offi버튼 클릭했을때
    e.preventDefault(); // 기본 a태그 속성 제거
    var openNew = window.open("about:blank"); // 링크를 self로 하지않고 blank 로 다른 윈도우 창으로 열게끔 oopenNew에 부여하고
    openNew.location.href = "https://www.youtube.com/channel/UCFjKZImEGGPqOz7P9UZ0IlQ"; // openNew에 location.href 로 해당 링크가 새 창에서 열리도록 했습니다.
    // target = "_blank"
}