/**
 * File validation configuration
 */
export const FILE_VALIDATION = {
	MAX_SIZE: 10 * 1024 * 1024, // 10MB
	ACCEPTED_FILE_TYPES: [
		"application/pdf",
		"application/msword",
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
		"application/vnd.ms-excel", // .xls
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
		"text/plain", // .txt
		"image/jpeg",
		"image/jpg",
		"image/png",
		"image/gif",
		"image/webp",
	],
	ACCEPTED_EXTENSIONS: [
		".pdf",
		".doc",
		".docx",
		".xls",
		".xlsx",
		".txt",
		".jpg",
		".jpeg",
		".png",
		".gif",
		".webp",
	],
};

export const USER_FRIENDLY_ERRORS = {
	UPLOAD_FAILED: "Unable to upload file. Please try again.",
	FETCH_FAILED: "Unable to load files. Please try again later.",
	DOWNLOAD_FAILED: "Unable to download file. Please try again.",
	DELETE_FAILED: "Unable to delete file. Please try again.",
	INVALID_FILE_TYPE:
		"Invalid file type. Please upload PDF, DOC, DOCX, XLS, XLSX, TXT, JPG, JPEG, PNG, GIF, or WEBP files.",
	FILE_TOO_LARGE: "File size too large. Maximum size is 10MB.",
};
