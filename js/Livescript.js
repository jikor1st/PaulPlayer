console.log("Live 스크립트 로드!");

/*라이브 페이지 제목과 iframe 비디오 묶음 불러오기 */
var live_title = document.querySelector(".live-title");
var live_video = document.querySelector(".live-video");
/*영상 제목과 아이프레임들을 불러오고 hr 로 넣은 선을 불러옵니다.  */
var live_title_h3 = document.querySelectorAll(".live-title h3")
var live_iframe = document.querySelectorAll("iframe");
var hr = document.querySelector("hr"); // 마우스 스크롤 할때마다 마이크로 인터랙션을 부여할 계획입니다.

var y_status = document.querySelectorAll(".y-status"); // 지금 어디위치에머물러있는지 status 를 넣어줍니다.
y_status = Array.prototype.slice.call(y_status); // 배열형태를 잘라서 반환.

for(var i = 0; i < live_title_h3.length; i++){ // 값들을 한번씩 초기화 시켜줍니다.
    live_title_h3[i].style.opacity = 0.2; // 라이브영상 제목들을 현재 머물러 있는 영상이 아니라면 스케일을 작게하고 글씨에 opacity 부여.
    live_title_h3[i].style.transform = "scale(0.87)";
    live_title_h3[3].style.opacity = 1;
    live_title_h3[3].style.transform = "scale(1)";

    live_iframe[i].style.opacity = 0.2; // 라이브영상도 현재 머물러 있는 영상이 아니라면 스케일을 작게하고 opacity 감소.
    live_iframe[i].style.transform = "scale(0.67)";
    live_iframe[3].style.opacity = 1;
    live_iframe[3].style.transform = "scale(1.1)";

    y_status[i].style.flexBasis = "6px"; // 머물러있는 상태바도 초기화.
    y_status[i].style.backgroundColor = "white";
    y_status[3].style.flexBasis = "32px";
    y_status[3].style.backgroundColor = "#2da89c";
}

window.addEventListener("mousewheel", onScroll); // 윈도우에 마우스휠 이벤트를 부여합니다.

var limit = 4; // 리밋값을 설정하여 스크롤을 했을때 계속 움직이는 것을 막아줍니다.
var scrollNow = 1; // 스크롤 변수 선언
var scrollNowv = 0; // 스크롤 변수 2 선언 -> 영상 타이틀 스크롤 변수

