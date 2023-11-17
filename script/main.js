$(document).ready(function(){
  
  // INTRO

  // 비디오 슬라이드
  var swiper = new Swiper(".introSlide", {
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
        $('#intro .custom-fraction .current').text('0'+(this.realIndex + 1));
      },
      slideChangeTransitionStart: function() {
        $('#intro .custom-fraction .current').text('0'+(this.realIndex + 1));
      },
    }
  });

  // 스크롤 표시
  function scrollDown(){
    $('.scroll-mark').animate({'bottom':'2%'},800).animate({'bottom':'3%'},800);
  }

  let TimerSD = setInterval(scrollDown,0);



  // 스크롤값 이벤트
  $(window).scroll(function(){
    let sPos = Math.ceil(($(this).scrollTop() / ($(document).height() - $(this).height())) * 100);
    console.log(sPos);

    if(sPos >= 5){
      $('header').addClass('act');
      $('.lang .options ul').css('background','rgba(23, 23, 23,0.9)');
    }else{
      $('header').removeClass('act');
      $('.lang .options ul').css('background','none');
    }

    // PROFILE
    if(sPos >= 30) {
      $('.img-box').animate({'opacity':'1','top':'50%'},700,'easeOutQuad',function(){
        $('.circle1').animate({'opacity':'1'},500);
        $('.circle2').animate({'opacity':'1'},500);
      });
      $('.profile-txt > span').delay(1200).animate({'height':'78px'},function(){
        $('.profile-name').animate({'width':'100%'});
        $('.profile-txt ul').delay(450).animate({'opacity':'1'},300);
      });
    }

    // ACTIVITIES
    if(sPos >= 45) {
      $('.act-cont:last-child .act-desc div:first-child ul').animate({'opacity':'1','top':'0'},600,'easeOutQuad');
      $('.act-cont:last-child .act-desc div:last-child h6').delay(500).animate({'opacity':'1','top':'0'},600,'easeOutQuad',function(){
        $('.act-cont:last-child .act-desc div:last-child ul').animate({'opacity':'1','top':'0'},600,'easeOutQuad');
      });
      $('.act-cont:last-child .act-img img:first-child').delay(1600).animate({'opacity':'1','bottom':'0'},600,function(){
        $('.act-cont:last-child .act-img img:last-child').animate({'opacity':'1'},800,'easeOutBounce');
      });
    }

    // ALBUM
    if(sPos >= 60) {
    $('.album-list').animate({'opacity':'1','bottom':'0'},700,'easeOutQuad',function(){
      $('.albumSlide .swiper-slide:first-child .album-cd').animate({'top':'-50%'},600,function(){
        $('.album-cont').fadeIn();
        $('.albumSlide .swiper-slide:first-child .album-cd').addClass('play');
        $('.album-cont .page-num').css('opacity','1')
      });
    });
    }
  });
});

//PROFILE

// 프로필 탭메뉴
let contMnu = document.querySelectorAll('.profile-list > li > a');

for(let i=0;i<contMnu.length;i++){
  console.log(contMnu[i]);

  contMnu[i].addEventListener('click',function(){
    console.log(contMnu[i].nextElementSibling);

    for(let j=0;j<contMnu.length;j++){
      contMnu[j].classList.remove('list-click');
      contMnu[i].classList.add('list-click');

      contMnu[j].nextElementSibling.classList.remove('fadeIn');
      contMnu[i].nextElementSibling.classList.add('fadeIn');
    }
  });

  contMnu[i].addEventListener('mouseover',function(){
    contMnu[i].classList.add('list-hover');
  });
  contMnu[i].addEventListener('mouseout',function(){
    contMnu[i].classList.remove('list-hover');
  });
}

// ACTIVITIES

