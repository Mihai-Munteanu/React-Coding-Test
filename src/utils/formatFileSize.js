/**
 * Format file size in bytes to human-readable format
 * @param {number} size
 * @returns {string} 
 */
export const formatFileSize = (size) => {
	if (size >= 1024 * 1024) {
		return `${(size / (1024 * 1024)).toFixed(2)} MB`;
	}
	return `${(size / 1024).toFixed(2)} KB`;
};
