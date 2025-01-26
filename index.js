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

gsap.set(".img", { y: 500 });
gsap.set(".loaderImages", { x: 500 });

gsap.set("nav", {
	opacity: 0,
});
gsap.set(".hero h1", {
	opacity: 0,
	y: 200,
});
gsap.set("item,footer", { y: 200, opacity: 0 });
gsap.ticker.lagSmoothing(0);

const tl = gsap.timeline({ delay: 0 });

// Timelines for initial Animation
tl.to(".img", {
	y: 0,
	duration: 1.5,
	stagger: 0.5,
	ease: "power3.inOut",
})
	.to(
		".loaderImages",
		{
			x: 0,
			duration: 1,
			ease: "power3.inOut",
		},
		"-=0.8"
	)
	.to(".img:not(#logo)", {
		clipPath: "polygon(0% 0%,100% 0%,100% 0%, 0% 0%)",
		stagger: 0.2,
		ease: "power3.inOut",
	})
	.to(".loaderImages", {
		ease: "power3.inOut",
		clipPath: "polygon(0% 0%,100% 0%,100% 0%, 0% 0%)",
	})
	.to("nav,.item,footer", {
		y: 0,
		opacity: 1,
		stagger: 0.5,
		ease: "power3.inOut",
	})
	.to(
		"h1",
		{
			opacity: 1,
			y: 90,
			stagger: 0.4,
		},
		"+=0"
	);

ScrollTrigger.create({
	trigger: ".textPage",
	start: "top bottom%",
	end: "bottom top",
	// pin: true,
	// markers: true,
	scrub: true,
	onUpdate: (self) => {
		const progress = self.progress;
		gsap.set(".firstText,.secondText", {
			// x: `-=${1000 * progress}px`,
			x: -1000 * progress,
			overwrite: true,
			scale: 1 - 0.2 * progress,
			opacity: 1 - 1 * progress,
		});
		gsap.set(".thirdText", {
			// x: `+=${1000 * progress}px`,
			x: 1000 * progress,
			scale: 1 - 0.2 * progress,
			opacity: 1 - 1 * progress,

			// overwrite: true,
		});
	},
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
	trigger: ".containe",
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
	markers: true,
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
