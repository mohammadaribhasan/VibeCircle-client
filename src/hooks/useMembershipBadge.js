// hooks/useMembershipBadge.js
import { useEffect, useState } from "react";
import axios from "axios";

const useMembershipBadge = (email) => {
  const [badge, setBadge] = useState("bronze"); // default: free user

  useEffect(() => {
    if (!email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL ||
            "https://vibe-circle-sarver.vercel.app"
          }/api/users/${email}`
        );
        const data = res.data;

        if (data?.membership === "gold") {
          setBadge("gold");
        } else {
          setBadge("bronze");
        }
      } catch (err) {
        console.error("Badge fetch failed:", err);
      }
    };

    fetchUser();
  }, [email]);

  return badge;
};

export default useMembershipBadge;
