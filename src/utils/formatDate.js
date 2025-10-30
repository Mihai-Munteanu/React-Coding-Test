/**
 * Format date to human-readable format
 * @param {string|Date} date
 * @returns {string}
 */
export const formatDate = (date) => {
	if (!date) return "";

	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};
