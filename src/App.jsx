import sampleVideo from "./assets/video.jpg"
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'
import { motion, useTransform, useSpring, useScroll } from "framer-motion"

function App() {
	const ref = useRef(null);
	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ["start start", "end start"]
	})

	useEffect(() => {
		const lenis = new Lenis()

		function raf(time) {
			lenis.raf(time)
			requestAnimationFrame(raf)
		}

		requestAnimationFrame(raf)
	}, [])


	const spring = {
		stiffness: 100,
		damping: 20,
		restDelta: 0.001,
	};

	const springYProgress = useSpring(scrollYProgress, spring);

	const scale = useTransform(springYProgress, [0, 0.3], [0.9, 1]);
	const scaleBox = useTransform(springYProgress, [0.3, 0.4], [1, 0]);
	const y = useTransform(springYProgress, [0.3, 0.4], ["200px", "-50%"]);
	const videoScale = useTransform(springYProgress, [0.3, 0.4], ["0", "1"]);

	return (
		<>
			<div style={{ height: "100vh" }} />
			<section ref={ref} className='banner'>
				<motion.div style={{ scale }} className="banner_inner">
					<motion.div style={{ scale: scaleBox }} className="text">
						<h1>Hello Motion Framer</h1>
						<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae veritatis exercitationem molestias cumque cupiditate vitae perferendis at nulla expedita amet saepe et, sit veniam!</p>
					</motion.div>
					<motion.div
						style={{
							x: "-50%",
							y,
							scale: videoScale,
						}}
						className="video">
						<img src={sampleVideo} alt="" />
					</motion.div>
				</motion.div>
			</section>
			<div style={{ height: "100vh" }} />
		</>
	)
}

export default App
