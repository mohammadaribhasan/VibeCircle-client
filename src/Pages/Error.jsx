import React from "react";
import { Link, useRouteError } from "react-router-dom";

const Error = () => {
    const error = useRouteError();

    // You can check error.status to differentiate error types
    const isNotFound = error?.status === 404;

    if (isNotFound) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 sm:p-8">
                <div className="max-w-md w-full backdrop-blur-3xl bg-green-700 rounded-2xl shadow-xl p-8 sm:p-10 text-center transform hover:scale-105 transition-transform duration-500 ease-in-out">
                    <div className="mb-6">
                        <svg
                            className="mx-auto w-24 h-24 text-blue-500 animate-bounce-slow"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.5"
                                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2A9 9 0 111 10a9 9 0 0118 0z"
                            ></path>
                        </svg>
                    </div>

                    <h1 className="text-6xl sm:text-7xl font-extrabold text-gray-800 dark:text-white tracking-tight animate-fade-in-down">
                        404
                    </h1>

                    <p className="mt-4 text-xl sm:text-2xl text-gray-700 dark:text-gray-200 font-semibold leading-relaxed animate-fade-in">
                        Oops! Page Not Found
                    </p>

                    <p className="mt-2 text-md sm:text-lg text-gray-500 dark:text-gray-400 animate-fade-in delay-200">
                        The page you're looking for might have been moved, deleted, or never existed.
                    </p>

                    <Link
                        to="/"
                        className="mt-8 inline-block px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-1"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        );
    }

    // Generic error UI for other errors
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
            <p className="mb-2 text-center">
                {error?.statusText || error?.message || "Unknown error occurred"}
            </p>
            <Link
                to="/"
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
                Go Back Home
            </Link>
        </div>
    );
};

export default Error;
