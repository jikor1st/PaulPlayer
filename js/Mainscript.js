console.log("자바스크립트 로드");
/*메인화면의 자바스크립트 제어입니다. */

/*메인의 이미지, 글자, 요소들 불러오기. */
var PaulEl = document.querySelector("#paul-player");
var PaulPlayer = document.querySelector("img.img-paulplayer");
var h1Paul = document.querySelector("h1.h1-paul");
var h1Player = document.querySelector("h1.h1-player");
var musicGraphAll = document.querySelector("div.music-graph-all");
var imgPause = document.querySelector("img.img-pause");
var imgStop = document.querySelector("img.img-stop");
var PaulP = document.querySelector("p");

//paulPlayer -> 폴킴의 큰 이미지// 에 마우스오버와 아웃 이벤트를 부여합니다.
PaulPlayer.addEventListener("mouseover", onMousePaulPlayer);
PaulPlayer.addEventListener("mouseout", onMousePaulPlayer);

var unload = 0; // 

function onMousePaulPlayer(e){
    if(unload == 0){ //unload 가 0일때 // 이미지를 클릭하면 paul kim 페이지로 이동되는데 그동안 마우스오버와 아웃의 이벤트가 이루어지지 않도록 제어.
        if(e.type === "mouseover"){ // e.type가 마우스 오버일때. if문 실행.

            PaulPlayer.style.filter = "drop-shadow(30px 30px 30px #148ea660) grayscale(0) saturate(100%) brightness(100%) contrast(100%)" // 마우스를 오버하면 기본 filter속성을 줍니다. > 오버하기전 속성은 채도가 빠져있습니다.
            PaulPlayer.style.opacity = 1; // 마우스 오버하면 opacity 1부여 // 트랜지션을 부여해서 자연스럽게.
            
    
            h1Paul.style.left = "22.5%"; // h1 왼쪽 글씨를 디자인상 위치로 트랜지션효과로 자연스럽게 나타나게 합니다 left 와 opacity를 제어합니다.
            h1Paul.style.opacity = 1;
    
            h1Player.style.right = "32%"; // h1 오른쪽 글씨를 디자인상 위치로 트랜지션효과로 자연스럽게 나타나게 합니다 left 와 opacity를 제어합니다.
            h1Player.style.opacity = 1;
    
            musicGraphAll.style.right = "32%"; // 음악 그래프 효과도 위치 조정 및 나타나는 효과
            musicGraphAll.style.opacity = "1";
            
            imgPause.style.top = "300px"; // 이미지 일시정지 나타나는 효과.
            imgPause.style.left = "19.5%";
            imgPause.style.opacity = "0.3";
            //
            imgPause.style.animationName = "micro-moving"; // 이미지 일시정지 마이크로 인터랙션 부여.
            imgPause.style.animationIterationCount = "infinite";
            imgPause.style.animationDuration = "5s";

            imgStop.style.bottom = "250px"; // 이미지 정지 나타나는 효과.
            imgStop.style.right = "21.5%";
            imgStop.style.opacity = "0.3";
            //
            imgStop.style.animationName = "micro-moving"; // 이미지 정지 마이크로 인터랙션 부여.
            imgStop.style.animationIterationCount = "infinite";
            imgStop.style.animationDuration = "5s";
    
            PaulP.style.opacity = "0"; // 마우스를 오버하라는 글씨 표시.
        }
        else if(e.type === "mouseout"){ // e.type / 마우스 아웃 이벤트가 발생하면. 
    
            PaulPlayer.style.filter = "drop-shadow(30px 30px 30px #148ea660) grayscale(100%) saturate(0) brightness(125%) contrast(50%)"; // 다시 회색으로 변화.
            PaulPlayer.style.opacity = 0.4; // opacity값 줌.
    
            h1Paul.style.left = "7%"; // 이하로 요소들을 다시 안보이게끔 변화시켜줌.
            h1Paul.style.opacity = 0;
            
            h1Player.style.right = "17%";
            h1Player.style.opacity = 0;
    
            musicGraphAll.style.right = "27%";
            musicGraphAll.style.opacity = "0";
    

            imgPause.style.top = "250px";
            imgPause.style.left = "15.5%";
            imgPause.style.opacity = "0";
            //
            imgPause.style.animationName = "unLoadMicro";
            imgPause.style.animationIterationCount = "1";
            imgPause.style.animationDuration = "0.5s";

            imgStop.style.bottom = "200px";
            imgStop.style.right = "17%";
            imgStop.style.opacity = "0";
            //
            imgStop.style.animationName = "unLoadMicro";
            imgStop.style.animationIterationCount = "1";
            imgStop.style.animationDuration = "0.5s";
    
            PaulP.style.opacity = "0.4";
        }
    }
}

/*폴킴 메인페이지 unload 기능구현 */
/*settimeout으로 링크이동을 지연시켜서 자연스러운 장면 이동효과. */
PaulPlayer.addEventListener("click", onClickPaulPlayer);

/*paul 로고*/
var paulLogo = document.querySelector("#wrap > h1");

function onClickPaulPlayer(e){
    unload = 1;
    e.preventDefault();
    paulLogo.style.animationName = "UnloadPaulLogo";
    PaulEl.style.animationName = "UnloadPaulImage";
    setTimeout(function(){
        location.href ="./paulkim.html";
    }, 970);
}
//페이지 로드시 hover and play 글자 장면전환 효과 
PaulP.style.opacity = 0; // 초기 0 주고 0.6초이후에 본래값으로 애니메이션.
setTimeout(function(){PaulP.style.opacity="0.4"},600);