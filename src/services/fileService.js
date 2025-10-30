import axios from "axios";
import { API_ENDPOINTS } from "../config/api";
import { USER_FRIENDLY_ERRORS } from "../config/fileValidation";

const AUTH_TOKEN = "artificially-token";

/**
 * @param {Object} params
 * @param {string} params.search
 * @param {string} params.sortBy
 * @param {string} params.sortOrder
 * @returns {Promise<Array>}
 */
export const fetchFiles = async ({
	search,
	sortBy,
	sortOrder,
	page = 1,
	perPage = 10,
} = {}) => {
	try {
		const params = {};

		if (search) {
			params["filter[name]"] = search;
		}

		if (sortBy) {
			params["sort"] = sortOrder === "desc" ? `-${sortBy}` : sortBy;
		}

		params["page"] = page;
		params["per_page"] = perPage;

		const response = await axios.get(API_ENDPOINTS.files, { params });
		return response.data;
	} catch (error) {
		console.error("Error fetching files:", error);
		throw new Error(
			error.response?.data?.message || USER_FRIENDLY_ERRORS.FETCH_FAILED
		);
	}
};

/**
 * @param {Object} params
 * @param {File} params.file
 * @param {string} params.description
 * @returns {Promise<Object>}
 */
export const uploadFile = async ({ file, description = "" }) => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		if (description) {
			formData.append("description", description);
		}

		const response = await axios.post(API_ENDPOINTS.upload, formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${AUTH_TOKEN}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error uploading file:", error);
		throw new Error(
			error.response?.data?.message || USER_FRIENDLY_ERRORS.UPLOAD_FAILED
		);
	}
};

/**
 * @param {Object} params
 * @param {string} params.fileId
 * @param {string} params.filename
 */
export const downloadFile = async ({ fileId, filename }) => {
	try {
		const response = await axios.get(API_ENDPOINTS.download(fileId), {
			responseType: "blob",
		});

		const url = window.URL.createObjectURL(new Blob([response.data]));
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", filename);
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.URL.revokeObjectURL(url);
	} catch (error) {
		console.error("Error downloading file:", error);
		throw new Error(
			error.response?.data?.message ||
				USER_FRIENDLY_ERRORS.DOWNLOAD_FAILED
		);
	}
};

/**
 * @param {Object} params
 * @param {string} params.fileId
 * @returns {Promise<Object>}
 */
export const deleteFile = async ({ fileId }) => {
	try {
		const response = await axios.delete(API_ENDPOINTS.delete(fileId), {
			headers: {
				Authorization: `Bearer ${AUTH_TOKEN}`,
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error deleting file:", error);
		throw new Error(
			error.response?.data?.message || USER_FRIENDLY_ERRORS.DELETE_FAILED
		);
	}
};
