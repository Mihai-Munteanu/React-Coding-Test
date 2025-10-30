import React from "react";
import ActionButton from "./ActionButton";
import DownloadIcon from "./icons/DownloadIcon";
import DeleteIcon from "./icons/DeleteIcon";
import FileIcon from "./icons/FileIcon";
import { formatFileSize } from "../utils/formatFileSize";
import { formatDate } from "../utils/formatDate";

const FileDetail = ({ file, onClose, onDownload, onDelete }) => {
	if (!file) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				{/* Background overlay */}
				<div
					className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
					onClick={onClose}
				></div>

				{/* Modal panel */}
				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						{/* Close button */}
						<div className="flex justify-end">
							<button
								onClick={onClose}
								className="text-gray-400 hover:text-gray-600"
							>
								<svg
									className="h-6 w-6"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							</button>
						</div>

						{/* File icon */}
						<div className="mt-4 flex justify-center">
							<div className="h-16 w-16 bg-indigo-100 rounded-lg flex items-center justify-center">
								<FileIcon className="h-10 w-10 text-indigo-600" />
							</div>
						</div>

						{/* File details */}
						<div className="mt-6">
							<h3 className="text-lg font-medium text-gray-900 text-center">
								{file.name}
							</h3>

							<div className="mt-4 space-y-3">
								<div className="flex justify-between border-b pb-2">
									<span className="text-sm font-medium text-gray-500">
										Upload Date:
									</span>
									<span className="text-sm text-gray-900">
										{formatDate(file.created_at)}
									</span>
								</div>

								{file.description && (
									<div className="border-b pb-2">
										<span className="text-sm font-medium text-gray-500 block mb-1">
											Description:
										</span>
										<p className="text-sm text-gray-900">
											{file.description}
										</p>
									</div>
								)}

								{file.size && (
									<div className="flex justify-between border-b pb-2">
										<span className="text-sm font-medium text-gray-500">
											Size:
										</span>
										<span className="text-sm text-gray-900">
											{formatFileSize(file.size)}
										</span>
									</div>
								)}
							</div>
						</div>
					</div>

					{/* Action buttons */}
					<div className="bg-gray-50 px-4 py-3 sm:px-6 flex flex-row-reverse gap-3">
						<ActionButton
							type="delete"
							onClick={() => onDelete(file.id, file.name)}
						>
							<DeleteIcon className="h-5 w-5 mr-2" />
							Delete
						</ActionButton>
						<ActionButton
							type="download"
							onClick={() => onDownload(file.id, file.name)}
						>
							<DownloadIcon className="h-5 w-5 mr-2" />
							Download
						</ActionButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileDetail;
