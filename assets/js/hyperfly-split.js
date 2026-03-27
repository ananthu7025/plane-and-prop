(function ($) {
    "use strict";

    $(window).on("load", function () {
        bwsplit_text();
    });

    // Split Text
    function bwsplit_text() {
        setTimeout(function () {
            var splitTextElements = $(".bw-split-in-right, .bw-split-in-left, .page-header__title");
            if (splitTextElements.length === 0) return;
            gsap.registerPlugin(SplitText);
            splitTextElements.each(function (index, element) {
                var splitElement = new SplitText(element, {
                    type: "chars, words", // "chars, words, lines"
                });

                gsap.set(element, {
                    perspective: 400
                });

                if ($(element).hasClass("bw-split-in-fade")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-right")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "20",
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-left")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        x: "-20",
                        ease: "Back.easeOut"
                    });
                }
                if ($(element).hasClass("bw-split-in-up")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "20",
                        ease: "circ.out"
                    });
                }
                if ($(element).hasClass("bw-split-in-down")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        y: "-20",
                        ease: "circ.out"
                    });
                }
                if ($(element).hasClass("bw-split-in-rotate")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out"
                    });
                }
                if ($(element).hasClass("bw-split-in-scale")) {
                    gsap.set(splitElement.chars, {
                        opacity: 0,
                        rotateX: "50deg",
                        ease: "circ.out"
                    });
                }
                element.anim = gsap.to(splitElement.chars, {
                    scrollTrigger: {
                        trigger: element,
                        toggleActions: "restart pause resume reverse",
                        start: "top 90%"
                    },
                    x: "0",
                    y: "0",
                    rotateX: "0",
                    scale: 1,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.02
                });
            });
        }, 200);
    }

    gsap.registerPlugin(ScrollTrigger);

    // Text Invert With Scroll 
    const split = new SplitText(".bw-split-text", {
        type: "lines"
    });
    split.lines.forEach((target) => {
        gsap.to(target, {
            backgroundPositionX: 0,
            ease: "none",
            scrollTrigger: {
                trigger: target,
                scrub: 1,
                start: 'top 90%',
                end: "bottom center"
            }
        });
    });
    // Hero Banner Content
    if ($('.main-slider-two__content, .main-slider-one__content').length > 0) {
        let splitTextLines = gsap.utils.toArray(".main-slider-two__content, .main-slider-one__content");

        splitTextLines.forEach(splitTextLine => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: splitTextLine,
                    start: 'top 90%',
                    duration: 2,
                    end: 'bottom 60%',
                    scrub: false,
                    markers: false,
                    toggleActions: 'play none none none'
                }
            });

            const itemSplitted = new SplitText(splitTextLine, {
                type: "lines"
            });
            gsap.set(splitTextLine, {
                perspective: 400
            });
            itemSplitted.split({
                type: "lines"
            })
            tl.from(itemSplitted.lines, {
                duration: 1,
                delay: 0.7,
                opacity: 0,
                rotationX: -80,
                force3D: true,
                transformOrigin: "top center -50",
                stagger: 0.1
            });
        });
    }

})(jQuery);