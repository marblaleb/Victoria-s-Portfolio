gsap.registerPlugin(ScrollTrigger);

const body = document.querySelector('body');
const intro = document.querySelector('.intro'),
    introCard = intro.querySelectorAll('.intro_card'),
    introMedia = intro.querySelector('.intro_media');


const isMobile = window.matchMedia('(max-width: 769px');

const init = () => {
    gsap.set(body, { overflow: 'hidden' });
    gsap.set(introCard[0], { scale: 0.6 })

    initLenis();
    initScrollHero();
    initScrollMedia();
}

const initLenis = () => {
    const lenis = new Lenis({
        lerp: 0.1,
        smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
}

const initScrollHero = () => {
    const tlHero = gsap.timeline({
        defaults: { stagger: 0.08, ease: 'power1.inOut' },
        scrollTrigger: {
            trigger: '.intro_one',
            start: 'top top',
            end: 'center',
            scrub: true,
            pin: true,
            pinSpacing: true,
        }
    });

    tlHero.add('start').to(introCard[0], {
        scale: 1,
    })
};


const initScrollMedia = () => {
    const tlMedia = gsap.timeline({

        scrollTrigger: {
            trigger: 'intro_two',
            start: 'center top',
            end: 'bottom bottom',
            scrub: 2,
            pin: true,
            pinSpacing: false,
        }
    });

    gsap.set(introMedia, { autoAlpha: 1 });
    tlMedia.to(introMedia, {
        autoAlpha: 0
    });

    initGalleryText();
}


const initGalleryText = () => {

    const gallery = document.querySelector('.gallery');
    galleryText = gallery.querySelector('.gallery_text');


    ScrollTrigger.create({
        trigger: gallery,
        pin: galleryText,
        start: 'top top',
        end: 'bottom bottom'
    })


    const texts = gsap.utils.toArray('.gallery_text_items > h2');

    gsap.set(texts, { y: '200%', autoAlpha: 0 });

    texts.forEach((text, i) => {
        const tlGalleryText = gsap.timeline({

            scrollTrigger: {
                trigger: gallery,
                start: () => `top+=${i * window.innerHeight} top+=60%`,
                end: () => `top+=${(i + 1) * window.innerHeight} top+=60%`,
                scrub: 2

            }
        });

        tlGalleryText.to(text, {
            y:0,
            autoAlpha:1
        }).to(text, {
            y:'-200%',
            autoAlpha:0
        })

    });


}



window.addEventListener('DOMContentLoaded', () => {

    if (!isMobile.matches) {
        // gsap.registerPlugin(ScrollTrigger)
        init();
    }
    else {
        initLenis();
        initScrollMedia();
    }


})