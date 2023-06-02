const menuBtn = document.querySelectorAll('.menu-item');
const logoSustainabilityStart = document.querySelector('.logo-sustainability-start');
const menu = document.querySelector('.menu');
const logoMicrosoft = document.querySelector('.microsoft-logo');
const allSlides = document.querySelectorAll('.slide');
const startSlide = document.querySelector('.start-slide');
const bg = document.querySelector('.background-image');

const menuLogo1 = document.querySelector('.logo-sustainability');
const menuLogo2 = document.querySelector('.logo-elitmind');

// const page = document.querySelector('.body');

//////////////// FULL SCREEN MODE /////////////////////
// make the element go to full-screen mode
// page.requestFullscreen()
// 	.then(function() {
// 		// element has entered fullscreen mode successfully
// 	})
// 	.catch(function(error) {
//         console.log('error');
// 		// element could not enter fullscreen mode
// 	});


/// zmienna do sterowania wyłączeniem automatycznego przechodzenia slajdów
let click = 0;

//////////// ukrycie wszystkich slajdów /////////
function hideAllSlides() {
    allSlides.forEach(slide => {
        slide.classList.remove('visible')
    });
}

//////////// animacje - poruszanie tłem ////////
function moveBg() {
    bg.classList.toggle('background-image-position')
}

////// animacje - buttony /////
function menuAnimation(button) {
    if (button.classList.contains('start')) {
        menu.classList.add('menu-streched');
        logoMicrosoft.classList.remove('opacity');
    } else {
        menu.classList.remove('menu-streched');
        logoMicrosoft.classList.add('opacity');
    }
}

//////////// animacje - logo startowe ///////
function startLogoAnimation() {
    if (startSlide.classList.contains('visible')) {
        logoSustainabilityStart.classList.add('start-logo-grow');
    } else {
        logoSustainabilityStart.classList.remove('start-logo-grow');
    }
}

////////////animacje - pierwszy slajd//////////
function firstSlideAnimations() {
    const firstSlide = document.querySelector(".first-slide");
    const fisrtSlideTitleAnimation = firstSlide.querySelector('.first-slide-title-start-position');
    const firstSlideLeft = firstSlide.querySelector(".first-slide-left");
    const boxIcons = firstSlide.querySelectorAll('.box-icon');
    const boxText = firstSlide.querySelectorAll('.box-text');
    let number = 1;
    if (firstSlide.classList.contains('visible')) {

        fisrtSlideTitleAnimation.classList.add('first-slide-title-end-position');

        firstSlideLeft.classList.add('opacity-delay-1');

        boxIcons.forEach(icon => {
            icon.classList.add(`bounce-delay-${number}`);
            number++;
        });

        boxText.forEach(text => {
            text.classList.add(`opacity-delay-2`);
        });

    } else {
        fisrtSlideTitleAnimation.classList.remove('first-slide-title-end-position');

        firstSlideLeft.classList.remove('first-slide-title-end-position');

        firstSlideLeft.classList.remove('opacity-delay-1');

        boxIcons.forEach(icon => {
            icon.classList.remove(`bounce-delay-${number}`);
            number++;
        });

        boxText.forEach(text => {
            text.classList.remove(`opacity-delay-2`);
        });
    }
}

////////// animacje - drugi slajd ////////////
function secondSlideAnimations() {
    const secondSlide = document.querySelector(".second-slide");
    const secondSlideTitleAnimation = secondSlide.querySelector('.second-slide-title-start-position');
    const secondSlideTitle = secondSlide.querySelector(".second-slide-title");
    const infographic = secondSlide.querySelector(".infographic");
    const line = secondSlide.querySelector(".dashed-line")
    const boxIcons = secondSlide.querySelectorAll('.box-icon');
    const boxText = secondSlide.querySelectorAll('.box-text');
    let number = 7;

    if (secondSlide.classList.contains('visible')) {

        secondSlideTitleAnimation.classList.add('second-slide-title-end-position');

        secondSlideTitle.classList.add('opacity-delay-1');

        infographic.classList.add('slide-left');

        line.classList.add('line-slide');


        boxIcons.forEach(icon => {
            icon.classList.add(`bounce-delay-${number}`);
            number++;
        });

        boxText.forEach(text => {
            text.classList.add(`opacity-delay-3`);
        });

    } else {

        secondSlideTitleAnimation.classList.remove('second-slide-title-end-position');

        secondSlideTitle.classList.remove('opacity-delay-1');

        infographic.classList.remove('slide-left');

        line.classList.remove('line-slide');


        boxIcons.forEach(icon => {
            icon.classList.remove(`bounce-delay-${number}`);
            number++;
        });

        boxText.forEach(text => {
            text.classList.remove(`opacity-delay-3`);
        });
    }
}

