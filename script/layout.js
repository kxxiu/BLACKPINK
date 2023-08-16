//layout.js

$(document).ready(function(){

//스크롤 레이아웃
  var mHtml = $("html");
  var page = 1;
  var lastPage = $('.section').length;

  mHtml.animate({scrollTop : 0},6);

  $(window).on("wheel", function(e) {
    // 스크롤효과가 쌓이지 않도록 정지
    if(mHtml.is(":animated")) return;

    // 하단스크롤
    if(e.originalEvent.deltaY > 0) {

    // 마지막페이지에 스크롤 정지
    if(page == lastPage) return;
    page++;

    // 헤더 배경, 로고 색상 변경
    if(page > 1) {
      $('header').addClass('act')
      $('header h1 img').attr('src','./images/logo_pk.png');
    }

    //2. ABOUT
    if(page == 2) {
      //제목
      $('#about .article h4').addClass('flicker-in-1');
    }

    if(page == 3) {
      $('.about-txt').animate({'opacity':'1','bottom':'1%'},1600,'easeOutQuad');
      // $('.about-txt span').delay(400).animate({'opacity':'1','top':'0'},1000,'easeOutQuad');
      // $('.about-txt h5').delay(800).animate({'opacity':'1','top':'0','color':'#EE99AC'},1000,'easeOutQuad');
      // $('.about-txt p:first-of-type').delay(1200).animate({'opacity':'1','top':'0'},1000,'easeOutQuad');
    }
      
    //3.PROFILE
    if( page == 4) {
      $('#about').css('display','hidden');
      // 배경문구
      $('#profile > article span').animate({'opacity':'1','top':'28%'},1000,'easeOutQuad');
      // 이미지
      $('#profile .img-box img').delay(300).animate({'opacity':'1','top':'0'},1000,'easeOutQuad');
      //설명
      $('.tab-txt').delay(600).animate({'opacity':'1','height':'285px'},900);

    }

  //상단스크롤시
    } else if(e.originalEvent.deltaY < 0) {
        if(page == 1) return;
        page--;
        // 헤더표시제거
        if(page == 1) {
          $('header').removeClass('act');
          $('header h1 img').attr('src','./images/logo_wh.png');
        }
    }
    var posTop =(page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop});
  });

//배너모달창
  const modal = `
    <div class="modal">
      <div class="inner">
        <a href="#" title=""><img src="./images/tour_poster_austraila.jpg" alt=""></a>
        <p>
          <input type="checkbox" id="checkbox">
          <label for="checkbox">오늘 하루 열지 않음</label>
          <i class=material-icons id=close-btn>close</i>
        </p>
      </div>
    </div>
  `;

  $('body').append(modal);

  let ch = $('.modal #checkbox');
  
  if($.cookie('popup')=='none'){
    $('.modal').hide();
  }

  function closeModal(){
    if(ch.is(':checked')){
      $.cookie('popup','none',{expires:1, path:'/'});
    }
    $('.modal').delay(200).hide();
  }

  $('.modal #close-btn').click(function(){
    closeModal();
  });


  /////HEADER

//헤더 로고 변경
  $('header h1 img').hover(function(){
    $('header h1 img').attr('src','./images/logo_pk.png');
  },function(){
    $('header h1 img').attr('src','./images/logo_wh.png');
  });

//내비게이션 메뉴 효과
  let gnb = $('.gnb > li > a');

  gnb.hover(function(){
    if($(this).hasClass('gnb-line')){
    $(this).css({'background-size':'0% 100%'});
    }else{
      $(this).css({'background-size':'100% 100%'});
    }
  },function(){
      $(this).css({'background-size':'0% 100%'});
  });

  gnb.click(function(){
    $(this).parents().siblings().find('a').removeClass('gnb-line');
    $(this).addClass('gnb-line');
  });

//다국어 버튼 효과
  //버튼 마우스 오버시 색상변경
  $('.lang .selected').hover(function(){
    if($('.lang .selected i').hasClass('on')){
      $(this).find('span').animate({'color':'#ffffff'},300);
    }else{
      $(this).find('span').animate({'color':'#EE99AC'},300);
    }
  },function(){
    $(this).find('span').animate({'color':'#ffffff'},300);
  });

  //버튼 클릭시 옵션 보임
  $('.lang .selected').click(function() {
    var $options = $(this).siblings('.options');
    $options.find('> ul').slideToggle(400);
    $('.lang .selected i').toggleClass('on');
  });

  //옵션 선택 및 선택 후 옵션 숨김
  $('.lang .options ul li a').click(function() {
    var text = $(this).html();
    var $selected = $(this).closest('.options').siblings('.selected');
    $selected.find('span').html(text);
    
    $(this).closest('ul').hide();
    $('.lang .selected i').removeClass('on');
  });

  //페이지의 다른 위치를 클릭하면 옵션 숨기기
  $(document).bind('click', function(e) {
    var $clicked = $(e.target);
    if (!$clicked.parents().hasClass("lang")){
      $('.lang .options ul').hide();
      $('.lang .selected i').removeClass('on');
    }
  });

//sns 퀵메뉴
  const sns_btn = $('#sns span');

  sns_btn.click(function(){

    if($(this).find('img').hasClass('quick')==true){
      $('#sns').animate({'right':'-3%'},300);
      $(this).find('img').removeClass('quick');
    }else{
      $('#sns').animate({'right':'1%'},300);
      $(this).find('img').addClass('quick');
    }

    });






});