var allText = document.querySelectorAll(".page2  div  div  div");

gsap.to("h1", {
  duration: 1,
  y: 20,
  opacity: 0,
  repeat: -1,
});

function locoscroll() {
  gsap.registerPlugin(ScrollTrigger);

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function textSplitting() {
  allText.forEach((elem) => {
    var clutter = "";
    //console.log(elem);
    var text = elem.textContent || elem.innerText;
    //console.log(text);
    var splittedText = text.split("");
    //console.log(splittedText);
    splittedText.forEach((e) => {
      //console.log(e);
      clutter += `<span>${e}</span>`;
      elem.innerHTML = clutter;
      console.log(elem);
    });
  });
}

function gsapTextAnim() {
  gsap.to(".page2  div  div  div span", {
    color: "#e3e3c4",
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".page2",
      scroller: "#main",
      start: "top 60%",
      end: "top -10%",
      scrub: 2,
    },
  });
}

locoscroll();
textSplitting();
gsapTextAnim();
