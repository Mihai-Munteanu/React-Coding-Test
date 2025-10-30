import React, { useState, memo } from "react";
import { downloadFile, deleteFile } from "../services/fileService";
import DeleteModal from "./DeleteModal";
import FileDetail from "./FileDetail";
import ActionButton from "./ActionButton";
import Pagination from "./Pagination";
import FileIcon from "./icons/FileIcon";
import DownloadIcon from "./icons/DownloadIcon";
import DeleteIcon from "./icons/DeleteIcon";
import { formatDate } from "../utils/formatDate";
import { formatFileSize } from "../utils/formatFileSize";

const FileList = memo(
	({
		files,
		loading,
		onFileDeleted,
		onSearchChange,
		onSortChange,
		onSortOrderChange,
		searchQuery,
		sortBy,
		sortOrder,
		currentPage,
		totalPages,
		totalItems,
		itemsPerPage,
		onPageChange,
	}) => {
		const [loadingFile, setLoadingFile] = useState(null);
		const [error, setError] = useState(null);
		const [deleteModalOpen, setDeleteModalOpen] = useState(false);
		const [deleteModalData, setDeleteModalData] = useState(null);
		const [selectedFile, setSelectedFile] = useState(null);

		const handleDownload = async (fileId, filename) => {
			try {
				setLoadingFile(fileId);
				setError(null);
				await downloadFile({ fileId, filename });
			} catch (err) {
				setError(err.message);
				console.error("Download error:", err);
			} finally {
				setLoadingFile(null);
			}
		};

		const handleDeleteClick = (fileId, filename) => {
			setDeleteModalData({ id: fileId, name: filename });
			setDeleteModalOpen(true);
		};

		const handleDeleteConfirm = async () => {
			if (!deleteModalData) return;

			try {
				setLoadingFile(deleteModalData.id);
				setError(null);
				await deleteFile({ fileId: deleteModalData.id });

				setDeleteModalOpen(false);
				setDeleteModalData(null);
				setSelectedFile(null);

				onFileDeleted();
			} catch (err) {
				// Close modals even on error
				setDeleteModalOpen(false);
				setDeleteModalData(null);
				setSelectedFile(null);

				// Show error message
				setError(err.message);
				console.error("Delete error:", err);
			} finally {
				setLoadingFile(null);
			}
		};

		const handleFileClick = (file) => {
			setSelectedFile(file);
		};

		const handleSort = (column) => {
			if (sortBy === column) {
				onSortOrderChange(sortOrder === "asc" ? "desc" : "asc");
			} else {
				onSortChange(column);
				onSortOrderChange("asc");
			}
		};

		const SortIcon = ({ column }) => {
			if (sortBy !== column) return null;
			return sortOrder === "asc" ? "▲" : "▼";
		};

		return (
			<>
				<div className="bg-white shadow overflow-hidden sm:rounded-lg">
					{/* Search and Sort Controls */}
					<div className="px-6 py-4 border-b border-gray-200">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
							{/* Search */}
							<div className="flex-1 max-w-md">
								<input
									type="text"
									placeholder="Search by name..."
									value={searchQuery}
									onChange={(e) =>
										onSearchChange(e.target.value)
									}
									className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-4 py-2 border"
								/>
							</div>
						</div>
					</div>

					{/* Loading state */}
					{loading && (
						<div className="p-8 text-center">
							<div className="flex justify-center">
								<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
							</div>
							<p className="mt-4 text-sm text-gray-600">
								Loading files...
							</p>
						</div>
					)}

					{/* Error message */}
					{error && (
						<div className="bg-red-50 border-l-4 border-red-400 p-4">
							<div className="flex">
								<div className="ml-3">
									<p className="text-sm text-red-700">
										{error}
									</p>
								</div>
							</div>
						</div>
					)}

					{/* Empty state */}
					{!loading && files.length === 0 && (
						<div className="bg-gray-50 rounded-lg p-8 text-center">
							<FileIcon className="mx-auto h-12 w-12 text-gray-400" />
							<h3 className="mt-2 text-sm font-medium text-gray-900">
								{searchQuery
									? "No files match your search"
									: "No files"}
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								{searchQuery
									? "Try a different search term."
									: "Get started by uploading a new file."}
							</p>
						</div>
					)}

					{/* Files table */}
					{!loading && files.length > 0 && (
						<div className="overflow-x-auto">
							<table className="min-w-full divide-y divide-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
											onClick={() => handleSort("name")}
										>
											<div className="flex items-center gap-1">
												Name <SortIcon column="name" />
											</div>
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
											onClick={() => handleSort("size")}
										>
											<div className="flex items-center gap-1">
												Size <SortIcon column="size" />
											</div>
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
											onClick={() =>
												handleSort("created_at")
											}
										>
											<div className="flex items-center gap-1">
												Upload Date{" "}
												<SortIcon column="created_at" />
											</div>
										</th>
										<th
											scope="col"
											className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
										>
											Actions
										</th>
									</tr>
								</thead>
								<tbody className="bg-white divide-y divide-gray-200">
									{files.map((file) => (
										<tr
											key={file.id}
											className="hover:bg-gray-50 cursor-pointer"
											onClick={() =>
												handleFileClick(file)
											}
										>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="flex items-center">
													<div className="flex-shrink-0 h-10 w-10">
														<FileIcon className="h-10 w-10 text-gray-400" />
													</div>
													<div className="ml-4">
														<div className="text-sm font-medium text-gray-900">
															{file.name}
														</div>
													</div>
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">
													{file.size
														? formatFileSize(
																file.size
														  )
														: "—"}
												</div>
											</td>
											<td className="px-6 py-4 whitespace-nowrap">
												<div className="text-sm text-gray-500">
													{formatDate(
														file.created_at
													)}
												</div>
											</td>
											<td
												className="px-6 py-4 whitespace-nowrap text-sm font-medium"
												onClick={(e) =>
													e.stopPropagation()
												}
											>
												<div className="flex space-x-2">
													<ActionButton
														type="download"
														onClick={() =>
															handleDownload(
																file.id,
																file.name
															)
														}
														disabled={
															loadingFile ===
															file.id
														}
													>
														{loadingFile ===
														file.id ? (
															"Loading..."
														) : (
															<>
																<DownloadIcon className="h-4 w-4 mr-1" />
																Download
															</>
														)}
													</ActionButton>

													<ActionButton
														type="delete"
														onClick={() =>
															handleDeleteClick(
																file.id,
																file.name
															)
														}
														disabled={
															loadingFile ===
															file.id
														}
													>
														<DeleteIcon className="h-4 w-4 mr-1" />
														Delete
													</ActionButton>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					)}

					{!loading && files.length > 0 && (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							totalItems={totalItems}
							itemsPerPage={itemsPerPage}
							onPageChange={onPageChange}
						/>
					)}
				</div>

				{/* Delete Confirmation Modal */}
				<DeleteModal
					isOpen={deleteModalOpen}
					onClose={() => {
						setDeleteModalOpen(false);
						setDeleteModalData(null);
					}}
					onConfirm={handleDeleteConfirm}
					filename={deleteModalData?.name}
				/>

				{/* File Detail Modal */}
				<FileDetail
					file={selectedFile}
					onClose={() => {
						setSelectedFile(null);
					}}
					onDownload={(fileId, filename) =>
						handleDownload(fileId, filename)
					}
					onDelete={(fileId, filename) =>
						handleDeleteClick(fileId, filename)
					}
				/>
			</>
		);
	}
);

export default FileList;
