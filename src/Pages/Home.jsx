import React, { useEffect, useState } from 'react';
import Hero from '../Component/Hero';
import Tags from '../Component/Tags';
import PostCard from './PostCard';
import Announcements from './Announcements';
// import AnnouncementList from '../Component/AnnouncementList';


const Home = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);
    const [sortBy, setSortBy] = useState('newest'); // default sort
    const postsPerPage = 6;

    // Fetch posts with pagination & sorting & optional tag search
    const fetchPosts = async (searchQuery = '', pageNum = 1, sort = 'newest') => {
        setLoading(true);
        try {
            let url = `https://vibe-circle-sarver.vercel.app/api/posts?page=${pageNum}&limit=${postsPerPage}&sort=${sort}`;

            if (searchQuery) {
                url += `&tag=${encodeURIComponent(searchQuery)}`;
            }

            const res = await fetch(url);
            const data = await res.json();

            setPosts(data.posts || []);
            setTotalPosts(data.totalPosts || 0);
        } catch (error) {
            console.error('Failed to fetch posts:', error);
            setPosts([]);
            setTotalPosts(0);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts('', page, sortBy);
    }, [page, sortBy]);

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    return (
        <div>
            <Hero
                onSearch={(query) => {
                    setPage(1);
                    fetchPosts(query, 1, sortBy);
                }}
            />

            {/* Sort By Dropdown */}
            <div className="m-4">
                <label htmlFor="sort-select" className="mr-2 font-medium">
                    Sort By:
                </label>
                <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setPage(1);
                    }}
                    className="p-2 cursor-pointer border rounded"
                >
                    <option value="newest">Newest First</option>
                    <option value="popularity">Top Vote</option>
                    <option value="comments">Top Comment</option>
                </select>
            </div>

            {loading ? (
                <p className="text-center mt-10">Loading...</p>
            ) : (
                <PostCard posts={posts} />
            )}

            {/* Pagination */}
            <div className="flex justify-center gap-3 my-6">
                <button
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                >
                    Prev
                </button>
                <span className="px-3 py-1">
                    Page {page} of {totalPages || 1}
                </span>
                <button
                    disabled={page === totalPages || totalPages === 0}
                    onClick={() => setPage((p) => p + 1)}
                    className="px-3 py-1 rounded border disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            <Tags />

            {/* <AnnouncementList /> */}
            <Announcements />
        </div>
    );
};

export default Home;