////////// animacje - czwarty slajd ////////////
function fourthSlideAnimations() {
    const fourthSlide = document.querySelector(".fourth-slide");
    const fourthSlideTitleAnimation = fourthSlide.querySelector('.fourth-slide-title-start-position');
    const fourthSlideTitle = fourthSlide.querySelector(".fourth-slide-title");
    const line = fourthSlide.querySelector(".dashed-line");
    const image = fourthSlide.querySelector(".contact-image");
    const text = fourthSlide.querySelector(".box-text-contact");
    const logos = fourthSlide.querySelector(".fourth-slide-left")
    if (fourthSlide.classList.contains('visible')) {

        fourthSlideTitleAnimation.classList.add('fourth-slide-title-end-position');

        fourthSlideTitle.classList.add('opacity-delay-1');

        line.classList.add('line-slide-2');

        image.classList.add('contact-image-bounce');

        text.classList.add('opacity-delay-2');

        logos.classList.add('slide-left-2');

    } else {
        fourthSlideTitleAnimation.classList.remove('fourth-slide-title-end-position');

        fourthSlideTitle.classList.remove('opacity-delay-1');

        line.classList.remove('line-slide-2');

        image.classList.remove('contact-image-bounce');

        text.classList.remove('opacity-delay-2');

        logos.classList.remove('slide-left-2');
    }
}


///// ODPALANIE AUTOMATYCZNEJ ZMIANY SLAJDÓW /////////////////////
const time = 7000;

let timeOutId;

const showAndHide = (slide, className) => {
    if (slide.classList.contains(className)) {
        slide.classList.remove(className)
    }

    slide.classList.add(className);
    ///////////////  odpalanie animacji slajdów ////////
    startLogoAnimation();
    firstSlideAnimations();
    secondSlideAnimations();
    fourthSlideAnimations();
    moveBg()

    timeOutId = setTimeout(() => { slide.classList.remove(className) }, time);
}

const handleVisibility = () => {
    let newTime = time;

    for (let i = 0; i < allSlides.length; i++) {
        setTimeout(() => { showAndHide(allSlides[i], 'visible') }, newTime);
        newTime += time;
    }
    // animateStartLogo()

    return newTime;
}

// // // //////// uruchamianie automatycznej animacji slajdów //////
let intervalId;

const autoAnimateSlides = () => {
    hideAllSlides()
    click = 0;
    const intervalTime = (handleVisibility() * 1 - time);
    intervalId = setInterval(handleVisibility, intervalTime);
    // handleVisibility()
}

/// funkcja odpalająca się na starcie 
const reloadPage = () => {
    window.location.reload()
}

////////////////////// LISTENER ///////////////////////////

window.addEventListener('DOMContentLoaded', startLogoAnimation)


menuLogo1.addEventListener('click', function () {

    let stop = 0;

    menu.classList.remove('menu-streched');
    logoMicrosoft.classList.add('opacity');

    if (stop === 0) {
        autoAnimateSlides();
    } else {
        reloadPage();
    }
    stop++;

});
// menuLogo2.addEventListener('click', stopAutoAnimateSlides);

menuBtn.forEach(button => {
    button.addEventListener('click', function () {
        if (click !== 0) {
            hideAllSlides();
            const btnName = button.classList[0];

            allSlides.forEach(slide => {
                if (slide.classList[0] === btnName) {
                    slide.classList.add('visible');
                }
            })
            //// odpalanie animacji /////
            moveBg()
            menuAnimation(button);
            startLogoAnimation();
            firstSlideAnimations();
            secondSlideAnimations();
            fourthSlideAnimations();
        } else {
            reloadPage();
        }
    })
    click++;
    console.log(click);
});