import type { Toc } from "@/@types/md";

interface TocComponentProps {
	toc: Toc[];
}

const Toc: React.FC<TocComponentProps> = ({ toc }) => {
	return (
		<div className="sticky top-20 z-20  pt-0 mt-10 h-fit max-lg:hidden w-fit p-4 border-l-[1px] ">
			{/* TOC Rendering */}
			<div className="flex flex-col gap-4 w-full overflow-y-auto  ">
				<h3 className="text-lg"> Contents</h3>

				<ul className="flex flex-col gap-2 text-md">
					{toc.map((h) => (
						<li key={h.slug}>
							<a
								className="pl-2 text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 transition-all ease-in-out"
								href={`#${h.slug}`}
							>
								{h.title}
							</a>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default Toc;
