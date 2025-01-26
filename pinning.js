gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.defaults({
	scroller: window,
	fastScrollEnd: true, // Ensures smooth end of the scroll
	refreshPriority: 1, // Adjusts the refresh priority for better performance
});
const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

const infoText = document.querySelectorAll(".heroIntro p");
infoText.forEach((paragraph) => {
	const text = paragraph.textContent;
	console.log(text.split(/(\s+)/));
	paragraph.innerHTML = text.split(/(\s+)/).map((part) => {
		if (part.trim() === " ") {
			return part;
		} else {
			return part
				.split("")
				.map((char) => {
					if (char === " ") return;
					console.log(char);
					return `<span style="opacity:0;display: inline-block;">${char}</span/>`;
				})
				.join("");
		}
	});
	// console.log(paragraph.innerHTML);
});
function flickerAnimation(targets, toOpacity) {
	gsap.to(targets, {
		opacity: toOpacity,
		duration: 0.1,
		stagger: {
			amount: 0.9,
			from: "start",
		},
	});
}
flickerAnimation(".heroIntro p span", 1);
ScrollTrigger.create({
	trigger: ".container",
	start: "top -1%",
	end: () => "+=50%",
	onEnter: () => flickerAnimation(".heroIntro p span", 1),
	onLeave: () => flickerAnimation(".heroIntro p span", 0),
	onEnterBack: () => flickerAnimation(".heroIntro p span", 1),
	onLeaveBack: () => flickerAnimation(".heroIntro p span", 0),
});
gsap.from(".heroIntro h1", {
	x: 150,
	duration: 1.5,
	ease: "easeIn",
});

gsap.ticker.lagSmoothing(0);

ScrollTrigger.create({
	trigger: ".containe",
	start: "top top",
	end: "+=100%",
	pin: true,
	// markers: true,
	onUpdate: (self) => {
		const progress = self.progress;
		gsap.to(".heroIntro h1", {
			// opacity: 1 - 1 * progress,
			x: 1200 * progress,
		});
		gsap.to(".heroIntro p", {
			// opacity: 1 - 1 * progress,
			x: 700 * progress,
		});

		gsap.set(".pinningHero", {
			clipPath: `polygon(${gsap.utils.interpolate(
				0,
				0,
				progress
			)}% ${gsap.utils.interpolate(0, 0, progress)}%,
            ${gsap.utils.interpolate(
							50,
							100,
							progress
						)}% ${gsap.utils.interpolate(
				0,
				0,
				progress
			)}%,${gsap.utils.interpolate(
				50,
				100,
				progress
			)}% ${gsap.utils.interpolate(100, 100, progress)}%,
            ${gsap.utils.interpolate(0, 0, progress)}% ${gsap.utils.interpolate(
				100,
				100,
				progress
			)}%)`,
		});
		gsap.to(".pinningHero img", {
			scale: 2 - 1 * progress,
			filter: `grayscale(${100 - 100 * progress}%)`,
		});
	},
});
