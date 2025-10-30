import React from "react";

const ActionButton = ({
	type = "download",
	onClick,
	disabled = false,
	children,
	className = "",
}) => {
	const buttonStyles = {
		download:
			"bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 border-transparent",
		delete: "bg-red-600 hover:bg-red-700 focus:ring-red-500 border-transparent",
		cancel: "bg-white hover:bg-gray-50 focus:ring-indigo-500 text-gray-700 border-gray-300",
	};

	const baseStyles =
		"inline-flex items-center px-3 py-2 border text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

	return (
		<button
			type="button"
			onClick={onClick}
			disabled={disabled}
			className={`${baseStyles} ${buttonStyles[type]} ${className}`}
		>
			{children}
		</button>
	);
};

export default ActionButton;
