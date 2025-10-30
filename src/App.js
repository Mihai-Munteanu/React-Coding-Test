import React from "react";
import FileList from "./components/FileList";
import FileUpload from "./components/FileUpload";
import { usePaginatedFiles } from "./hooks/usePaginatedFiles";
import "./index.css";

function App() {
	const {
		files,
		loading,
		error,
		searchQuery,
		setSearchQuery,
		sortBy,
		setSortBy,
		sortOrder,
		setSortOrder,
		currentPage,
		totalPages,
		totalItems,
		itemsPerPage,
		handleFileUploaded,
		handleFileDeleted,
		handlePageChange,
	} = usePaginatedFiles();

	return (
		<div className="min-h-screen bg-gray-100">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
				{/* Header */}
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-gray-900">
						File Management System
					</h1>
				</div>

				{/* Error Message */}
				{error && (
					<div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
						<div className="flex">
							<div className="ml-3">
								<h3 className="text-sm font-medium text-red-800">
									Error loading files
								</h3>
								<p className="mt-1 text-sm text-red-700">
									{error}
								</p>
							</div>
						</div>
					</div>
				)}

				{/* File Upload Section */}
				<div className="mb-8">
					<FileUpload onFileUploaded={handleFileUploaded} />
				</div>

				{/* File List Section */}
				<div>
					<div className="mb-4">
						<h2 className="text-xl font-semibold text-gray-900">
							Your Files
						</h2>
					</div>

					<FileList
						files={files}
						loading={loading}
						onFileDeleted={handleFileDeleted}
						searchQuery={searchQuery}
						onSearchChange={setSearchQuery}
						sortBy={sortBy}
						onSortChange={setSortBy}
						sortOrder={sortOrder}
						onSortOrderChange={setSortOrder}
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={totalItems}
						itemsPerPage={itemsPerPage}
						onPageChange={handlePageChange}
					/>
				</div>

				{/* Footer */}
				<div className="mt-12 text-center text-sm text-gray-500">
					<p>
						Built for{" "}
						<a
							href="https://artificially.io"
							target="_blank"
							rel="noopener noreferrer"
							className="text-indigo-600 hover:text-indigo-700"
						>
							Artificially
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}

export default App;
