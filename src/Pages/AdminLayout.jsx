import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase/Firebase.config";

const AdminLayout = () => {
    const [user] = useAuthState(auth);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full w-64 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6 shadow-md
          transform transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 z-50
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <div className="mb-8">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <p className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                        {user?.displayName || "Admin"}
                    </p>
                    <p className="text-xs">{user?.email}</p>
                </div>
                <nav className="flex flex-col gap-4 text-sm font-medium">
                    <NavLink
                        to="profile"
                        className={({ isActive }) =>
                            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                        }
                        onClick={() => setSidebarOpen(false)} // close on nav click (mobile)
                    >
                        🧑 Admin Profile
                    </NavLink>
                    <NavLink
                        to="manage-users"
                        className={({ isActive }) =>
                            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        👥 Manage Users
                    </NavLink>
                    <NavLink
                        to="make-announcement"
                        className={({ isActive }) =>
                            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        📢 Make Announcement
                    </NavLink>
                    <NavLink
                        to="reports"
                        className={({ isActive }) =>
                            isActive ? "text-purple-600 font-semibold" : "hover:text-purple-500"
                        }
                        onClick={() => setSidebarOpen(false)}
                    >
                        🚨 Reported Activities
                    </NavLink>
                </nav>
            </aside>

            {/* Main Content area */}
            <div className="flex-1 flex flex-col">
                {/* Mobile header with toggle */}
                <header className="md:hidden flex items-center justify-between bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-4 shadow-md">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        aria-label="Open sidebar"
                        className="text-2xl font-bold"
                    >
                        ☰
                    </button>
                    <h1 className="text-lg font-semibold">Admin Panel</h1>
                </header>

                <main className="p-6 bg-white dark:bg-gray-800 min-h-screen overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
