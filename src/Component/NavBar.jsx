import React, { useContext, useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';
import { valueConText } from '../RootLayout/RootLayout';
import { IoNotifications } from "react-icons/io5";
import { isAdmin } from '../utils/isAdmin';
import useMembershipBadge from "../hooks/useMembershipBadge";

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, handleLogOut } = useContext(valueConText);
    const badge = useMembershipBadge(user?.email);
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

    const toggleProfileDropdown = () => setProfileDropdownOpen(prev => !prev);

    const handleLogOutAndRedirect = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, logout!',
        }).then((result) => {
            if (result.isConfirmed) {
                handleLogOut();
                navigate('/');
                Swal.fire('Logged out!', 'You have been logged out.', 'success');
            }
        });
    };

    const navLinkClasses = ({ isActive }) =>
        `text-lg font-medium ${isActive ? 'text-purple-500 underline' : 'text-foreground dark:text-foreground-dark'}`;

    const navItems = (
        <>
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/membership" className={navLinkClasses}>Membership</NavLink></li>
        </>
    );

    const toggleTheme = () => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        html.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <div className="navbar max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 sticky top-0 z-50 bg-background dark:bg-background-dark backdrop-blur-md">
            {/* Navbar Start */}
            <div className="navbar-start flex items-center">
                {/* Mobile Menu Button */}
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 z-50">
                        {navItems}
                    </ul>
                </div>

                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2">
                    <img src="https://i.ibb.co/46jL02y/Gemini-Generated-Image-ykjar2ykjar2ykja-removebg-preview.png" className="w-8 h-8 mr-2" alt="Logo" />
                    <h1 className="hidden md:block text-2xl lg:text-3xl font-extrabold tracking-tight leading-snug drop-shadow-xl">
                        <span className="bg-gradient-to-r from-green-600 via-lime-400 to-emerald-500 text-transparent bg-clip-text">Vibe</span>
                        <span style={{ color: "#cfd9db" }}>Circle</span>
                    </h1>
                </NavLink>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{navItems}</ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center gap-4 relative">
                <IoNotifications className='h-5 w-5 cursor-pointer' />

                {/* Theme Toggle */}
                <label className="swap swap-rotate">
                    <input type="checkbox" onChange={toggleTheme} />
                    <svg className="swap-on fill-current w-6 h-6 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M5.64 17.66l-1.41 1.41 1.06 1.06 1.41-1.41-1.06-1.06zM12 4V1h-1v3h1zm0 19v-3h-1v3h1zM21.64 13.36A9 9 0 1110.64 2.36a7 7 0 1011 11z" />
                    </svg>
                    <svg className="swap-off fill-current w-6 h-6 text-foreground dark:text-foreground-dark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21.64 13.36A9 9 0 1110.64 2.36a7 7 0 1011 11z" />
                    </svg>
                </label>

                {user ? (
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <button onClick={toggleProfileDropdown} className="focus:outline-none relative">
                                <img
                                    className={`w-10 h-10 rounded-full cursor-pointer object-cover border-2 ${location.pathname === "/profile"
                                        ? "border-purple-500 ring-2 ring-purple-300"
                                        : "border-gray-300 dark:border-gray-600"
                                        }`}
                                    src={user.photoURL || "https://i.ibb.co/zP4YVZg/user.png"}
                                    alt="Profile"
                                />
                                {/* Badge */}
                                <img
                                    src={
                                        badge === "gold"
                                            ? "https://i.ibb.co/5g2KJXSQ/gold-removebg-preview.png"
                                            : "https://i.ibb.co/TBSt0rWx/bronze-removebg-preview.png"
                                    }
                                    alt={`${badge} badge`}
                                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full border bg-white p-[1px]"
                                    title={badge === "gold" ? "Gold Member" : "Bronze Member"}
                                />
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 rounded-xl shadow-xl z-40 p-4 bg-background dark:bg-background-dark border border-white/10">
                                    <ul className="text-gray-700 dark:text-gray-200 font-medium text-center space-y-2">
                                        <li className='mb-2 text-purple-900 font-bold'>{user.displayName}</li>

                                        {isAdmin(user) && (
                                            <li>
                                                <Link to="/admin" onClick={() => setProfileDropdownOpen(false)} className="text-blue-600 hover:underline">
                                                    Admin Panel
                                                </Link>
                                            </li>
                                        )}

                                        <li><Link to="/dashboard" onClick={() => setProfileDropdownOpen(false)}>Dashboard</Link></li>

                                        <li>
                                            <button onClick={() => {
                                                setProfileDropdownOpen(false);
                                                handleLogOutAndRedirect();
                                            }} className="text-red-600">
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="gap-2 flex">
                        <Link to="/joinus" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 rounded-full">Join Us</Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NavBar;
