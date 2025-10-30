import React, { useState, useEffect, useCallback } from "react";
import { fetchFiles } from "../services/fileService";

/**
 * Custom hook for managing paginated files
 * @returns {Object} Files state and control functions
 */
export const usePaginatedFiles = () => {
	const [files, setFiles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	const [sortBy, setSortBy] = useState("name");
	const [sortOrder, setSortOrder] = useState("asc");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [itemsPerPage, setItemsPerPage] = useState(10);

	const loadFiles = useCallback(async () => {
		try {
			setLoading(true);
			setError(null);
			const response = await fetchFiles({
				search: searchQuery,
				sortBy,
				sortOrder,
				page: currentPage,
				perPage: 10,
			});

			// Handle Laravel pagination response
			if (response.data && typeof response.last_page !== "undefined") {
				// Laravel pagination format
				setFiles(response.data);
				setTotalPages(response.last_page);
				setTotalItems(response.total || response.data.length);
				setItemsPerPage(response.per_page || 10);
			} else if (response.data && response.meta) {
				// Spatie pagination format
				setFiles(response.data);
				setTotalPages(response.meta.pagination?.pages || 1);
				setTotalItems(
					response.meta.pagination?.total || response.data.length
				);
				setItemsPerPage(response.meta.pagination?.per_page || 10);
			} else if (Array.isArray(response)) {
				// Fallback for non-paginated response
				setFiles(response);
				setTotalPages(1);
				setTotalItems(response.length);
				setItemsPerPage(10);
			} else if (response.data) {
				// Another possible format
				setFiles(response.data || []);
				setTotalPages(response.meta?.pagination?.pages || 1);
				setTotalItems(
					response.meta?.pagination?.total || response.data.length
				);
				setItemsPerPage(response.meta?.pagination?.per_page || 10);
			}
		} catch (err) {
			setError(err.message);
			console.error("Error loading files:", err);
		} finally {
			setLoading(false);
		}
	}, [searchQuery, sortBy, sortOrder, currentPage]);

	// Reset to page 1 when search query changes
	useEffect(() => {
		if (currentPage !== 1) {
			setCurrentPage(1);
		}
	}, [searchQuery]);

	// Load files when filters or page change
	useEffect(() => {
		loadFiles();
	}, [loadFiles]);

	const handleFileUploaded = () => {
		setCurrentPage(1); // Go to first page after upload
		loadFiles();
	};

	const handleFileDeleted = () => {
		const willBeLastPage = currentPage > 1 && files.length === 1;
		if (willBeLastPage) {
			setCurrentPage(currentPage - 1);
		}
		loadFiles();
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	return {
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
	};
};
