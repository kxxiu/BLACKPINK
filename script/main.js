
/////intro

// jQuery
$(document).ready(function(){
  
  //인트로 메인 슬라이드
  var swiper = new Swiper(".mainSlide", {
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    navigation:{
      nextEl:'.swiper-button-next',
      prevEl:'.swiper-button-prev',
    },
    loop: true,
    on: {
      init: function() {
        $('.custom-fraction .current').text('0'+(this.realIndex + 1));
      },
      slideChangeTransitionStart: function() {
        $('.custom-fraction .current').text('0'+(this.realIndex + 1));
      },
    }
  });

  // intro 하단 스크롤 표시
  function scrollDown(){
    $('.scroll-btn span').animate({'bottom':'67px'},800).animate({'bottom':'60px'},800);
    $('.scroll-btn img').animate({'bottom':'22px'},800).animate({'bottom':'15px'},800);
  }

  let Updown = setInterval(scrollDown,1600);

});


/////ABOUT

  gsap.set('.about-main', {position:'fixed', background:'#171717', width:'100%', maxWidth:'100%', height:'100%', top:0, left:'50%', x:'-50%'})
  gsap.set('.scrollDist', {width:'100%', height:'200%'})
  gsap.timeline({scrollTrigger:{trigger:'.scrollDist', start:'top top', end:'bottom bottom', scrub:2}})
      .fromTo('.cloud1', {y:0},{y:-940}, 0)
      .fromTo('.cloud2', {y:-150},{y:-900}, 0)
      .fromTo('.cloud3', {y:-50},{y:-900}, 0)
      .fromTo('.cloud4', {y:400},{y:-900}, 0)
      .fromTo('.jisooBg', {y:0},{y:-950}, 0)
      .fromTo('.jennieBg', {x: 270, y:50},{y:-950}, 0)
      .fromTo('.roseBg', {x: 540, y:100},{y:-750}, 0)
      .fromTo('.lisaBg', {x: 530, y:90},{y:-850}, 0)


///// PROFILE

