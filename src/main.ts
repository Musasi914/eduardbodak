import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

// Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
  console.log("object");
  lenis.raf(time * 1000); // Convert time from seconds to milliseconds
});
gsap.ticker.lagSmoothing(0);
