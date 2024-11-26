"use client";
import { motion } from "framer-motion";

const variants = {
	initial: {
		opacity: 0,
	},
	enter: {
		opacity: 1,
		transition: {
			duration: 0.8,
			ease: "easeInOut",
		},
	},
	exit: {
		opacity: 0,
		transition: {
			duration: 0.5,
			ease: "easeInOut",
		},
	},
};
const PageTransition = ({ children }: React.PropsWithChildren) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{
				duration: 0.8,
				delay: 0.2,
				ease: "easeInOut",
			}}
			variants={variants}
		>
			{children}
		</motion.div>
	);
};

export default PageTransition;