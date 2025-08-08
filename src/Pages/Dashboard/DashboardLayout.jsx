import { Outlet, NavLink } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-gradient-to-b from-purple-800 to-indigo-900 shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Dashboard</h2>
                <nav className="space-y-4 text-lg">
                    <NavLink
                        to="/dashboard"
                        end
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${isActive ? "bg-white text-purple-700 font-semibold shadow" : "hover:bg-purple-600"
                            }`
                        }
                    >
                        My Profile
                    </NavLink>
                    <NavLink
                        to="/dashboard/add-post"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${isActive ? "bg-white text-purple-700 font-semibold shadow" : "hover:bg-purple-600"
                            }`
                        }
                    >
                        Add Post
                    </NavLink>
                    <NavLink
                        to="/dashboard/my-posts"
                        className={({ isActive }) =>
                            `block px-4 py-2 rounded-lg transition ${isActive ? "bg-white text-purple-700 font-semibold shadow" : "hover:bg-purple-600"
                            }`
                        }
                    >
                        My Posts
                    </NavLink>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 bg-gradient-to-b from-gray-800 via-gray-900 to-black min-h-screen overflow-y-auto">
                <div className="max-w-6xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
