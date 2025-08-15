"use client";
import Link from "next/link";
import {
  FaHome,
  FaInfoCircle,
  FaCalendarAlt,
  FaTv,
  FaShoppingBag,
  FaHeart,
  FaTags,
  FaBlog,
  FaUserTie,
  FaEnvelope,
  FaSearch,
  FaShoppingCart,
  FaUserCircle,
  FaCrown,
  FaBars,
  FaTimes,
  FaAngleRight,
  FaAngleDown,
} from "react-icons/fa";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import React, { useState, useRef, useEffect } from "react";
// Add Firebase Auth imports
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../login/lib/firebase";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

const navOptions = [
  { name: "Home", icon: <FaHome />, href: "/home" },
  {
    name: "Upcoming",
    icon: <FaCalendarAlt />,
    href: "/upcoming",
    hasDropdown: true,
  },
  { name: "Live TV", icon: <FaTv />, href: "/live-tv" },
  { name: "Wishlist", icon: <FaHeart />, href: "/wishlist" },
  { name: "Pricing Plan", icon: <FaTags />, href: "/pricing" },
  { name: "Blog", icon: <FaBlog />, href: "/blog" },
  { name: "Search", icon: <FaSearch />, href: "/search" },
  { name: "Cart", icon: <FaShoppingCart />, href: "/cart" },
];

const films45 = [
  "Tomar Amar Google Meet",
  "Jhalmuri Junction",
  "Facebook-E First Love",
  "Chuti Bela",
  "Rong Pencil",
  "Ektu Prem, Ektu Chatpata",
  "Crush-E Click",
  "Joler Chithi",
  "Abishwasya",
  "Chhaya Tandab",
  "CNGr Camera",
  "Feriwala Valentine",
];

function toSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function CartPopup({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { items, removeFromCart, getCartCount, getCartTotal } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[6000] bg-black/50"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#181818] z-[6001] shadow-2xl border-l border-zinc-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-700">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <FaShoppingCart className="text-red-500" />
                Cart ({getCartCount()})
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl transition-colors"
                aria-label="Close cart"
              >
                <FaTimes />
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full">
              {items.length === 0 ? (
                /* Empty Cart */
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                  {/* Bag illustration */}
                  <div className="mb-6">
                    <svg
                      width="120"
                      height="100"
                      viewBox="0 0 160 140"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="30"
                        y="50"
                        width="100"
                        height="70"
                        rx="10"
                        fill="#E53935"
                      />
                      <path
                        d="M40 50 Q80 10 120 50"
                        stroke="#fff"
                        strokeWidth="4"
                        fill="none"
                      />
                      <ellipse
                        cx="80"
                        cy="120"
                        rx="30"
                        ry="7"
                        fill="#222"
                        fillOpacity="0.2"
                      />
                      <circle cx="50" cy="60" r="4" fill="#fff" />
                      <circle cx="110" cy="60" r="4" fill="#fff" />
                      <path
                        d="M60 90 Q80 110 100 90"
                        stroke="#000"
                        strokeWidth="3"
                        fill="none"
                      />
                      <path
                        d="M70 80 Q80 90 90 80"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M55 80 Q57 85 60 80"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M100 80 Q103 85 105 80"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M45 100 Q47 105 50 100"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M110 100 Q113 105 115 100"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M60 70 Q62 75 65 70"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M95 70 Q98 75 100 70"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        d="M80 100 Q80 105 80 110"
                        stroke="#000"
                        strokeWidth="2"
                        fill="none"
                      />
                      <ellipse
                        cx="60"
                        cy="95"
                        rx="3"
                        ry="1.5"
                        fill="#00BFFF"
                        fillOpacity="0.7"
                      />
                      <ellipse
                        cx="100"
                        cy="95"
                        rx="3"
                        ry="1.5"
                        fill="#00BFFF"
                        fillOpacity="0.7"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-300 text-lg mb-6 text-center">
                    Your cart is empty
                  </p>
                  <Link
                    href="/pricing"
                    onClick={onClose}
                    className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition"
                  >
                    Browse Plans
                  </Link>
                </div>
              ) : (
                /* Cart Items */
                <>
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="space-y-4">
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-4 p-4 bg-zinc-800 rounded-lg border border-zinc-700"
                        >
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-sm">
                              INR {item.price}
                            </p>
                            <p className="text-gray-500 text-xs">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-400 hover:text-red-300 p-2 transition-colors"
                            title="Remove item"
                          >
                            <FaTimes />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="border-t border-zinc-700 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-bold text-white">
                        Total:
                      </span>
                      <span className="text-2xl font-bold text-red-500">
                        INR {getCartTotal()}
                      </span>
                    </div>
                    <Link
                      href="/checkout/cart"
                      onClick={onClose}
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-6 rounded-lg transition text-center block"
                    >
                      Proceed to Checkout
                    </Link>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function FloatingNavBar() {
  const { scrollY } = useScroll();
  const { getCartCount } = useCart();
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const upcomingRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Firebase Auth state
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileMenuOpen]);

  useMotionValueEvent(scrollY, "change", (current) => {
    if (typeof current === "number") {
      if (current < 10) {
        setVisible(true);
        setLastScroll(current);
        return;
      }
      if (current > lastScroll) {
        setVisible(false); // scrolling down
      } else {
        setVisible(true); // scrolling up
      }
      setLastScroll(current);
    }
  });

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "flex w-full fixed top-0 left-0 right-0 z-[5000] px-6 py-3 items-center justify-between bg-black/60 border-b border-zinc-800 shadow-2xl backdrop-blur-xl",
            "transition-all duration-300",
          )}
        >
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center gap-2 mr-6 cursor-pointer group"
          >
            <span className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700 group-hover:from-blue-500 group-hover:to-blue-900 transition-all duration-300">
              BlueBerries
            </span>
            <span className="text-white text-sm align-super ml-1 tracking-widest font-semibold group-hover:text-yellow-400 transition-all duration-300">
              FILMS
            </span>
          </Link>
          {/* Hamburger for mobile */}
          <button
            className="md:hidden flex items-center text-white text-3xl ml-auto"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <FaBars />
          </button>
          {/* Nav Options (desktop only) */}
          <div className="gap-2 flex-1 flex-wrap justify-center scrollbar-hide hidden md:flex">
            {navOptions.map((opt) => {
              // Upcoming with dropdown
              if (opt.name === "Upcoming") {
                return (
                  <div
                    key={opt.name}
                    className="relative flex items-center group"
                  >
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-2 rounded-full text-white font-medium text-base whitespace-nowrap relative hover:bg-white/10 hover:text-yellow-300 transition"
                      aria-haspopup="true"
                    >
                      <span className="text-base">{opt.icon}</span>
                      <span className="hidden md:inline font-bold">
                        {opt.name}
                      </span>
                      <span className="ml-1 text-base font-bold align-middle transition-transform duration-200 group-hover:rotate-180">
                        &#x25BC;
                      </span>
                      <span className="absolute left-4 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
                    </button>
                    {/* Hover bridge to prevent dropdown from disappearing */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 h-5 bg-transparent opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"></div>
                    {/* Dropdown on hover */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-full mt-5 bg-zinc-900 text-white rounded-t-xl rounded-b-xl shadow-lg px-0 py-0 text-base font-semibold transition-all z-50 min-w-[260px] whitespace-nowrap flex flex-col opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto">
                      <div className="relative group/submenu">
                        <button
                          className="px-6 py-4 cursor-pointer font-bold text-base flex items-center justify-between min-w-[220px] rounded-t-xl w-full text-left transition-colors hover:text-red-500"
                          // No onClick, just hover
                        >
                          <span className="hover:text-red-500 transition-all duration-300 hover:translate-x-2">
                            45 Mins Films
                          </span>
                          <span className="ml-2 flex items-center">
                            <FaAngleDown className="transition-transform duration-200 text-gray-400 group-hover/submenu:text-red-500 group-hover/submenu:-rotate-90" />
                          </span>
                        </button>
                        {/* Nested dropdown for films */}
                        <div className="absolute left-full top-0 ml-2 bg-zinc-900 text-white rounded-xl shadow-lg px-8 py-6 text-lg font-semibold opacity-0 group-hover/submenu:opacity-100 pointer-events-none group-hover/submenu:pointer-events-auto transition-all z-50 min-w-[320px] flex flex-col gap-4">
                          {films45.map((film) => (
                            <Link
                              key={film}
                              href={`/movies/${toSlug(film)}`}
                              className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                            >
                              {film}
                            </Link>
                          ))}
                        </div>
                      </div>
                      <div className="relative group/movies">
                        <Link
                          href="/movies"
                          className="px-6 py-4 cursor-pointer font-bold text-base flex items-center justify-between min-w-[220px] rounded-xl w-full text-left transition-colors hover:text-red-500"
                        >
                          <span className="hover:text-red-500 transition-all duration-300 hover:translate-x-2">
                            Movies
                          </span>
                          <span className="ml-2 flex items-center">
                            <FaAngleDown className="transition-transform duration-200 text-gray-400 group-hover/movies:rotate-[-90deg] group-hover/movies:text-red-500" />
                          </span>
                        </Link>
                        {/* Nested dropdown for movies */}
                        <div className="absolute left-full top-0 ml-2 bg-zinc-900 text-white rounded-xl shadow-lg px-8 py-6 text-lg font-semibold opacity-0 group-hover/movies:opacity-100 pointer-events-none group-hover/movies:pointer-events-auto transition-all z-50 min-w-[320px] flex flex-col gap-4">
                          <Link
                            href="/movies/the-red-files"
                            className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                          >
                            The Red Files: Exclusive Premiere Offers Available
                          </Link>
                        </div>
                      </div>
                      <div className="relative group/webseries">
                        <Link
                          href="/web-series"
                          className="px-6 py-4 cursor-pointer font-bold text-base flex items-center justify-between min-w-[220px] rounded-xl w-full text-left transition-colors hover:text-red-500"
                        >
                          <span className="hover:text-red-500 transition-all duration-300 hover:translate-x-2">
                            Web Series
                          </span>
                          <span className="ml-2 flex items-center">
                            <FaAngleDown className="transition-transform duration-200 text-gray-400 group-hover/webseries:rotate-[-90deg] group-hover/webseries:text-red-500" />
                          </span>
                        </Link>
                        {/* Nested dropdown for web series */}
                        <div className="absolute left-full top-0 ml-2 bg-zinc-900 text-white rounded-xl shadow-lg px-8 py-6 text-lg font-semibold opacity-0 group-hover/webseries:opacity-100 pointer-events-none group-hover/webseries:pointer-events-auto transition-all z-50 min-w-[320px] flex flex-col gap-4">
                          <Link
                            href="/web-series/dakat"
                            className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                          >
                            Dakat
                          </Link>
                          <Link
                            href="/web-series/prothom-prem"
                            className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                          >
                            Prothom Prem
                          </Link>
                        </div>
                      </div>
                      <div className="relative group/musicvideos">
                        <Link
                          href="/music-videos"
                          className="px-6 py-4 cursor-pointer font-bold text-base flex items-center justify-between min-w-[220px] rounded-xl w-full text-left transition-colors hover:text-red-500"
                        >
                          <span className="hover:text-red-500 transition-all duration-300 hover:translate-x-2">
                            Music Video
                          </span>
                          <span className="ml-2 flex items-center">
                            <FaAngleDown className="transition-transform duration-200 text-gray-400 group-hover/musicvideos:rotate-[-90deg] group-hover/musicvideos:text-red-500" />
                          </span>
                        </Link>
                        {/* Nested dropdown for music videos */}
                        <div className="absolute left-full top-0 ml-2 bg-zinc-900 text-white rounded-xl shadow-lg px-8 py-6 text-lg font-semibold opacity-0 group-hover/musicvideos:opacity-100 pointer-events-none group-hover/musicvideos:pointer-events-auto transition-all z-50 min-w-[320px] flex flex-col gap-4">
                          <Link
                            href="/music-videos/bondhu-dekha-hobe"
                            className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                          >
                            Bondhu Dekha Hobe
                          </Link>
                          <Link
                            href="/music-videos/tui-je-amar-noy"
                            className="text-gray-200 hover:text-red-500 font-semibold text-base cursor-pointer transition-all duration-300 hover:translate-x-2"
                          >
                            Tui Je Amar Noy
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              // Cart icon only
              if (opt.name === "Cart") {
                return (
                  <button
                    key={opt.name}
                    onClick={() => setCartOpen(true)}
                    className="flex items-center justify-center px-3 py-2 rounded-full text-white/90 hover:bg-white/10 hover:text-yellow-300 transition font-medium text-sm bg-transparent border-none cursor-pointer relative group"
                    style={{ background: "none" }}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="sr-only">{opt.name}</span>
                    {/* Cart count badge */}
                    {getCartCount() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {getCartCount() > 99 ? "99+" : getCartCount()}
                      </span>
                    )}
                  </button>
                );
              }
              // Search icon only
              if (opt.name === "Search") {
                return (
                  <button
                    key={opt.name}
                    onClick={() => setSearchOpen(true)}
                    className="flex items-center justify-center px-3 py-2 rounded-full text-white/90 hover:bg-white/10 hover:text-yellow-300 transition font-medium text-sm bg-transparent border-none cursor-pointer relative group"
                    style={{ background: "none" }}
                  >
                    <span className="text-base">{opt.icon}</span>
                    <span className="sr-only">{opt.name}</span>
                  </button>
                );
              }
              // All other nav options
              return (
                <Link
                  key={opt.name}
                  href={opt.href}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-white/90 hover:bg-white/10 hover:text-yellow-300 transition font-medium text-sm whitespace-nowrap relative group"
                >
                  <span className="text-base">{opt.icon}</span>
                  <span className="hidden md:inline">{opt.name}</span>
                  <span className="absolute left-4 -bottom-1 w-0 h-0.5 bg-gradient-to-r from-red-400 to-yellow-400 rounded-full group-hover:w-4/5 transition-all duration-300"></span>
                </Link>
              );
            })}
          </div>
          {/* Subscribe Button (desktop only) */}
          <Link
            href="/pricing"
            className="hidden md:flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-gray-900 font-extrabold px-6 py-2 rounded-full shadow-lg transition mr-2 ml-2 text-base tracking-wide border-2 border-yellow-300 hover:border-yellow-500"
          >
            <FaCrown className="text-lg" /> Subscribe
          </Link>
          {/* User Profile (desktop only) */}
          <div className="hidden md:flex items-center gap-2 relative group">
            {/* If not logged in, show Login button */}
            {!user && (
              <Link href="/login" className="focus:outline-none">
                <button className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-full transition">
                  Login
                </button>
              </Link>
            )}
            {/* If logged in, show profile icon (with photo if available) */}
            {user && (
              <>
                <Link href="/profile" className="focus:outline-none">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover border-2 border-yellow-400"
                    />
                  ) : (
                    <FaUserCircle className="text-3xl text-white/90 hover:text-yellow-400 transition" />
                  )}
                </Link>
                {/* Dropdown */}
                <div className="absolute right-0 top-12 bg-zinc-900/95 rounded-xl shadow-xl py-4 px-6 min-w-[180px] hidden group-hover:block border border-zinc-700">
                  <Link
                    href="/profile"
                    className="block text-white/80 font-semibold mb-2 hover:text-red-400 transition-colors"
                  >
                    Profile
                  </Link>
                  <span className="block text-zinc-400 text-xs">
                    Settings & Preferences
                  </span>
                  <button
                    onClick={() => {
                      const auth = getAuth(app);
                      signOut(auth);
                    }}
                    className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[7000] bg-black/80 flex flex-col overflow-y-auto">
          <div className="flex justify-end p-4">
            <button
              className="text-white text-3xl"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="flex flex-col items-center gap-4 mt-8">
            {navOptions.map((opt) =>
              opt.name === "Cart" ? (
                <button
                  key={opt.name}
                  onClick={() => {
                    setCartOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-6 py-4 rounded-md text-white bg-red-700/80 hover:bg-red-800 transition font-bold text-xl w-4/5 justify-center"
                  style={{ background: "none" }}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span>{opt.name}</span>
                </button>
              ) : (
                <Link
                  key={opt.name}
                  href={opt.href}
                  className="flex items-center gap-2 px-6 py-4 rounded-md text-white bg-red-700/80 hover:bg-red-800 transition font-bold text-xl w-4/5 justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="text-2xl">{opt.icon}</span>
                  <span>{opt.name}</span>
                </Link>
              ),
            )}
            <Link
              href="/pricing"
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-4 rounded-full shadow transition mt-6 w-4/5 justify-center text-xl"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FaCrown className="text-2xl" /> Subscribe
            </Link>
            {/* Mobile: If not logged in, show Login button */}
            {!user && (
              <Link
                href="/login"
                className="flex items-center gap-2 px-6 py-4 rounded-md text-white bg-red-700/80 hover:bg-red-800 transition font-bold text-xl w-4/5 justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-2xl">
                  <FaUserCircle />
                </span>
                <span>Login</span>
              </Link>
            )}
            {/* Mobile: If logged in, show profile icon (with photo if available) */}
            {user && (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-6 py-4 rounded-md text-white bg-red-700/80 hover:bg-red-800 transition font-bold text-xl w-4/5 justify-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-yellow-400"
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
                <span>Profile</span>
              </Link>
            )}
          </nav>
        </div>
      )}
      {/* Search Bar Popup */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[8000] flex items-start justify-center pt-24 bg-black/60"
          onClick={() => setSearchOpen(false)}
        >
          <div
            className="bg-neutral-900 rounded-xl shadow-lg flex items-center px-6 py-4 gap-4 w-full max-w-lg mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FaSearch className="text-2xl text-gray-400" />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search"
              className="bg-transparent outline-none border-none text-2xl font-bold text-gray-400 placeholder-gray-400 flex-1"
              autoFocus
            />
          </div>
        </div>
      )}
      <CartPopup open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