// 프로필 탭메뉴
  let contMnu = document.querySelectorAll('.tab-cont > li > a');

  for(let i=0;i<contMnu.length;i++){

    console.log(contMnu[i]);

    contMnu[i].addEventListener('click',function(){

      console.log(contMnu[i].nextElementSibling);

      for(let j=0;j<contMnu.length;j++){
      contMnu[j].nextElementSibling.style.display='none';
      contMnu[i].nextElementSibling.style.display='block';
      }

    // 메뉴 선택 표시
    $(this).addClass('check').parent().siblings().find('a').removeClass('check');
    });
  }

  // test

  // jQuery(document).ready(function($){
    var timelines = $('.cd-horizontal-timeline'),
      eventsMinDistance = 60;
  
    (timelines.length > 0) && initTimeline(timelines);
  
    function initTimeline(timelines) {
      timelines.each(function(){
        var timeline = $(this),
          timelineComponents = {};
        //cache timeline components 
        timelineComponents['timelineWrapper'] = timeline.find('.events-wrapper');
        timelineComponents['eventsWrapper'] = timelineComponents['timelineWrapper'].children('.events');
        timelineComponents['fillingLine'] = timelineComponents['eventsWrapper'].children('.filling-line');
        timelineComponents['timelineEvents'] = timelineComponents['eventsWrapper'].find('a');
        timelineComponents['timelineDates'] = parseDate(timelineComponents['timelineEvents']);
        timelineComponents['eventsMinLapse'] = minLapse(timelineComponents['timelineDates']);
        timelineComponents['timelineNavigation'] = timeline.find('.cd-timeline-navigation');
        timelineComponents['eventsContent'] = timeline.children('.events-content');
  
        //assign a left postion to the single events along the timeline
        setDatePosition(timelineComponents, eventsMinDistance);
        //assign a width to the timeline
        var timelineTotWidth = setTimelineWidth(timelineComponents, eventsMinDistance);
        //the timeline has been initialize - show it
        timeline.addClass('loaded');
  
        //detect click on the next arrow
        timelineComponents['timelineNavigation'].on('click', '.next', function(event){
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'next');
        });
        //detect click on the prev arrow
        timelineComponents['timelineNavigation'].on('click', '.prev', function(event){
          event.preventDefault();
          updateSlide(timelineComponents, timelineTotWidth, 'prev');
        });
        //detect click on the a single event - show new event content
        timelineComponents['eventsWrapper'].on('click', 'a', function(event){
          event.preventDefault();
          timelineComponents['timelineEvents'].removeClass('selected');
          $(this).addClass('selected');
          updateOlderEvents($(this));
          updateFilling($(this), timelineComponents['fillingLine'], timelineTotWidth);
          updateVisibleContent($(this), timelineComponents['eventsContent']);
        });
  
        //on swipe, show next/prev event content
        timelineComponents['eventsContent'].on('swipeleft', function(){
          var mq = checkMQ();
          ( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'next');
        });
        timelineComponents['eventsContent'].on('swiperight', function(){
          var mq = checkMQ();
          ( mq == 'mobile' ) && showNewContent(timelineComponents, timelineTotWidth, 'prev');
        });
  
        //keyboard navigation
        $(document).keyup(function(event){
          if(event.which=='37' && elementInViewport(timeline.get(0)) ) {
            showNewContent(timelineComponents, timelineTotWidth, 'prev');
          } else if( event.which=='39' && elementInViewport(timeline.get(0))) {
            showNewContent(timelineComponents, timelineTotWidth, 'next');
          }
        });
      });
    }
  
    function updateSlide(timelineComponents, timelineTotWidth, string) {
      //retrieve translateX value of timelineComponents['eventsWrapper']
      var translateValue = getTranslateValue(timelineComponents['eventsWrapper']),
        wrapperWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', ''));
      //translate the timeline to the left('next')/right('prev') 
      (string == 'next') 
        ? translateTimeline(timelineComponents, translateValue - wrapperWidth + eventsMinDistance, wrapperWidth - timelineTotWidth)
        : translateTimeline(timelineComponents, translateValue + wrapperWidth - eventsMinDistance);
    }
  
    function showNewContent(timelineComponents, timelineTotWidth, string) {
      //go from one event to the next/previous one
      var visibleContent =  timelineComponents['eventsContent'].find('.selected'),
        newContent = ( string == 'next' ) ? visibleContent.next() : visibleContent.prev();
  
      if ( newContent.length > 0 ) { //if there's a next/prev event - show it
        var selectedDate = timelineComponents['eventsWrapper'].find('.selected'),
          newEvent = ( string == 'next' ) ? selectedDate.parent('li').next('li').children('a') : selectedDate.parent('li').prev('li').children('a');
        
        updateFilling(newEvent, timelineComponents['fillingLine'], timelineTotWidth);
        updateVisibleContent(newEvent, timelineComponents['eventsContent']);
        newEvent.addClass('selected');
        selectedDate.removeClass('selected');
        updateOlderEvents(newEvent);
        updateTimelinePosition(string, newEvent, timelineComponents, timelineTotWidth);
      }
    }
  
    function updateTimelinePosition(string, event, timelineComponents, timelineTotWidth) {
      //translate timeline to the left/right according to the position of the selected event
      var eventStyle = window.getComputedStyle(event.get(0), null),
        eventLeft = Number(eventStyle.getPropertyValue("left").replace('px', '')),
        timelineWidth = Number(timelineComponents['timelineWrapper'].css('width').replace('px', '')),
        timelineTotWidth = Number(timelineComponents['eventsWrapper'].css('width').replace('px', ''));
      var timelineTranslate = getTranslateValue(timelineComponents['eventsWrapper']);
  
          if( (string == 'next' && eventLeft > timelineWidth - timelineTranslate) || (string == 'prev' && eventLeft < - timelineTranslate) ) {
            translateTimeline(timelineComponents, - eventLeft + timelineWidth/2, timelineWidth - timelineTotWidth);
          }
    }
  
    function translateTimeline(timelineComponents, value, totWidth) {
      var eventsWrapper = timelineComponents['eventsWrapper'].get(0);
      value = (value > 0) ? 0 : value; //only negative translate value
      value = ( !(typeof totWidth === 'undefined') &&  value < totWidth ) ? totWidth : value; //do not translate more than timeline width
      setTransformValue(eventsWrapper, 'translateX', value+'px');
      //update navigation arrows visibility
      (value == 0 ) ? timelineComponents['timelineNavigation'].find('.prev').addClass('inactive') : timelineComponents['timelineNavigation'].find('.prev').removeClass('inactive');
      (value == totWidth ) ? timelineComponents['timelineNavigation'].find('.next').addClass('inactive') : timelineComponents['timelineNavigation'].find('.next').removeClass('inactive');
    }
  
    function updateFilling(selectedEvent, filling, totWidth) {
      //change .filling-line length according to the selected event
      var eventStyle = window.getComputedStyle(selectedEvent.get(0), null),
        eventLeft = eventStyle.getPropertyValue("left"),
        eventWidth = eventStyle.getPropertyValue("width");
      eventLeft = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', ''))/2;
      var scaleValue = eventLeft/totWidth;
      setTransformValue(filling.get(0), 'scaleX', scaleValue);
    }
  
    function setDatePosition(timelineComponents, min) {
      for (i = 0; i < timelineComponents['timelineDates'].length; i++) { 
          var distance = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][i]),
            distanceNorm = Math.round(distance/timelineComponents['eventsMinLapse']) + 2;
          timelineComponents['timelineEvents'].eq(i).css('left', distanceNorm*min+'px');
      }
    }
  
    function setTimelineWidth(timelineComponents, width) {
      var timeSpan = daydiff(timelineComponents['timelineDates'][0], timelineComponents['timelineDates'][timelineComponents['timelineDates'].length-1]),
        timeSpanNorm = timeSpan/timelineComponents['eventsMinLapse'],
        timeSpanNorm = Math.round(timeSpanNorm) + 4,
        totalWidth = timeSpanNorm*width;
      timelineComponents['eventsWrapper'].css('width', totalWidth+'px');
      updateFilling(timelineComponents['timelineEvents'].eq(0), timelineComponents['fillingLine'], totalWidth);
    
      return totalWidth;
    }
  
    function updateVisibleContent(event, eventsContent) {
      var eventDate = event.data('date'),
        visibleContent = eventsContent.find('.selected'),
        selectedContent = eventsContent.find('[data-date="'+ eventDate +'"]'),
        selectedContentHeight = selectedContent.height();
  
      if (selectedContent.index() > visibleContent.index()) {
        var classEnetering = 'selected enter-right',
          classLeaving = 'leave-left';
      } else {
        var classEnetering = 'selected enter-left',
          classLeaving = 'leave-right';
      }
  
      selectedContent.attr('class', classEnetering);
      visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
        visibleContent.removeClass('leave-right leave-left');
        selectedContent.removeClass('enter-left enter-right');
      });
      eventsContent.css('height', selectedContentHeight+'px');
    }
  
    function updateOlderEvents(event) {
      event.parent('li').prevAll('li').children('a').addClass('older-event').end().end().nextAll('li').children('a').removeClass('older-event');
    }
  
    function getTranslateValue(timeline) {
      var timelineStyle = window.getComputedStyle(timeline.get(0), null),
        timelineTranslate = timelineStyle.getPropertyValue("-webkit-transform") ||
               timelineStyle.getPropertyValue("-moz-transform") ||
               timelineStyle.getPropertyValue("-ms-transform") ||
               timelineStyle.getPropertyValue("-o-transform") ||
               timelineStyle.getPropertyValue("transform");
  
          if( timelineTranslate.indexOf('(') >=0 ) {
            var timelineTranslate = timelineTranslate.split('(')[1];
          timelineTranslate = timelineTranslate.split(')')[0];
          timelineTranslate = timelineTranslate.split(',');
          var translateValue = timelineTranslate[4];
          } else {
            var translateValue = 0;
          }
  
          return Number(translateValue);
    }
  
    function setTransformValue(element, property, value) {
      element.style["-webkit-transform"] = property+"("+value+")";
      element.style["-moz-transform"] = property+"("+value+")";
      element.style["-ms-transform"] = property+"("+value+")";
      element.style["-o-transform"] = property+"("+value+")";
      element.style["transform"] = property+"("+value+")";
    }
  
    //based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript
    function parseDate(events) {
      var dateArrays = [];
      events.each(function(){
        var dateComp = $(this).data('date').split('/'),
          newDate = new Date(dateComp[2], dateComp[1]-1, dateComp[0]);
        dateArrays.push(newDate);
      });
        return dateArrays;
    }
  
    function parseDate2(events) {
      var dateArrays = [];
      events.each(function(){
        var singleDate = $(this),
          dateComp = singleDate.data('date').split('T');
        if( dateComp.length > 1 ) { //both DD/MM/YEAR and time are provided
          var dayComp = dateComp[0].split('/'),
            timeComp = dateComp[1].split(':');
        } else if( dateComp[0].indexOf(':') >=0 ) { //only time is provide
          var dayComp = ["2000", "0", "0"],
            timeComp = dateComp[0].split(':');
        } else { //only DD/MM/YEAR
          var dayComp = dateComp[0].split('/'),
            timeComp = ["0", "0"];
        }
        var	newDate = new Date(dayComp[2], dayComp[1]-1, dayComp[0], timeComp[0], timeComp[1]);
        dateArrays.push(newDate);
      });
        return dateArrays;
    }
  
    function daydiff(first, second) {
        return Math.round((second-first));
    }
  
    function minLapse(dates) {
      //determine the minimum distance among events
      var dateDistances = [];
      for (i = 1; i < dates.length; i++) { 
          var distance = daydiff(dates[i-1], dates[i]);
          dateDistances.push(distance);
      }
      return Math.min.apply(null, dateDistances);
    }
  
    /*
      How to tell if a DOM element is visible in the current viewport?
      http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
    */
    function elementInViewport(el) {
      var top = el.offsetTop;
      var left = el.offsetLeft;
      var width = el.offsetWidth;
      var height = el.offsetHeight;
  
      while(el.offsetParent) {
          el = el.offsetParent;
          top += el.offsetTop;
          left += el.offsetLeft;
      }
  
      return (
          top < (window.pageYOffset + window.innerHeight) &&
          left < (window.pageXOffset + window.innerWidth) &&
          (top + height) > window.pageYOffset &&
          (left + width) > window.pageXOffset
      );
    }
  
    function checkMQ() {
      //check if mobile or desktop device
      return window.getComputedStyle(document.querySelector('.cd-horizontal-timeline'), '::before').getPropertyValue('content').replace(/'/g, "").replace(/"/g, "");
    }
  // });

  $(document).ready(function(){

// ACTIVITIES
    let fill = 
    $('.timeline-bar ol li a').click(function(){
      $()
    });




  //앨범 레코드이미지 효과
    let r = 360
    function record(){
      $('#album > img').animate({'rotate':r+'deg'},3000,'easeInOutCubic').animate({'rotate':r*2+'deg'},3000,'easeInOutCubic');
    }

  let recordEffect = setInterval(record,0);


//앨범리스트 슬라이드
  var swiper2 = new Swiper(".albumList", {
    slidesPerView: 5,
    spaceBetween: 5,
    direction: 'vertical',
    centeredSlides: true,
    loop: true,
  });

  //리스트 클릭시 효과
  $('.albumList .swiper-slide img').click(function(){
    $(this).parent().siblings().find('img').css({'border':'none','filter':'none'});
    $(this).css({'filter':'brightness(0.8)','border':'2px solid #fff'});
  });

  //리스트 클릭시 화면전환
  let listNum = 1; //초기값


  //페이지번호
  let pageNum = document.querySelector('#album .pageNum');

  // 좌우 버튼
  let albumLeft = document.querySelectorAll('.arrow-prev');
  let albumRight = document.querySelectorAll('.arrow-next');


  //페이지번호 출력
  pageNum.innerHTML=`<span>0${listNum} /10`; //10이하는 0 붙이기!


   // 앨범 페이지번호
  let a = 1;
  let albumList = $('.albumList .swiper-slide');
  let albumNum =$('.albumList .swiper-slide').length;
  let albumPage = $('#album .pageNum');
  let i=0;
  let albumC = $('.album-cont');

  const leftBtn = $('.arrow-prev');
  const rightBtn = $('.arrow-next');

  albumList.click(function(){
  i = $(this).index()-5;
  console.log(i);
  albumC.hide(); //보이는콘텐츠 모두 숨기고
  albumC.eq(i).show(); //해당 번호에 맞는 콘텐츠 보이게
  });
  
  albumPage.innerHTML=`<span>0${i} /</span> 0${albumNum}`;

  leftBtn.click(function(){
    if(i==0){
      i=9;
    } else {
      i--;
    }
    albumPage.innerHTML=`<span>0${i} /</span> 0${albumNum}`;
    albumC.hide(); //보이는콘텐츠 모두 숨기고
    albumC.eq(i).show(); //해당 번호에 맞는 콘텐츠 보이게
})

rightBtn.click(function(){
  if(i==9){
    i=0;
  }else{
    i++;
  }
  albumPage.innerHTML=`<span>0${i} /</span> 0${albumNum}`;
  albumC.hide(); //보이는콘텐츠 모두 숨기고
  albumC.eq(i).show(); //해당 번호에 맞는 콘텐츠 보이게
});

//***** GALLERY
//슬라이드
  // var swiper = new Swiper(".gallerySlide", {
  //   slidesPerView: 1,
  //   spaceBetween: 0,
  //   freeMode: true,
  //   loop:true,
  //   autoplay: {     
  //     delay: 1000,
  //   },
  // });

      // 멈춤
    // $('.gallerySlide').hover(function(){
    //   $('.gallerySlide').autoplay.stop();
    // }, function(){
    //   $('.gallerySldie').autoplay.start();
    // });

  $('.gallerySlide').each(function(index) {
    let t = $(this);
    t.addClass('swiper-' + index);
    let swiper = new Swiper( t, {
      autoplay: {
        delay: 0,
      },
      speed: 30000,
      loop: true,
      loopAdditionalSlides: 1,
      slidesPerView: 1,
      disableOnInteraction: false
    });
  });

//이미지 클릭시 모달창
  let galleryImg = $('.photo div img');

  galleryImg.click(function(){
    let imgUrl = $(this).attr('src');
    console.log(imgUrl);
    
    let imgNum = $('.photo div img').length;
    console.log(imgNum);
    
    let imgN = $(this).index()+1;
  

  let modal = `
    <div class="modal gallery-modal">
      <div>
        <img src=${imgUrl} alt="이미지" class="main-img">
        <span class="page">${imgN}/12</span>
        <i><img src="../images/close.png" alt="닫기버튼"></i>
        <i><img src="../images/arrowLeft2.png" alt="이전버튼"></i>
        <i><img src="../images/arrowRight2.png" alt="다음버튼"></i>
      </div>
    </div>
    `;

  $('body').append(modal);

  function moveLeft(){
    if(imgN==1){
      imgN==12;
    }else{
      imgN--;
    }
    $('.gallery-modal .page').text(imgN+'/12');

    $('.gallery-modal .main-img').attr('src','./images/photo0'+imgN+'.jpg');

      // if(imgN<10){
      //   $(this).text('0'+imgN)
      // }
  }
  
  function moveRight(){
    if(imgN==imgNum){
      imgN=1;
    }else{
      imgN++;
    }
    $('.gallery-modal .page').html(imgN+'/12');
    $('.gallery-modal .main-img').attr('src','./images/photo0'+imgN+'.jpg');

  }

  // 닫기버튼
  $('.gallery-modal i:first-of-type img').click(function(){
    $('.modal').fadeOut('fast');
  });
  // 좌측버튼
  $('.gallery-modal i:nth-of-type(2) img').click(function(){
    moveLeft();
  });
  //우측버튼
  $('.gallery-modal i:first-of-type img').click(function(){
    moveRight();
  });
  return false;
  });




  //랜덤 이미지
  let img = ['photo01', 'photo02', 'photo03', 'photo04'];
  let ran = Math.ceil(Math.random()*4-1);
  
  document.getElementById('n-img').innerHTML=`<a href="#" title=배너><img src="./images/${img[ran]}.jpg" alt="배너"></a>`

});

