import { useEffect, useState } from "react";
import axios from "axios";

const Badge = ({ email }) => {
    const [membership, setMembership] = useState(false);

    useEffect(() => {
        const fetchMembership = async () => {
            try {
                const token = localStorage.getItem("access-token");
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL || "https://vibe-circle-sarver.vercel.app"}/api/users/${email}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setMembership(res.data?.member === true);
            } catch (error) {
                console.error("Failed to fetch badge info:", error);
            }
        };

        if (email) fetchMembership();
    }, [email]);

    return (
        <div className="flex gap-2 mt-2 items-center">
            {membership ? (
                <img
                    src="https://i.ibb.co/5g2KJXSQ/gold-removebg-preview.png"
                    alt="Gold Badge"
                    className="w-8"
                />
            ) : (
                <img
                    src="https://i.ibb.co/TBSt0rWx/bronze-removebg-preview.png"
                    alt="Bronze Badge"
                    className="w-8"
                />
            )}
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {membership ? "Gold Member" : "Bronze Member"}
            </span>
        </div>
    );
};

export default Badge;
