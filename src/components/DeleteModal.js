import React from "react";
import ActionButton from "./ActionButton";
import DeleteIcon from "./icons/DeleteIcon";

const DeleteModal = ({ isOpen, onClose, onConfirm, filename = "" }) => {
	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-[60] overflow-y-auto">
			<div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
					onClick={onClose}
				></div>

				<div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
					<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
						<div className="sm:flex sm:items-start">
							<div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<DeleteIcon className="h-10 w-10 text-red-600" />
							</div>
							<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
								<h3
									className="text-lg leading-6 font-medium text-gray-900"
									id="modal-title"
								>
									Delete File
								</h3>
								<div className="mt-2">
									<p className="text-sm text-gray-500">
										Are you sure you want to delete{" "}
										<span className="font-medium text-gray-900">
											{filename}
										</span>
										? This action cannot be undone.
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-3">
						<ActionButton type="delete" onClick={onConfirm}>
							Delete
						</ActionButton>
						<ActionButton type="cancel" onClick={onClose}>
							Cancel
						</ActionButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
