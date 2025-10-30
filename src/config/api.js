// API Configuration
export const API_BASE_URL =
	process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
	files: `${API_BASE_URL}/files`,
	upload: `${API_BASE_URL}/files`,
	download: (fileId) => `${API_BASE_URL}/files/${fileId}/download`,
	delete: (fileId) => `${API_BASE_URL}/files/${fileId}`,
};
