import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router';
import { valueConText } from '../RootLayout/RootLayout';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from "react-icons/fc";
import { googleProvider, signInWithPopup, auth } from '../Firebase/Firebase.config';

const Login = () => {
    const { handleLogin } = useContext(valueConText);
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        handleLogin(email, password)
            .then(() => {
                toast.success('Login successful!');
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
            .catch(() => {
                toast.error('Invalid Email & password.');
            });
    };

    const handleGoogleLogin = () => {
        signInWithPopup(auth, googleProvider)
            .then(() => {

                setTimeout(() => {
                    navigate('/');
                }, 1500);
            })
            .catch(() => {
                toast.error('Failed to login with Google.');
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen  px-4 sm:px-6 lg:px-8">
            {/* Single Toaster here */}
            <Toaster position="top-center" />

            <div className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 transition-all duration-300"
                style={{ backgroundImage: "url('https://i.ibb.co/sd0NCHB0/cvc.png')" }}>
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">Welcome Back</h1>
                    <p className="mt-2 text-sm text-white/80">Sign in to access your account</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email address</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mail.com"
                            className="w-full px-4 py-3 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            required
                        />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 pr-12 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute cursor-pointer right-3 top-9 text-gray-600 hover:text-green-600"
                        >
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                        <div className="mt-1 text-right text-xs text-white/70 hover:underline">
                            <NavLink to={`/forgotpass?email=${email}`} className="text-green-300">Forgot Password?</NavLink>
                        </div>
                    </div>

                    <div className="text-sm text-white text-center">
                        Don't have an account?{" "}
                        <NavLink to="/joinus" className="text-green-300 hover:underline">
                            Register
                        </NavLink>
                    </div>

                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                    >
                        Log in
                    </button>
                </form>

                <div className="flex items-center pt-6 space-x-2">
                    <div className="flex-1 h-px bg-white/30"></div>
                    <p className="text-sm text-white/70">Or continue with</p>
                    <div className="flex-1 h-px bg-white/30"></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="w-full cursor-pointer py-3 mt-6 font-semibold text-gray-800 bg-white border border-gray-300 rounded-lg flex items-center justify-center space-x-4 transition duration-300 hover:bg-gray-100"
                >
                    <FcGoogle className="text-2xl" />
                    <span>Continue with Google</span>
                </button>
            </div>
        </div>
    );
};

export default Login;
