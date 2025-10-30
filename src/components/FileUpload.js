import React, { useState } from "react";
import { uploadFile } from "../services/fileService";
import { formatFileSize } from "../utils/formatFileSize";
import UploadIcon from "./icons/UploadIcon";
import {
	FILE_VALIDATION,
	USER_FRIENDLY_ERRORS,
} from "../config/fileValidation";

const FileUpload = ({ onFileUploaded }) => {
	const [file, setFile] = useState(null);
	const [description, setDescription] = useState("");
	const [error, setError] = useState(null);
	const [uploading, setUploading] = useState(false);

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];

		if (!selectedFile) {
			setFile(null);
			setError(null);
			return;
		}

		// Validate file type
		const fileExtension =
			"." + selectedFile.name.split(".").pop().toLowerCase();
		if (
			!FILE_VALIDATION.ACCEPTED_FILE_TYPES.includes(selectedFile.type) &&
			!FILE_VALIDATION.ACCEPTED_EXTENSIONS.includes(fileExtension)
		) {
			setError(USER_FRIENDLY_ERRORS.INVALID_FILE_TYPE);
			setFile(null);
			return;
		}

		if (selectedFile.size > FILE_VALIDATION.MAX_SIZE) {
			setError(USER_FRIENDLY_ERRORS.FILE_TOO_LARGE);
			setFile(null);
			return;
		}

		setError(null);
		setFile(selectedFile);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!file) {
			setError("Please select a file to upload.");
			return;
		}

		try {
			setUploading(true);
			setError(null);
			await uploadFile({ file, description });
			setFile(null);
			setDescription("");
			document.getElementById("file-upload").value = "";
			onFileUploaded();
		} catch (err) {
			setError(
				err.response?.data?.message ||
					USER_FRIENDLY_ERRORS.UPLOAD_FAILED
			);
			console.error("Upload error:", err);
		} finally {
			setUploading(false);
		}
	};

	return (
		<div className="bg-white shadow sm:rounded-lg">
			<div className="px-4 py-5 sm:p-6">
				<h3 className="text-lg leading-6 font-medium text-gray-900">
					Upload a new file
				</h3>

				<form onSubmit={handleSubmit} className="mt-5">
					<div className="mb-4">
						<label
							htmlFor="file-upload"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Choose file
						</label>
						<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors">
							<div className="space-y-1 text-center">
								<UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
								<div className="flex text-sm text-gray-600">
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
									>
										<span>Upload a file</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											className="sr-only"
											onChange={handleFileChange}
											accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif,.webp"
										/>
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p className="text-xs text-gray-500">
									PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, JPEG,
									PNG, GIF, WEBP up to 10MB
								</p>
							</div>
						</div>

						{file && (
							<div className="mt-2 text-sm text-gray-600">
								Selected:{" "}
								<span className="font-medium">{file.name}</span>{" "}
								({formatFileSize(file.size)})
							</div>
						)}
					</div>

					<div className="mb-4">
						<label
							htmlFor="description"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Description (optional)
						</label>
						<textarea
							id="description"
							name="description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							maxLength={500}
							rows={4}
							className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3 py-2"
							placeholder="Add a description..."
						/>
					</div>

					{error && (
						<div className="mb-4 bg-red-50 border-l-4 border-red-400 p-4">
							<div className="flex">
								<div className="ml-3">
									<p className="text-sm text-red-700">
										{error}
									</p>
								</div>
							</div>
						</div>
					)}

					<button
						type="submit"
						disabled={uploading || !file}
						className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{uploading ? "Uploading..." : "Upload File"}
					</button>
				</form>
			</div>
		</div>
	);
};

export default FileUpload;
