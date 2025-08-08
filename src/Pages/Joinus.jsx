import React, { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router";
import { valueConText } from "../RootLayout/RootLayout";
import { updateProfile, signOut } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";
import toast from 'react-hot-toast';

const Joinus = () => {
    const { handleRegistration } = useContext(valueConText);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;

        if (password.length < 6) {
            toast.error('Password must be more than 6 characters');
            return;
        } else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one uppercase letter');
            return;
        } else if (!/[a-z]/.test(password)) {
            toast.error('Password must contain at least one lowercase letter');
            return;
        } else if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        setSubmitting(true);
        try {
            const userCredential = await handleRegistration(email, password);
            const user = userCredential.user;

            await updateProfile(user, {
                displayName: name,
                photoURL: photo,
            });

            await signOut(auth);
            navigate("/login");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex items-center justify-center py-5 min-h-screen  px-4 sm:px-6 lg:px-8">
            <div
                className="w-full max-w-md p-8 sm:p-10 rounded-2xl bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 transition-all duration-300 bg-cover bg-center"
                style={{ backgroundImage: "url('https://i.ibb.co/sd0NCHB0/cvc.png')" }}
            >
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold text-white drop-shadow-sm">Create Account</h1>
                    <p className="mt-2 text-sm text-white/80">Register to join our community</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block mb-1 text-sm font-medium text-white">Name</label>
                        <input type="text" name="name" id="name" placeholder="Enter Your name" required className="w-full px-4 py-3 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-1 text-sm font-medium text-white">Email</label>
                        <input type="email" name="email" id="email" placeholder="example@mail.com" required className="w-full px-4 py-3 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>
                    <div>
                        <label htmlFor="photo" className="block mb-1 text-sm font-medium text-white">Photo URL</label>
                        <input type="text" name="photo" id="photo" placeholder="https://your-photo-url.com" className="w-full px-4 py-3 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                    </div>
                    <div className="relative">
                        <label htmlFor="password" className="block mb-1 text-sm font-medium text-white">Password</label>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Enter a strong password" required className="w-full px-4 py-3 pr-12 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute cursor-pointer right-3 top-9 text-gray-600 hover:text-green-600">
                            {showPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <div className="relative">
                        <label htmlFor="confirmPassword" className="block mb-1 text-sm font-medium text-white">Confirm Password</label>
                        <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" id="confirmPassword" placeholder="Re-enter your password" required className="w-full px-4 py-3 pr-12 text-sm rounded-lg bg-white/90 text-gray-800 placeholder-gray-400 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition" />
                        <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute cursor-pointer right-3 top-9 text-gray-600 hover:text-green-600">
                            {showConfirmPassword ? '🙈' : '👁️'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full cursor-pointer py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition duration-300 shadow-md hover:shadow-lg transform hover:scale-105 disabled:opacity-50"
                        disabled={submitting}
                    >
                        {submitting ? 'Registering...' : 'Register'}
                    </button>

                </form>
                <p className="mt-6 text-sm text-center text-white/80">
                    Already have an account?
                    <NavLink to="/login" className="text-green-300 hover:underline ml-1">Login</NavLink>
                </p>
            </div>
        </div>
    );
};

export default Joinus;
