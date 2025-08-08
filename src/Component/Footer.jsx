
import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 mt-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">


                <div>
                    <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                    <p>Email: mdaribhasan00@gmail.com</p>
                    <p>Phone: +8801912334686</p>
                    <p>Address: Kapasia, Gazipur, Dhaka, Bangladesh</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2">
                        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="/faq" className="hover:underline">FAQs</a></li>
                        <li><a href="/support" className="hover:underline">Support</a></li>
                    </ul>
                </div>


                <div>
                    <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4 text-2xl">
                        <a href="https://www.facebook.com/mdaribhasan2006" className="hover:text-blue-500"><FaFacebook /></a>
                        <a href="https://x.com/mdaribhasan" className="hover:text-sky-400"><FaTwitter /></a>
                        <a href="https://www.instagram.com/md.aribhasan/" className="hover:text-pink-500"><FaInstagram /></a>
                        <a href="https://www.linkedin.com/in/mohammadaribhasan/" className="hover:text-blue-300"><FaLinkedin /></a>
                    </div>
                </div>
            </div>

            <div className="mt-10 text-center text-sm text-gray-400 border-t border-gray-700 pt-6">
                &copy; {new Date().getFullYear()} VibeCircle. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
