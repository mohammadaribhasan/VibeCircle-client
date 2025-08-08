import { useEffect, useState } from "react";
import axios from "axios";

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(users)
    const fetchUsers = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/users?search=${encodeURIComponent(search)}`
            );
            setUsers(res.data.users);
        } catch (err) {
            setError("Failed to fetch users");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const makeAdmin = async (email) => {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/make-admin/${email}`);
            fetchUsers();
        } catch (err) {
            setError("Failed to make admin");
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl text-white font-bold mb-4">Manage Users</h2>
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by username"
                className="border p-2 mb-4 w-full text-white placeholder-white/60 bg-gray-900"
            />
            {error && <p className="text-red-600 mb-4">{error}</p>}
            {loading ? (
                <p>Loading users...</p>
            ) : (
                <table className="w-full border border-collapse text-white/80">
                    <thead>
                        <tr>
                            <th className="border px-3 py-2">Name</th>
                            <th className="border px-3 py-2">Email</th>
                            <th className="border px-3 py-2">Make Admin</th>
                            <th className="border px-3 py-2">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4 text-white/70">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            users.map((u) => (
                                <tr key={u.email}>
                                    <td className="border px-3 py-2">{u.name || "N/A"}</td>
                                    <td className="border px-3 py-2">{u.email}</td>
                                    <td className="border px-3 py-2 text-center">
                                        {u.role === "admin" ? (
                                            "Already Admin"
                                        ) : (
                                            <button
                                                onClick={() => makeAdmin(u.email)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                                            >
                                                Make Admin
                                            </button>
                                        )}
                                    </td>
                                    <td className="border px-3 py-2">{u.role || "user"}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default ManageUsers;
