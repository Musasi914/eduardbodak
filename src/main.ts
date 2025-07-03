import gsap from "gsap";
import { Draggable, ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import { isSmallScreen } from "./utils/jadgeScreen";
import Swup from "swup";
gsap.registerPlugin(ScrollTrigger, Draggable);

let lenis: Lenis;
let dialog: HTMLDialogElement;

function initLenis() {
  lenis = new Lenis({});

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });
  gsap.ticker.lagSmoothing(0);

  // LenisとScrollTriggerの連携（scrollerProxy）
  // ScrollTrigger.scrollerProxy(document.body, {
  //   scrollTop(value) {
  //     if (arguments.length && value !== undefined) {
  //       lenis.scrollTo(value);
  //     }
  //     return lenis.scroll;
  //   },
  //   getBoundingClientRect() {
  //     return {
  //       top: 0,
  //       left: 0,
  //       width: window.innerWidth,
  //       height: window.innerHeight,
  //     };
  //   },
  // });
}

function closeDialog() {
  lenis.start();
  dialog.close();
}

function openDialog() {
  lenis.stop();
  dialog.showModal();
}

function headerMenuInit() {
  const openBtn = document.querySelector("#menu-open") as HTMLButtonElement;
  const closeBtn = document.querySelector("#menu-close") as HTMLButtonElement;
  dialog = document.querySelector("#dialog") as HTMLDialogElement;
  const menuBg = document.querySelector(".menu__backdrop") as HTMLButtonElement;
  const grabBar = document.querySelector(".menu__grab") as HTMLElement;
  const menuContent = document.querySelector(".menu__content") as HTMLElement;

  openBtn.addEventListener("click", () => {
    openDialog();
    gsap.from(".menu__list", { opacity: 0, y: 10, stagger: 0.1 });
  });
  closeBtn.addEventListener("click", () => {
    closeDialog();
  });

  menuBg.addEventListener("click", () => {
    closeDialog();
  });

  Draggable.create(menuContent, {
    type: "y",
    trigger: grabBar,
    activeCursor: "grab",
    onClick: () => closeDialog(),
    dragResistance: 0.5,
    onDragEnd: (self) => {
      if (self.layerY >= 100) {
        closeDialog();
        gsap.set(menuContent, { y: 0, clearProps: "transform", duration: 0.3 });
      } else {
        gsap.to(menuContent, { y: 0, clearProps: "transform", duration: 0.3 });
      }
    },
  });
}

function heroAnimation() {
  // Floating
  const heroCards = gsap.utils.toArray(".hero__cards .card__wrapper") as HTMLElement[];
  heroCards.forEach((card, i) => {
    gsap.to(card, {
      y: 3,
      duration: 1.3,
      repeat: -1,
      yoyo: true,
      delay: 0.4 * i,
      ease: "power1.inOut",
    });
  });

  // cardの現在位置から
  // hero の　height　px まで移動する
  // これらを引いた数をy: にあてる
  const heroEl = document.querySelector(".hero") as HTMLElement;
  const goalHeight = heroEl.getBoundingClientRect().height;

  const card1 = document.querySelector("#hero-card-1") as HTMLElement;
  const cardY = card1.getBoundingClientRect().y;
  const moveY = goalHeight - cardY;

  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".hero",
        start: "bottom bottom",
        end: "bottom 30%",
        scrub: true,
      },
    })
    .to(
      "#hero-card-1",
      {
        xPercent: 100,
        z: -200,
        y: moveY + 30,
        rotate: -20,
        rotateX: -20,
        duration: 9,
      },
      1
    )
    .to(
      "#hero-card-2",
      {
        z: -200,
        y: moveY + 15,
        rotateX: -20,
        duration: 9,
      },
      1
    )
    .to(
      "#hero-card-3",
      {
        xPercent: -100,
        z: -200,
        y: moveY,
        rotate: 20,
        rotateX: -20,
        duration: 9,
      },
      1
    )
    .to(
      ".hero__cards .card",
      {
        opacity: 0,
        duration: 5,
      },
      5
    )
    .to(
      ".hero__cards .card_cover",
      {
        opacity: 1,
        duration: 5,
      },
      5
    )
    .to(
      ".hero__cards .card__title",
      {
        opacity: 0,
        duration: 5,
      },
      5
    );

  // // move
  // ScrollTrigger.create({
  //   trigger: ".hero",
  //   start: "bottom bottom",
  //   end: "bottom 30%",
  //   animation: timeline,
  //   scrub: true,
  // });
}

function serviceAnimation() {
  const serviceEl = document.querySelector(".service") as HTMLElement;

  gsap.set("#service-card-1", { xPercent: 110, yPercent: -120, rotateX: 15, rotateZ: -20, scale: 0.4 });
  gsap.set("#service-card-2", { yPercent: -124, rotateX: 15, scale: 0.4 });
  gsap.set("#service-card-3", { xPercent: -110, yPercent: -128, rotateX: 15, rotateZ: 20, scale: 0.4 });

  gsap.to(".service__card-wrapper", { y: 10, stagger: 0.4, repeat: -1, yoyo: true, ease: "power1.inOut", duration: 2 });

  gsap
    .timeline({
      scrollTrigger: {
        trigger: serviceEl,
        start: "top center",
        end: "bottom bottom",
        scrub: true,
      },
    })
    .to(
      ".service__card-cover",
      {
        opacity: 0,
        duration: 4,
      },
      0
    )
    .to(
      "#service-card-1",
      {
        xPercent: 80,
        yPercent: 0,
        duration: 6,
        ease: "back.out",
      },
      0
    )
    .to(
      "#service-card-2",
      {
        yPercent: 0,
        duration: 6,
        ease: "back.out",
      },
      0
    )
    .to(
      "#service-card-3",
      {
        xPercent: -80,
        yPercent: 0,
        duration: 6,
        ease: "back.out",
      },
      0
    )
    .to(
      ".service__card",
      {
        scale: 1,
        rotateX: 0,
        rotateZ: 0,
        duration: 5,
      },
      0
    )
    .to(".service__card", { xPercent: 0, rotateZ: 0, rotateY: 180, stagger: 0.2, duration: 3, ease: "back.out" }, 4.6)
    .to(".service__card", { y: 1, duration: 2.4 }, 7.6);

  // update --progress
  window.addEventListener("scroll", () => {
    const serviceClient = serviceEl.getBoundingClientRect();
    const serviceOffset = serviceClient.top;
    const serviceHeight = serviceClient.height;
    const serviceProgress = -serviceOffset / (serviceHeight - window.innerHeight);
    if (serviceProgress < 0) return serviceEl.style.setProperty("--progress", "0");
    if (serviceProgress > 1) return serviceEl.style.setProperty("--progress", "1");
    serviceEl.style.setProperty("--progress", `${serviceProgress}`);
  });
}

function pegeTransitionInit() {
  const swup = new Swup({
    containers: ["#swup", "header", "#dialog"],
    hooks: {
      "visit:start": () => closeDialog(),
    },
  });

  swup.hooks.on("page:view", () => {
    // This runs after every page change by swup
    headerMenuInit();
    if (document.querySelector(".main-top")) {
      init();
    }
  });
}

function init() {
  initLenis();

  if (!isSmallScreen()) {
    heroAnimation();
    serviceAnimation();
  } else {
    gsap.set(".service__card-cover", { opacity: 0 });
  }

  pegeTransitionInit();
}

headerMenuInit();
init();
