import { useEffect } from "react";

const Page = ({ title, children }) => {
    useEffect(() => {
        document.title = title || "VibeCircle";
    }, [title]);

    return children;
};

export default Page;
