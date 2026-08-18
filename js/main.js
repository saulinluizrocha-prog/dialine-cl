$(document).ready(function () {
  $(".block5__footer").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: false,
    asNavFor: ".block5__header",
    dots: false,
    fade: true,
    arrows: false,
    touchMove: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          infinite: true,
          centerMode: true,
        },
      },
    ],
  });
  $(".block5__header").slick({
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    focusOnSelect: true,
    infinite: false,
    dots: false,
    variableWidth: true,
    asNavFor: ".block5__footer",
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: true,
          infinite: true,
          centerMode: true,
        },
      },
    ],
  });
  // $(".block7__slider").slick({
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   infinite: false,
  //   arrows: true,
  //   responsive: [
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: 2,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 640,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         infinite: true,
  //       },
  //     },
  //   ],
  // });
});

// $(".block7__slider").on('beforeChange', function() {
//   $('.text__scroll').removeClass('text__scroll--active');
// });

// document.querySelector('.block7__slider').addEventListener('click', function(evt) {
//   if (evt.target.classList.contains('text__scroll--toggle')) {
//     evt.target.parentElement.classList.toggle('text__scroll--active');
//   }
// });


 