$(document).ready(function(){
    let bar = $('.timeline-gage');
    let barMark = $('.time .mark');

  $('.time').click(function(){
    let k = $(this).index();
    console.log(k);

    // 타임라인 바
    if(k == 8){
      bar.animate({'height': 100 +'%'},400);
      $('.timeline-bar ol li:last-child img').attr('src','./images/crown_on.png');
    }else {
      bar.animate({'height': 10 * k + 4 + '%'},400);
      $('.timeline-bar ol li:last-child img').attr('src','./images/crown.png');
    }

    // 연도표시
    barMark.removeClass('markColor');
    barMark.eq(k-1).addClass('markColor');
    
    // 컨텐츠
    let actCont = $('.act-cont')
    let contLeft = $('.act-desc div:first-child ul')
    let contRight = $('.act-desc div:last-child h6')
    let contRight2 = $('.act-desc div:last-child ul')
    
    actCont.stop().fadeOut(400);
    actCont.eq(k-1).stop().fadeIn(400);
    actCont.eq(k-1).find(contLeft).animate({'opacity':'1','top':'0'},600,'easeOutQuad');
    actCont.eq(k-1).find(contRight).delay(600).animate({'opacity':'1','top':'0'},600,'easeOutQuad',function(){
      actCont.eq(k-1).find(contRight2).animate({'opacity':'1','top':'0'},600,'easeOutQuad');
    });
    actCont.eq(k-1).find('img:first-child').delay(1800).animate({'opacity':'1','bottom':'0'},600,function(){
      actCont.eq(k-1).find('img:last-child').animate({'opacity':'1'},800,'easeOutBounce');
    });
  });

  // ALBUM

  // 앨범리스트 슬라이드
  var swiper2 = new Swiper(".albumSlide", {
    slidesPerView: 5,
    spaceBetween: 10,
    navigation:{
      nextEl:'.arrow-next',
      prevEl:'.arrow-prev',
    },
    reverseDirection: true,
    breakpoints: {
      0 : {slidesPerView: 4},
      1115: {slidesPerView: 5}
    }
  });

  // 앨범 내용
  let albumList = $('.album-list .swiper-slide');
  let albumCd = $('.album-list .swiper-slide .album-cd');
  let albumNum = $('.album-list .swiper-slide').length;
  let pageFirst = $('.album-cont .page-num .first-page');
  let pageAll = $('.album-cont .page-num .all-page');
  let albumBox = $('.album-box');
  let i = 1;

  albumBox.hide();
  $('.album-box:first-child').stop().show();

  albumList.click(function(){
    i = $(this).index();
    console.log(i);

    albumCd.animate({'top':'0%'},300,function(){
      albumBox.fadeOut();
      albumCd.stop().removeClass('play');
      $('.album-cont .page-num').css('opacity','0')
    })

    albumCd.eq(i).animate({'top':'-50%'},600,function(){
      albumBox.eq(i).fadeIn();
      albumCd.eq(i).stop().addClass('play');
      $('.album-cont .page-num').css('opacity','1')
    })
    
    // 페이지 번호
    if(i < 9) {
      pageFirst.text('0' + (i + 1));
    }else {
      pageFirst.text(i + 1);
    }
  });

  // 페이지 번호
  pageAll.text(albumNum);

  // GALLERY

  $('.gallerySlide').each(function(index) {
    let t = $(this);
    t.addClass('swiper-' + index);
    let swiper = new Swiper( t, {
      autoplay: {
        delay: 0,
        pauseOnMouseEnter: true,
      },
      speed: 35000,
      loop: true,
      loopAdditionalSlides: 1,
      slidesPerView: 1,
      disableOnInteraction: false,
      })
  });

  // 이미지 모달창
  let galleryImg = $('.gallerySlide img');
  let imgNum = (galleryImg.length-7)/2;

  galleryImg.click(function(){
    let imgUrl = $(this).attr('src');
    let title = $(this).attr('alt');
    let imgN = $(this).parent().index()+1;

    console.log(imgUrl)

    let modal = `
      <div class="modal gallery-modal">
        <div class="modal-img">
          <div>
            <img src="${imgUrl}" alt="${title}">
            <span class="page">${imgN} / ${imgNum}</span>
            <i><img src="./images/arrow_left_02.png" alt="이전버튼"></i>
            <i><img src="./images/arrow_right_02.png" alt="다음버튼"></i>
          </div>
          <i><img src="./images/close.png" alt="닫기버튼"></i>
        </div>
        <ul class="img-index">
          <li><img src="./images/gallery_1.jpg" alt="제니"></li>
          <li><img src="./images/gallery_2.jpg" alt="지수"></li>
          <li><img src="./images/gallery_3.jpg" alt="제니"></li>
          <li><img src="./images/gallery_4.jpg" alt="블랙핑크"></li>
          <li><img src="./images/gallery_5.jpg" alt="지수"></li>
          <li><img src="./images/gallery_6.jpg" alt="리사"></li>
          <li><img src="./images/gallery_7.jpg" alt="블랙핑크"></li>
          <li><img src="./images/gallery_8.jpg" alt="제니"></li>
          <li><img src="./images/gallery_9.jpg" alt="리사"></li>
          <li><img src="./images/gallery_10.jpg" alt="로제"></li>
          <li><img src="./images/gallery_11.jpg" alt="로제"></li>
          <li><img src="./images/gallery_12.jpg" alt="제니"></li>
          <li><img src="./images/gallery_13.jpg" alt="제니"></li>
          <li><img src="./images/gallery_14.jpg" alt="로제"></li>
          <li><img src="./images/gallery_15.jpg" alt="리사"></li>
          <li><img src="./images/gallery_16.jpg" alt="로제"></li>
          <li><img src="./images/gallery_17.jpg" alt="리사"></li>
          <li><img src="./images/gallery_18.jpg" alt="지수"></li>
          <li><img src="./images/gallery_19.jpg" alt="지수"></li>
          <li><img src="./images/gallery_20.jpg" alt="블랙핑크"></li>
        </ul>
      </div>
    `;

    $('body').append(modal);

    // 좌우 버튼
    let leftBtn = $('.modal-img > div i:first-of-type');
    let rightBtn = $('.modal-img > div i:last-of-type');

    function moveLeft(){
      if(imgN == 1){
        imgN = imgNum;
      }else{
        imgN--;
      }
      $('.modal-img .page').text(imgN+' / '+imgNum);
      $('.modal-img > div > img').attr('src','./images/gallery_'+imgN+'.jpg');
    }
    
    function moveRight(){
      if(imgN == imgNum){
        imgN = 1;
      }else{
        imgN++;
      }
      $('.modal-img .page').text(imgN+' / '+imgNum);
      $('.modal-img > div > img').attr('src','./images/gallery_'+imgN+'.jpg');
    }

    // 닫기버튼
    $('.modal-img > i').click(function(){
      $('.modal').fadeOut('fast');
    });
    // 좌측버튼
    leftBtn.click(function(){
      moveLeft();
      imgCheck();
    });
    // 우측버튼
    rightBtn.click(function(){
      moveRight();
      imgCheck();
    });

    //썸네일 리스트 표시
    function imgCheck(){
      for(let j=0;j<imgNum;j++){
        thumbList[j].style.border='none';
        thumbList[j].style.filter='none';
      }
      thumbList[imgN-1].style.border='3px solid var(--main-color)';
      thumbList[imgN-1].style.filter='brightness(0.7)';
    }

    // 썸네일 리스트
    let thumbList = $('.img-index li img')
    
    thumbList[imgN-1].style.border='3px solid var(--main-color)';
    thumbList[imgN-1].style.filter='brightness(0.7)';
    
    thumbList.click(function(){
      let thumbNum = $(this).parent().index() + 1;
      let thumbUrl= $(this).attr('src');
      console.log(thumbNum);

      thumbList.css('border','none');
      $(this).css({'border':'3px solid var(--main-color)','filter':'brightness(0.7)'});

      $('.modal-img > div > img').attr('src',thumbUrl);
      $('.modal-img .page').text(thumbNum+' / '+imgNum);

      leftBtn.click(function(){
        if(thumbNum == 1){
          thumbNum = imgNum;
        }else{
          thumbNum--;
        }
        $('.modal-img .page').text(thumbNum+' / '+imgNum);
        $('.modal-img > div > img').attr('src','./images/gallery_'+thumbNum+'.jpg');
        imgCheck()
      });

      rightBtn.click(function(){
        if(thumbNum == imgNum){
          thumbNum = 1;
        }else{
          thumbNum++;
        }
        $('.modal-img .page').text(thumbNum+' / '+imgNum);
        $('.modal-img > div > img').attr('src','./images/gallery_'+thumbNum+'.jpg');
        imgCheck()
      });

      function imgCheck(){
        for(let j=0;j<imgNum;j++){
          thumbList[j].style.border='none';
          thumbList[j].style.filter='none';
        }
        thumbList[thumbNum-1].style.border='3px solid var(--main-color)';
        thumbList[thumbNum-1].style.filter='brightness(0.7)';
      }
    });

  });
});

  // NEWS

  // 뉴스 슬라이드
  const slide = document.querySelector('.carousel-wrap');
  const card = document.querySelectorAll('.carousel .card');
  const prevBtn = document.querySelector('#news .inner-box i:first-of-type');
  const nextBtn = document.querySelector('#news .inner-box i:last-of-type');

  const cardNum = card.length;
  const cardCount = 3;
  const cardWidth = 32;
  const cardMargin = 2;

  let count = 0;

  slide.style.width = (cardWidth+cardMargin)*cardNum-cardMargin+'%';

  function slideMove(m){
    slide.style.left = (cardWidth+cardMargin)*-m+'%';
    count = m;
    console.log(slide.style.left);
    console.log(count);
  }

  // 이전버튼
  prevBtn.addEventListener('click', function(){
    if(count > 0){
      slideMove(count - 1);
    }
  });

  // 다음버튼
  nextBtn.addEventListener('click', function(){
    if(count < cardNum-cardCount){
      slideMove(count + 1);
    }
  });

$(document).ready(function(){
  // 이미지 세로 슬라이드

  // 컨트롤버튼
  let ctrlBtn = $('.ctrl-btn li');

  let s = ctrlBtn.index();
  console.log(s);

  ctrlBtn.click(function(){
    s = $(this).index();
    console.log(s);
    s = -(s * 100);
    console.log(s);

    $(this).parent().siblings().animate({'top':s+'%'},300);
    $(this).siblings().removeClass('ctrl');
    $(this).addClass('ctrl');
  });

});