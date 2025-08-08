import React, { useState } from 'react';

const Hero = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
        setQuery('');  // <-- Clear input field after submit
    };

    return (
        <div
            className="w-full rounded-3xl min-h-screen bg-cover bg-center flex items-center justify-center px-4"
            style={{
                backgroundImage: `url('https://i.ibb.co/WvjsS90v/Gemini-Generated-Image-r8oy02r8oy02r8oy.png')`,
            }}
        >
            <div className=" w-full max-w-4xl text-center text-white mt-4 rounded-xl ">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Start Small. Dream Big. Code MERN.
                </h1>
                <p className="text-lg md:text-xl mb-6">
                    Showcase your skills by building a scalable, secure, and user-friendly forum with real-time features, modern UI, and full MERN stack integration.
                </p>

                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <input
                        type="text"
                        placeholder="Search discussions..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full sm:w-2/3 px-4 py-3 rounded-lg border ring-2 ring-blue-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-6 py-3 rounded-lg transition"
                    >
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Hero;
