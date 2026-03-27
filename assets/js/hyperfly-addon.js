(function ($) {
  "use strict";

  var WidgetDefaultHandler = function ($scope) {

    AOS.init();

    if ($(".topbar-four__info__language").length) {
      $('.topbar-four__info__language > a').on('click', function (e) {
        e.preventDefault();
        $('.topbar-four__info__language__dropdown').slideToggle();
      });
    }
    if ($(".topbar-four__info__currency").length) {
      $('.topbar-four__info__currency > a').on('click', function (e) {
        e.preventDefault();
        $('.topbar-four__info__currency__dropdown').slideToggle();
      });
    }

    // Sidebar Nav Active Scripts
    $scope.find('.service-sidebar__nav li.current_page_item').addClass('current');

    // Comparison
    var $divisor = $scope.find($("#gallery-one__compare__divisor")),
      $handle = $scope.find($("#gallery-one__compare__handle")),
      $slider = $scope.find($("#gallery-one__compare__slider"));

    function moveDivisor() {
      if ($handle.length && $slider.length && $divisor.length) {
        $handle.css('left', $slider.val() + "%");
        $divisor.css('width', $slider.val() + "%");
        checkDivisorWidth();
      }
    }

    function checkDivisorWidth() {
      var widthPercentage = parseFloat($divisor.width()) / $divisor.parent().width() * 100;
      var $comparisonText = $('.gallery-one__compare__text');

      if (widthPercentage < 7) {
        $comparisonText.addClass('af_hide');
      } else {
        $comparisonText.removeClass('af_hide');
      }

      if (widthPercentage > 93) {
        $comparisonText.addClass('bf_hide');
      } else {
        $comparisonText.removeClass('bf_hide');
      }
    }
    if ($handle.length && $slider.length && $divisor.length) {
      moveDivisor();
    }
    $slider.on('input', moveDivisor);

    // Portfolio 02 Hover
    $(document).ready(function () {
      $('.portfolio-two__wrapper .portfolio-two__item').on("mousemove", function () {
        $('.portfolio-two__wrapper .portfolio-two__item').removeClass("active");
        $(this).addClass("active");
      });
    });

    // Service 02 Hover Image
    /*const link = document.querySelectorAll('.service-two__item');
    const linkHoverReveal = document.querySelectorAll('.service-two__item__image');
    const linkImages = document.querySelectorAll('.service-two__item__image img');
    for (let i = 0; i < link.length; i++) {
      link[i].addEventListener('mousemove', (e) => {
        linkHoverReveal[i].style.opacity = 1;
        linkHoverReveal[i].style.transform = `translate(-100%, -50% ) rotate(14deg)`;
        linkImages[i].style.transform = 'scale(1, 1)';
        linkHoverReveal[i].style.left = e.clientX + "px";
      })
      link[i].addEventListener('mouseleave', (e) => {
        linkHoverReveal[i].style.opacity = 0;
        linkHoverReveal[i].style.transform = `translate(-50%, -50%) rotate(-14deg)`;
        linkImages[i].style.transform = 'scale(0.8, 0.8)';
      })
    }*/
    
    // Feature 04 Tab 
    $(document).ready(function () {
        function openfeature(evt, featureName) {
            // Hide all tab contents
            $(".feature_1TabContent").hide().removeClass('active');

            // Remove active class from all tab links
            $('.feature-four__wrapper .item.active').removeClass('active');

            // Show the selected tab content and add active class to the current tab
            $("#" + featureName).show().addClass("active");
            $(evt.currentTarget).closest('.item').addClass("active");
        }
        if ($('.feature-four__wrapper').length > 0) {
            // Attach mouseenter event to tab links
            $('.feature-four__item').on('mouseenter', function (evt) {
                var featureName = $(this).closest('.item').data('feature');
                openfeature(evt, featureName);
            });
        }
    });

    // slick slider
    let hyperflyslickCarousel = $scope.find(".hyperfly-slick__carousel");
    if (hyperflyslickCarousel.length) {
      hyperflyslickCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let hyperflyslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let hyperflyslickCarouselCounter = $scope.find(".hyperfly-slick__custome-counter");
    if (hyperflyslickCarouselCounter.length) {
      hyperflyslickCarouselCounter.each(function () {
        let elm = $(this);
        let options = elm.data("slick-options");
        let currentSlide;
        let slidesCount;
        let sliderCounter = document.createElement('div');
        sliderCounter.classList.add('hyperfly-slick__counter');

        let updateSliderCounter = function (slick, currentIndex) {
          currentSlide = slick.slickCurrentSlide() + 1;
          slidesCount = slick.slideCount;
          $(sliderCounter).html('<span class="hyperfly-slick__counter__active">' + currentSlide + '</span>' + '' + '<span>' + slidesCount + '</span>')
        };
        elm.on('init', function (event, slick) {
          elm.append(sliderCounter);
          updateSliderCounter(slick);
        });
        elm.on('afterChange', function (event, slick, currentSlide) {
          updateSliderCounter(slick, currentSlide);
        });

        let hyperflyslickCarousel = elm.slick(
          "object" === typeof options ? options : JSON.parse(options)
        );

      });
    }

    // service one cursor move effect
    $(".custom-cursor-two-hover").on("mousemove", function (e) {
      var cursor = $(".custom-cursor-two");
      var posX = e.pageX - $(this).offset().left - cursor.width() / 2;
      var posY = e.pageY - $(this).offset().top - cursor.height() / 2;

      cursor.css({
        left: posX + "px",
        top: posY + "px"
      });
    });

    // mailchimp form
    if ($scope.find(".mc-form").length) {
      $scope.find(".mc-form").each(function () {
        var Self = $(this);
        var mcURL = Self.data("url");
        var mcResp = Self.parent().find(".mc-form__response");

        Self.ajaxChimp({
          url: mcURL,
          callback: function (resp) {
            // appending response
            mcResp.append(function () {
              return '<p class="mc-message">' + resp.msg + "</p>";
            });
            // making things based on response
            if (resp.result === "success") {
              // Do stuff
              Self.removeClass("errored").addClass("successed");
              mcResp.removeClass("errored").addClass("successed");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
            if (resp.result === "error") {
              Self.removeClass("successed").addClass("errored");
              mcResp.removeClass("successed").addClass("errored");
              Self.find("input").val("");

              mcResp.find("p").fadeOut(10000);
            }
          }
        });
      });
    }

    // Sidebar
    if ($scope.find(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").length) {
      $scope.find(".main-header--five__toggler, .sidebar-one__overlay, .sidebar-one__close").on("click", function (e) {
        e.preventDefault();
        $scope.find(".sidebar-one").toggleClass("active");
        $("body").toggleClass("locked");
      });
    }

    if ($scope.find(".wow").length) {
      var wow = new WOW({
        boxClass: "wow", // animated element css class (default is wow)
        animateClass: "animated", // animation css class (default is animated)
        mobile: true, // trigger animations on mobile devices (default is true)
        live: true // act on asynchronously loaded content (default is true)
      });
      wow.init();
    }

    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
          accY: 0
        }
      );
    }

    // owl slider
    let hyperflyowlCarousel = $scope.find(".hyperfly-owl__carousel");
    if (hyperflyowlCarousel.length) {
      hyperflyowlCarousel.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
        elm.find("button").each(function () {
          $(this).attr("aria-label", "carousel button");
        });
      });
    }

    let hyperflyowlCarouselNav = $scope.find(".hyperfly-owl__carousel--custom-nav");
    if (hyperflyowlCarouselNav.length) {
      hyperflyowlCarouselNav.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });

    }

    let hyperflyowlCarouselCustomDots = $scope.find(".hyperfly-owl__carousel--custom-dots");
    if (hyperflyowlCarouselCustomDots.length) {
      hyperflyowlCarouselCustomDots.each(function () {
        let elm = $(this);
        let hyperflyowlCarouselThumb = elm.data("thumb-elm");
        $(hyperflyowlCarouselThumb).each(function () {
          let self = $(this);
          self.find(".owl-dot").on("click", function () {
            elm.trigger("to.owl.carousel", [$(this).index(), 300]);
          });
        });
        elm.on("changed.owl.carousel", function (element) {
          $(hyperflyowlCarouselThumb).each(function () {
            let self = $(this);
            self.find(".owl-dot").removeClass("active");
            self.find(".owl-dot").eq(element.item.index).addClass("active");
          });
        });
      });
    }

    if ($scope.find(".odometer").length) {
      var odo = $scope.find(".odometer");
      odo.each(function () {
        $(this).appear(function () {
          var countNumber = $(this).attr("data-count");
          $(this).html(countNumber);
        });
      });
    }

    if ($scope.find(".masonry-layout").length) {
      $scope.find(".masonry-layout").imagesLoaded(function () {
        $scope.find(".masonry-layout").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".img-popup").length) {
      var groups = {};
      $scope.find(".img-popup").each(function () {
        var id = parseInt($(this).attr("data-group"), 10);

        if (!groups[id]) {
          groups[id] = [];
        }

        groups[id].push(this);
      });

      $.each(groups, function () {
        $(this).magnificPopup({
          type: "image",
          closeOnContentClick: true,
          closeBtnInside: false,
          gallery: {
            enabled: true
          }
        });
      });
    }

    if ($scope.find(".hyperfly-masonary").length) {
      $scope.find(".hyperfly-masonary").imagesLoaded(function () {
        $scope.find(".hyperfly-masonary").isotope({
          layoutMode: "masonry"
        });
      });
    }

    if ($scope.find(".post-filter").length) {
      $scope.find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".hyperfly-filter").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".post-filter.has-dynamic-filters-counter").length) {
      var activeFilterItem = $scope.find(".post-filter.has-dynamic-filters-counter").find(
        "li"
      );
      activeFilterItem.each(function () {
        var filterElement = $(this).data("filter");
        var count = $scope.find(".hyperfly-filter").find(filterElement).length;
        $(this)
          .children(".filter-text")
          .append('<span class="count">(' + count + ")</span>");
      });
    }

    if ($scope.find(".masonary-layout").length) {
      $scope.find(".masonary-layout").isotope({
        layoutMode: "masonry"
      });
    }
    if ($scope.find(".post-filter").length) {
      $scope
        .find(".post-filter li")
        .children(".filter-text")
        .on("click", function () {
          var Self = $(this);
          var selector = Self.parent().attr("data-filter");
          $scope.find(".post-filter li").removeClass("active");
          Self.parent().addClass("active");
          $scope.find(".filter-layout").isotope({
            filter: selector,
            animationOptions: {
              duration: 500,
              easing: "linear",
              queue: false
            }
          });
          return false;
        });
    }

    if ($scope.find(".tabs-box").length) {
      $scope.find(".tab-btn").on("click", function (e) {
        e.preventDefault();
        var target = $($(this).attr("data-tab"));
        if ($(target).is(":visible")) {
          return false;
        } else {
          target
            .parents(".tabs-box")
            // .find(".tab-buttons")
            .find(".tab-btn")
            .removeClass("active-btn");
          $(this).addClass("active-btn");
          target
            .parents(".tabs-box")
            // .find(".tabs-content")
            .find(".tab")
            .fadeOut(0);
          target
            .parents(".tabs-box")
            // .find(".tabs-content")
            .find(".tab")
            .removeClass("active-tab");
          $(target).fadeIn(300);
          $(target).addClass("active-tab");
        }
      });
    }



    if ($scope.find(".neighborhoods__faq").length) {
      $scope
        .find(".neighborhoods__faq")
        .find(".accrodion")
        .each(function () {
          $(this).on("click", function () {
            let tabName = $(this).data("name");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1")
              .removeClass("active");
            $scope.find(".neighborhoods__img-box")
              .find(".neighborhoods__location-1." + tabName)
              .addClass("active");
          });
        });
    }

    // Accrodion
    if ($scope.find(".hyperfly-accrodion").length) {
      var accrodionGrp = $scope.find(".hyperfly-accrodion");
      accrodionGrp.each(function () {
        var accrodionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accrodion");
        Self.addClass(accrodionName);
        Self.find(".accrodion .accrodion-content").hide();
        Self.find(".accrodion.active").find(".accrodion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accrodion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $scope.find(".hyperfly-accrodion." + accrodionName)
                  .find(".accrodion")
                  .removeClass("active");
                $scope.find(".hyperfly-accrodion." + accrodionName)
                  .find(".accrodion")
                  .find(".accrodion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accrodion-content").slideDown();
              }
            });
        });
      });
    }

    // Popular Causes Progress Bar
    if ($scope.find(".count-bar").length) {
      $scope.find(".count-bar").appear(
        function () {
          var el = $(this);
          var percent = el.data("percent");
          $(el).css("width", percent).addClass("counted");
        }, {
          accY: -50
        }
      );
    }

    // Popular Causes Progress Bar
    if ($scope.find(".circle-progress").length) {
      $scope.find(".circle-progress").appear(function () {
        let circleProgress = $scope.find(".circle-progress");
        circleProgress.each(function () {
          let progress = $(this);
          let progressOptions = progress.data("options");
          progress.circleProgress(progressOptions);
        });
      });
    }

    //Fact Counter + Text Count
    if ($scope.find(".count-box").length) {
      $scope.find(".count-box").appear(
        function () {
          var $t = $(this),
            n = $t.find(".count-text").attr("data-stop"),
            r = parseInt($t.find(".count-text").attr("data-speed"), 10);

          if (!$t.hasClass("counted")) {
            $t.addClass("counted");
            $({
              countNum: $t.find(".count-text").text()
            }).animate({
              countNum: n
            }, {
              duration: r,
              easing: "linear",
              step: function () {
                $t.find(".count-text").text(Math.floor(this.countNum));
              },
              complete: function () {
                $t.find(".count-text").text(this.countNum);
              }
            });
          }
        }, {
          accY: 0
        }
      );
    }

    let thmSwiperSliders = $scope.find(".thm-swiper__slider");
    if (thmSwiperSliders.length) {
      thmSwiperSliders.each(function () {
        let elm = $(this);
        let options = elm.data("swiper-options");
        let thmSwiperSlider = new Swiper(
          elm,
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmOwlCarousels = $scope.find(".hyperfly-owl__carousel");
    if (thmOwlCarousels.length) {
      thmOwlCarousels.each(function () {
        let elm = $(this);
        let options = elm.data("owl-options");
        let thmOwlCarousel = elm.owlCarousel(
          "object" === typeof options ? options : JSON.parse(options)
        );
      });
    }

    let thmOwlNavCarousels = $scope.find(".thm-owl__carousel--custom-nav");
    if (thmOwlNavCarousels.length) {
      thmOwlNavCarousels.each(function () {
        let elm = $(this);
        let owlNavPrev = elm.data("owl-nav-prev");
        let owlNavNext = elm.data("owl-nav-next");
        $(owlNavPrev).on("click", function (e) {
          elm.trigger("prev.owl.carousel");
          e.preventDefault();
        });

        $(owlNavNext).on("click", function (e) {
          elm.trigger("next.owl.carousel");
          e.preventDefault();
        });
      });
    }

    if ($scope.find("#testimonials-two__thumb").length) {
      let testimonialsThumb = new Swiper("#testimonials-two__thumb", {
        slidesPerView: 3,
        spaceBetween: 0,
        speed: 1400,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        loop: true,
        autoplay: {
          delay: 5000
        }
      });

      let testimonialsCarousel = new Swiper("#testimonials-two__carousel", {
        observer: true,
        observeParents: true,
        speed: 1400,
        mousewheel: false,
        slidesPerView: 1,
        autoplay: {
          delay: 5000
        },
        thumbs: {
          swiper: testimonialsThumb
        },
        pagination: {
          el: "#testimonials-one__carousel-pagination",
          type: "bullets",
          clickable: true
        }
      });
    }
    if ($scope.find(".post-filter").length) {
      var postFilterList = $scope.find(".post-filter li");
      // for first init
      $scope.find(".filter-layout").isotope({
        filter: ".filter-item",
        animationOptions: {
          duration: 500,
          easing: "linear",
          queue: false
        }
      });
      // on click filter links
      postFilterList.on("click", function () {
        var Self = $(this);
        var selector = Self.attr("data-filter");
        postFilterList.removeClass("active");
        Self.addClass("active");

        $scope.find(".filter-layout").isotope({
          filter: selector,
          animationOptions: {
            duration: 500,
            easing: "linear",
            queue: false
          }
        });
        return false;
      });
    }
    if ($scope.find(".curved-circle--item").length) {
      $scope.find(".curved-circle--item").circleType();
    }

    // Date Picker
    if ($scope.find(".hyperfly-datepicker").length) {
      $scope.find(".hyperfly-datepicker").each(function () {
        $(this).datepicker();
      });
    }

    if ($scope.find("#datepicker").length) {
      $scope.find("#datepicker").datepicker();
    }

    if ($scope.find("#datepicker2").length) {
      $scope.find("#datepicker2").datepicker();
    }

    // Multi Date Picker
    if ($(".hyperfly-multi-datepicker").length) {
      $(".hyperfly-multi-datepicker").each(function () {
        let self = $(this);
        self.daterangepicker({
          autoUpdateInput: false
        });
        self.on("apply.daterangepicker", function (ev, picker) {
          $(this).val(
            picker.startDate.format("D MMM YY") +
            " - " +
            picker.endDate.format("D MMM YY")
          );
        });
      });
    }

    hyperfly_stretch();

    function hyperfly_stretch() {
      var i = $(window).width();
      $scope.find(".row .hyperfly-stretch-element-inside-column").each(function () {
        var $this = $(this),
          row = $this.closest(".row"),
          cols = $this.closest('[class^="col-"]'),
          colsheight = $this.closest('[class^="col-"]').height(),
          rect = this.getBoundingClientRect(),
          l = row[0].getBoundingClientRect(),
          s = cols[0].getBoundingClientRect(),
          r = rect.left,
          d = i - rect.right,
          c = l.left + (parseFloat(row.css("padding-left")) || 0),
          u = i - l.right + (parseFloat(row.css("padding-right")) || 0),
          p = s.left,
          f = i - s.right,
          styles = {
            "margin-left": 0,
            "margin-right": 0
          };
        if (Math.round(c) === Math.round(p)) {
          var h = parseFloat($this.css("margin-left") || 0);
          styles["margin-left"] = h - r;
        }
        if (Math.round(u) === Math.round(f)) {
          var w = parseFloat($this.css("margin-right") || 0);
          styles["margin-right"] = w - d;
        }
        $this.css(styles);
      });
    }
  };

  var WidgetFaqHandler = function ($scope) {
    if ($scope.find(".accrodion-grp").length) {
      var accrodionGrp = $scope.find(".accrodion-grp");
      accrodionGrp.each(function () {
        var accrodionName = $(this).data("grp-name");
        var Self = $(this);
        var accordion = Self.find(".accrodion");
        Self.addClass(accrodionName);
        Self.find(".accrodion .accrodion-content").hide();
        Self.find(".accrodion.active").find(".accrodion-content").show();
        accordion.each(function () {
          $(this)
            .find(".accrodion-title")
            .on("click", function () {
              if ($(this).parent().hasClass("active") === false) {
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .removeClass("active");
                $scope.find(".accrodion-grp." + accrodionName)
                  .find(".accrodion")
                  .find(".accrodion-content")
                  .slideUp();
                $(this).parent().addClass("active");
                $(this).parent().find(".accrodion-content").slideDown();
              }
            });
        });
      });
    }
  };



  //elementor front start
  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/widget",
      WidgetDefaultHandler
    );

    elementorFrontend.hooks.addAction(
      "frontend/element_ready/hyperfly-faq.default",
      WidgetFaqHandler
    );

  });

  // login
  $("#hyperfly-login").submit(function (event) {
    event.preventDefault();

    var login = "action=signup_paragon&param=login&" + $(this).serialize();
    var loginResult = $(".login-result");
    $.ajax({
      type: "POST",
      url: hyperfly_login_object.ajaxurl,
      data: login,
      beforeSend: function () {
        // setting a timeout
        loginResult.addClass("loading");
      },
      success: function (data) {
        loginResult.removeClass("loading");
        if (data.status == 2) {
          loginResult.removeClass("alert alert-warning");
          loginResult.html(data.message).addClass("alert alert-success");
          window.location.href = hyperfly_login_object.login_redirect_url;
        } else if (data.status == 1) {
          loginResult.html(data.message).addClass("alert alert-warning");
        } else {
          loginResult
            .html(hyperfly_login_object.message)
            .addClass("alert alert-warning");
        }
      }
    });
  }); //end login

  // register
  $("#hyperfly-registration").submit(function (event) {
    event.preventDefault();

    var signupForm =
      "action=signup_paragon&param=register&" + $(this).serialize();
    var registerationResult = $(".registration-result");
    $.ajax({
      type: "POST",
      url: hyperfly_login_object.ajaxurl,
      data: signupForm,
      beforeSend: function () {
        // setting a timeout
        registerationResult.addClass("loading");
      },
      success: function (data) {
        registerationResult.removeClass("loading");
        if (data.status == 2) {
          registerationResult.removeClass("alert alert-warning");
          registerationResult
            .html(data.message)
            .addClass("alert alert-success");
          window.location.href = hyperfly_login_object.registration_redirect_url;
        } else {
          registerationResult
            .html(data.message)
            .addClass("alert alert-warning");
        }
      }
    });
  }); //end register

})(jQuery);