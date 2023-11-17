$(document).ready(function(){

  // 스크롤 이벤트
  var mHtml = $("html");
  var page = 1;
  var lastPage = $('.section').length;

  mHtml.animate({scrollTop : 0},);

  $(window).on("wheel", function(e) {
    if(mHtml.is(":animated")) return;

    // 스크롤 다운
    if(e.originalEvent.deltaY > 0) {
      if(page == lastPage) return;
      page++;

      // 내비게이션 표시 제거
      $('.gnb > li > a').removeClass('underline');

      // 헤더
      if(page > 1) {
        $('header').addClass('act');
      }

      // ABOUT
      if(page == 2) {
        $('.cloud2').delay(600).animate({'left':'18%','bottom':'0'},2800);
        $('.cloud3').animate({'right':'-4%'},2800);
        $('.cloud4').animate({'bottom':'-15%'},2400);
        $('.cloud5').animate({'left':'0','top':'0'},2600);
        $('.cloud6').animate({'right':'1%','top':'0'},2800);
        $('.cloud7').animate({'bottom':'0%'},2000);

        $('.show').delay(1200).animate({'opacity':'1','margin-bottom':'0'},1800,function(){
          $('#about h3').animate({'opacity':'1','margin-top':'0'},1800,'easeOutCubic');
          $('#about span').delay(1400).animate({'opacity':'1','margin-top':'0'},600,'easeOutCubic');
          
          $('.cloud2').addClass('cloud-move2');
          $('.cloud4').addClass('cloud-move3');
          $('.cloud5').addClass('cloud-move1');
          $('.cloud6').addClass('cloud-move2');
        })
      }

      $('.top-btn').on('click',function(){
        mHtml.animate({scrollTop : 0},300);
        page = 0;
        console.log(page)
        return false;
      });

    // 스크롤 업
    }else if(e.originalEvent.deltaY < 0) {
      if(page == 1) return;
      page--;
      
      $('.gnb > li > a').removeClass('underline');

      if(page == 1) {
        $('header').removeClass('act');
      }
    }
    var posTop = (page-1) * $(window).height();
    mHtml.animate({scrollTop : posTop});
  });

  // 헤더 로고
  $('header h1 img').hover(function(){
    $('header h1 img').attr('src','./images/logo_pk.png');
  },function(){
    $('header h1 img').attr('src','./images/logo_wh.png');
  });

  // 내비게이션
  let gnb = $('header .gnb li a');

  gnb.hover(function(){
    if($(this).hasClass('underline')){
      $(this).css({'background-size':'0% 100%'});
    }else{
      $(this).css({'background-size':'100% 100%'});
    }
  },function(){
    $(this).css({'background-size':'0% 100%'});
  });

  gnb.click(function(){
    $(this).parents().siblings().find('a').removeClass('underline');
    $(this).addClass('underline');
  });

  // 다국어 버튼 & 패밀리사이트
  // 버튼 마우스 오버시 색상변경
  $('.lang .selected').hover(function(){
    if($('.lang .selected i').hasClass('on')){
      $(this).find('span').animate({'color':'#ffffff'},300);
    }else{
      $(this).find('span').animate({'color':'#EE99AC'},300);
    }
  },function(){
    $(this).find('span').animate({'color':'#ffffff'},300);
  });

  // 버튼 클릭시 옵션 보임
  $('.selected').click(function() {
    var $options = $(this).siblings('.options');

    $options.find('ul').slideToggle(400);
    $('.lang .selected i').toggleClass('on');
  });

  // 옵션 선택 후 옵션 숨김
  $('.options ul li a').click(function() {
    var text = $(this).html();
    var $selected = $(this).closest('.options').siblings('.selected');

    $selected.find('span').html(text);
    $(this).closest('ul').hide();
    $('.lang .selected i').removeClass('on');
  });

  // 페이지의 다른 위치를 클릭하면 옵션 숨기기
  $(document).on('click', function(e) {
    var $clicked = $(e.target);
    
    if (!$clicked.parents().hasClass("lang")){
      $('.lang .options ul').hide();
      $('.lang .selected i').removeClass('on');
    }
  });

  // 배너 모달창
  const modal = `
    <div class="modal">
      <div class="inner">
        <a href="#"><img src="./images/poster1.jpg" alt="제니 홍보포스터"></a>
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

  // 퀵메뉴
  const sns_btn = $('#sns span');

  sns_btn.click(function(){
    if( $(this).find('img').hasClass('quick') == true){
      $('#sns').animate({'right':'-3%'},300);
      $(this).find('img').removeClass('quick');
    }else{
      $('#sns').animate({'right':'1%'},300);
      $(this).find('img').addClass('quick');
    }
    });

});