function onScroll(e){ // 마우스 스크롤이 감지되면.
    var pos = 0; // pos는 이 위치까지 스크롤링이 되게끔 리밋을 설정하기위해 선언했습니다.
    // console.log( limit);
    if(e.wheelDelta == -120 && limit < 7){ // e.wheelDelta 를 불러와서 아래로 스크롤하면 -120값 출력 && 로 내부에서 limit++로 영상의 갯수에 맞춰 7보다 작을때만 스크롤링이 되게끔해서 막아주었습니다.
        // console.log("아래휠" + limit);
        var scrolltitle = setInterval(scltitle, 1); // setInterval을 선언해 자연스러운 스크롤링 구현.
        limit++; // 아래로 휠을 했을때 limit에 1씩 증가.

        for(var i = 0; i < live_title_h3.length; i++){ // for문으로 휠을했을때 모두 값을 작게 한후. 해당 limit의 값-1 -> 0번째가 첫번째 로 지금현재 위치의 영상에 스케일과, opacity를 기본으로 반환해줍니다.
            live_title_h3[i].style.opacity = 0.2;
            live_title_h3[i].style.transform = "scale(0.87)"
            live_title_h3[limit-1].style.opacity = 1;
            live_title_h3[limit-1].style.transform = "scale(1)"

            live_iframe[i].style.opacity = 0.2;
            live_iframe[i].style.transform = "scale(0.67)"
            live_iframe[limit-1].style.opacity = 1;
            live_iframe[limit-1].style.transform = "scale(1.1)"
        }


        y_status[limit-2].style.flexBasis = "6px"; // 스테이터스 바 업데이트.
        y_status[limit-2].style.backgroundColor = "white";
        y_status[limit-1].style.flexBasis = "32px";
        y_status[limit-1].style.backgroundColor =  "#2da89c";

        hr.style.transform = "scaleX(0.8)"; // hr에 마이크로 인터랙션을 줍니다. css에 트랜지션을 주어 크기를 줄이고 0.8초후에 다시 스케일 1을 주어 인터랙션을 주었습니다.
        setTimeout(function(){
            hr.style.transform = "scaleX(1)";
        },800);

        function scltitle(){ // 스크롤 이벤트 제어. pos가 ++ 되다가 108이 되면 스크롤링이 되는것을 clearInterval로 막아주었습니다.
            if (pos == 108){
                clearInterval(scrolltitle);
            } else {
                scrollNow = scrollNow -1;
                scrollNowv = scrollNowv -4.8;
                pos++;
            }
            live_title.style.top = scrollNow + "px"; // 스크롤링
            live_video.style.top = scrollNowv + "px"; // 스크롤링
        }


    }
    else if(e.wheelDelta == 120 && limit > 1){ // e.wheelDelta 값 +120이 출력되면 휠 위 했다고 판단.
        
        // console.log("위로 휠");
        var scrolltitle = setInterval(scltitle, 1); // 아래로 휠을 했던거와 비슷한 로직입니다.
        limit--;

        for(var i = 0; i < live_title_h3.length; i++){
            live_title_h3[i].style.opacity = 0.2;
            live_title_h3[i].style.transform = "scale(0.87)"
            live_title_h3[limit-1].style.opacity = 1;
            live_title_h3[limit-1].style.transform = "scale(1)"

            live_iframe[i].style.opacity = 0.2;
            live_iframe[i].style.transform = "scale(0.67)"
            live_iframe[limit-1].style.opacity = 1;
            live_iframe[limit-1].style.transform = "scale(1.1)"
        }

        y_status[limit-1].style.flexBasis = "32px";
        y_status[limit-1].style.backgroundColor = "#2da89c";
        y_status[limit].style.flexBasis = "6px";
        y_status[limit].style.backgroundColor = "white";

        hr.style.transform = "scaleX(0.8)";
        setTimeout(function(){
            hr.style.transform = "scaleX(1)";
        }, 800);
        

        function scltitle(){
            if (pos == 108){
                clearInterval(scrolltitle);
            } else {
                scrollNow = scrollNow + 1;
                scrollNowv = scrollNowv + 4.8;
                pos++;
            }
            live_title.style.top = scrollNow + "px";
            live_video.style.top = scrollNowv + "px";
        }
    }
}

/*
    iframe을 사용해서 유튜브 영상을 로드시키면 인터넷환경, 컴퓨터의 성능으로 인해 뚝뚝 끊겨서 나오는 현상이 있습니다.
    그것을 유튜브 영상을 애니메이션을 주어 로드될때 opacity값을 0에서 오른쪽에서 왼쪽으로 나오는 애니메이션을 4초후에 주고
    그동안 로딩이 되는 애니메이션을 이미지태그와 p태그로 넣어 애니메이션 되다가 영상이 로드되면 사라지게끔 해주었습니다.
*/
/*영상 container 불러오기, 로딩이미지 불러오기. */
var live_video = document.querySelector(".live-video");
var loading_conimg = document.querySelector(".loading_con > img");
var loading_con = document.querySelector(".loading_con");
loading_conimg.style.animationName = "LoadingRota";
loading_conimg.style.animationIterationCount = "4";
live_video.style.display = "block";

setTimeout(function(){
    loading_con.style.animationName = "unLoadLoadingRota";
},4000);
setTimeout(function(){
    live_video.style.animationName = "onLoadlive_video";
    loading_con.style.display = "none";
},5000);


