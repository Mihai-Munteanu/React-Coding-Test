import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

const Pagination = ({
	currentPage,
	totalPages,
	totalItems,
	itemsPerPage,
	onPageChange,
}) => {
	if (totalPages <= 1) return null;

	return (
		<div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
			{/* Mobile pagination */}
			<div className="flex flex-1 justify-between sm:hidden">
				<button
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Previous
				</button>
				<button
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
				>
					Next
				</button>
			</div>

			{/* Desktop pagination */}
			<div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
				<div>
					<p className="text-sm text-gray-700">
						Showing{" "}
						<span className="font-medium">
							{(currentPage - 1) * itemsPerPage + 1}
						</span>{" "}
						to{" "}
						<span className="font-medium">
							{Math.min(currentPage * itemsPerPage, totalItems)}
						</span>{" "}
						of <span className="font-medium">{totalItems}</span>{" "}
						results
					</p>
				</div>
				<div>
					<nav
						aria-label="Pagination"
						className="isolate inline-flex -space-x-px rounded-md shadow-sm"
					>
						<button
							onClick={() => onPageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<span className="sr-only">Previous</span>
							<ChevronLeftIcon
								aria-hidden="true"
								className="size-5"
							/>
						</button>

						{/* Page numbers */}
						{Array.from(
							{ length: totalPages },
							(_, i) => i + 1
						).map((page) => {
							// Show first page, last page, current page, and pages around current
							if (
								page === 1 ||
								page === totalPages ||
								(page >= currentPage - 1 &&
									page <= currentPage + 1)
							) {
								return (
									<button
										key={page}
										onClick={() => onPageChange(page)}
										aria-current={
											page === currentPage
												? "page"
												: undefined
										}
										className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 ${
											page === currentPage
												? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
												: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
										}`}
									>
										{page}
									</button>
								);
							} else if (
								page === currentPage - 2 ||
								page === currentPage + 2
							) {
								return (
									<span
										key={page}
										className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
									>
										...
									</span>
								);
							}
							return null;
						})}

						<button
							onClick={() => onPageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<span className="sr-only">Next</span>
							<ChevronRightIcon
								aria-hidden="true"
								className="size-5"
							/>
						</button>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Pagination;
