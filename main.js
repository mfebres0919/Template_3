// add classes for mobile navigation toggling
    var CSbody = document.querySelector("body");
    const CSnavbarMenu = document.querySelector("#cs-navigation");
    const CShamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

    CShamburgerMenu.addEventListener('click', function() {
        CShamburgerMenu.classList.toggle("cs-active");
        CSnavbarMenu.classList.toggle("cs-active");
        CSbody.classList.toggle("cs-open");
        // run the function to check the aria-expanded value
        ariaExpanded();
    });

    // checks the value of aria expanded on the cs-ul and changes it accordingly whether it is expanded or not 
    function ariaExpanded() {
        const csUL = document.querySelector('#cs-expanded');
        const csExpanded = csUL.getAttribute('aria-expanded');

        if (csExpanded === 'false') {
            csUL.setAttribute('aria-expanded', 'true');
        } else {
            csUL.setAttribute('aria-expanded', 'false');
        }
    }

        // This script adds a class to the body after scrolling 100px
    // and we used these body.scroll styles to create some on scroll 
    // animations with the navbar
    
    document.addEventListener('scroll', (e) => { 
        const scroll = document.documentElement.scrollTop;
        if(scroll >= 100){
    document.querySelector('body').classList.add('scroll')
        } else {
        document.querySelector('body').classList.remove('scroll')
        }
    });


    // mobile nav toggle code
    const dropDowns = Array.from(document.querySelectorAll('#cs-navigation .cs-dropdown'));
        for (const item of dropDowns) {
            const onClick = () => {
            item.classList.toggle('cs-active')
        }
        item.addEventListener('click', onClick)
        }

        



// Service Accordion Script
const items = document.querySelectorAll('.service-item');

items.forEach(item => {
  const header = item.querySelector('.service-header');
  const content = item.querySelector('.service-content');

  header.addEventListener('click', () => {
    const isOpen = item.classList.contains('active');

    // CLOSE OTHERS
    items.forEach(i => {
      if (i !== item && i.classList.contains('active')) {
        const c = i.querySelector('.service-content');
        c.style.height = c.scrollHeight + 'px';
        requestAnimationFrame(() => {
          c.style.height = '0px';
        });
        i.classList.remove('active');
      }
    });

    // TOGGLE CURRENT
    if (isOpen) {
      content.style.height = content.scrollHeight + 'px';
      requestAnimationFrame(() => {
        content.style.height = '0px';
      });
      item.classList.remove('active');
    } else {
      item.classList.add('active');
      content.style.height = content.scrollHeight + 'px';
    }
  });
});




// TESTIMONIALS SECTION

document.addEventListener("DOMContentLoaded", () => {
  const testimonials = [
    {
      text: "From the moment I walked in to the final mirror check, the service was top-tier. Clean shop, great energy, and the cut came out exactly how I wanted. My fade was so sharp I almost didn’t recognize myself.",
      name: "— Marcus T., Client",
      img: "client-1.png",
      alt: "Client Marcus"
    },
    {
      text: "Best barber experience I’ve had in a long time. Super professional, took his time, and the lineup was perfect. I left feeling like I had somewhere important to be.",
      name: "— Devin R., Client",
      img: "client-1.png",
      alt: "Client Devin"
    },
    {
      text: "I brought my son in and the whole vibe was welcoming. Great with kids, clean setup, and we both walked out fresh. This is our new spot.",
      name: "— Jasmine L., Client",
      img: "client-1.png",
      alt: "Client Jasmine"
    },
    {
      text: "Attention to detail is crazy. The blend is smooth, beard is shaped right, and everything looks clean even days later. Worth every penny.",
      name: "— Andre K., Client",
      img: "client-1.png",
      alt: "Client Andre"
    },
    {
      text: "Easy booking, on time, and the cut was exactly what I asked for. Comfortable, premium, and I didn’t feel rushed at all.",
      name: "— Chris M., Client",
      img: "client-1.png",
      alt: "Client Chris"
    }
  ];

  const testimonialText = document.getElementById("testimonialText");
  const clientImg = document.getElementById("clientImg");
  const clientName = document.getElementById("clientName");
  const prevBtn = document.querySelector(".xp-prev");
  const nextBtn = document.querySelector(".xp-next");
  const swipeArea = document.querySelector(".xp-left");

  // Animate these containers (fallbacks if your structure changes)
  const quoteWrap = document.querySelector(".xp-quote-wrap") || testimonialText;
  const clientWrap = document.querySelector(".xp-client") || clientImg?.parentElement;

  let index = 0;
  let isAnimating = false;

  const DUR = 320;
  const EASE = "cubic-bezier(.2,.9,.2,1)";
  const DIST = 28;

  function setContent(i){
    const t = testimonials[i];
    testimonialText.textContent = t.text;
    clientName.textContent = t.name;
    clientImg.src = t.img;
    clientImg.alt = t.alt || "Client photo";
  }

  function animateElementsOut(direction){
    const dx = direction === "next" ? -DIST : DIST;

    const outFrames = [
      { transform: "translateX(0px)", opacity: 1 },
      { transform: `translateX(${dx}px)`, opacity: 0 }
    ];

    const opts = { duration: DUR, easing: EASE, fill: "forwards" };

    const a1 = quoteWrap.animate(outFrames, opts);
    const a2 = clientWrap.animate(outFrames, opts);

    return Promise.all([a1.finished, a2.finished]).catch(() => {});
  }

  function animateElementsIn(direction){
    const dx = direction === "next" ? DIST : -DIST;

    const inFrames = [
      { transform: `translateX(${dx}px)`, opacity: 0 },
      { transform: "translateX(0px)", opacity: 1 }
    ];

    const opts = { duration: DUR, easing: EASE, fill: "forwards" };

    const a1 = quoteWrap.animate(inFrames, opts);
    const a2 = clientWrap.animate(inFrames, opts);

    return Promise.all([a1.finished, a2.finished]).catch(() => {});
  }

  async function goTo(newIndex, direction){
    if (isAnimating) return;
    isAnimating = true;

    await animateElementsOut(direction);

    // Clear any inline animation fill so next animation starts clean
    quoteWrap.style.transform = "";
    quoteWrap.style.opacity = "";
    clientWrap.style.transform = "";
    clientWrap.style.opacity = "";

    index = newIndex;
    setContent(index);

    await animateElementsIn(direction);

    // cleanup
    quoteWrap.style.transform = "";
    quoteWrap.style.opacity = "";
    clientWrap.style.transform = "";
    clientWrap.style.opacity = "";

    isAnimating = false;
  }

  function next(){
    const newIndex = (index + 1) % testimonials.length;
    goTo(newIndex, "next");
  }

  function prev(){
    const newIndex = (index - 1 + testimonials.length) % testimonials.length;
    goTo(newIndex, "prev");
  }

  // Buttons
  prevBtn?.addEventListener("click", prev);
  nextBtn?.addEventListener("click", next);

  // Swipe
  let startX = 0;
  let endX = 0;

  swipeArea?.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    endX = startX;
  }, { passive: true });

  swipeArea?.addEventListener("touchmove", (e) => {
    endX = e.touches[0].clientX;
  }, { passive: true });

  swipeArea?.addEventListener("touchend", () => {
    const dx = endX - startX;
    if (Math.abs(dx) > 55) (dx < 0 ? next() : prev());
    startX = 0;
    endX = 0;
  });

  // Keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  });

  // Init
  setContent(index);
});

