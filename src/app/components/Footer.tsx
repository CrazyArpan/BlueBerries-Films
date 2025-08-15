"use client";
import { FaFacebookF, FaXTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="relative w-full bg-black text-white pt-12 pb-4 px-4 mt-16">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8 pb-8 border-b border-neutral-800">
        {/* Left: Contact Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl font-bold text-blue-500">BlueBerries</span>
            <span className="text-white text-xs align-super ml-1">FILMS</span>
          </div>
          <div className="mb-2">Email us: <span className="font-semibold">customer@blueberriesfilms.com</span></div>
          <div className="text-gray-400 mb-1">Helpline number</div>
          <a href="tel:+917595993919" className="text-2xl font-bold text-white-400 focus:outline-none transition cursor-pointer">+(91)7595993919</a>
        </div>
        {/* Center: Newsletter */}
        <div className="flex-1 max-w-md">
          <h3 className="text-xl font-bold mb-4">Newsletter</h3>
          <p className="text-gray-300 mb-4">Subscribe to get updates on new releases and exclusive content.</p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-red-400"
            />
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition">
              Subscribe
            </button>
          </div>
        </div>
        {/* Right: Social Links */}
        <div>
          <h3 className="text-xl font-bold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <FaXTwitter />
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <FaInstagram />
            </a>
            <a href="#" className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-red-600 transition">
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-4 py-4 text-sm">
        {/* Left: Main Links */}
        <div className="flex flex-col gap-2 md:items-start">
          <a href="/about" className="text-gray-300 hover:text-red-400 transition">About Us</a>
          <a href="https://shop.blueberriesfilms.com/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-red-400 transition">Shop</a>
          <a href="/investors" className="text-gray-300 hover:text-red-400 transition">Angel Investors</a>
          <a href="/contact" className="text-gray-300 hover:text-red-400 transition">Contact Us</a>
        </div>
        {/* Right: Policies */}
        <div className="flex flex-col gap-2 md:items-end">
          <a href="/privacy-policy" className="text-red-400 hover:underline">Privacy Policy</a>
          <a href="/terms-and-conditions" className="text-red-400 hover:underline">Terms & Condition</a>
          <a href="/shipping-and-delivery-policy" className="text-red-400 hover:underline">Shipping & Delivery Policy</a>
          <a href="/cancellation-and-refund-policy" className="text-red-400 hover:underline">Cancellation & Refund Policy</a>
        </div>
      </div>
      {/* Copyright */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-4 text-sm text-gray-300">
        <div>
          © {new Date().getFullYear()} <span className="text-red-500 font-bold">BLUEBERRIES</span>. All Rights Reserved. All videos and shows on this platform are trademarks of, and all related images and content are the property of, BlueBerries Films. Duplication and copy of this is strictly prohibited.
        </div>
      </div>
    </footer>
  );
} 