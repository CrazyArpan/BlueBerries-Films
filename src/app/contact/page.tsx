import { FaHeadset, FaPhoneAlt, FaBullhorn } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";

export const metadata = {
  title: "Contact Us - BlueBerries Films"
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black pt-32 pb-12 px-4">
      {/* Four Contact Cards Section */}
      <h1 className="text-4xl font-bold text-white text-center mb-12">Get in touch anytime</h1>
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {/* Help & Support */}
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-start">
          <div className="bg-black rounded-lg p-4 mb-4"><FaHeadset className="text-3xl text-white" /></div>
          <h2 className="text-xl font-bold mb-2 text-white">Help & support</h2>
          <p className="text-gray-300 mb-4">Need quick, reliable support? Our team is always ready to help you.</p>
          <span className="font-semibold text-white">support@blueberriesfilms.com</span>
        </div>
        {/* Call Us */}
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-start">
          <div className="bg-black rounded-lg p-4 mb-4"><FaPhoneAlt className="text-3xl text-white" /></div>
          <h2 className="text-xl font-bold mb-2 text-white">Call Us</h2>
          <p className="text-gray-300 mb-4">Speak directly to one of our team members for assistance.</p>
          <span className="font-semibold text-white">Call On: 7595993919</span>
        </div>
        {/* Advertising */}
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-start">
          <div className="bg-black rounded-lg p-4 mb-4"><FaBullhorn className="text-3xl text-white" /></div>
          <h2 className="text-xl font-bold mb-2 text-white">Advertising</h2>
          <p className="text-gray-300 mb-4">Looking to advertise with us? Contact our advertising team.</p>
          <span className="font-semibold text-white">adds@blueberriesfilms.com</span>
        </div>
        {/* Press Inquiries */}
        <div className="bg-zinc-900 rounded-xl shadow-lg p-8 flex flex-col items-start">
          <div className="bg-black rounded-lg p-4 mb-4"><MdGroups className="text-3xl text-white" /></div>
          <h2 className="text-xl font-bold mb-2 text-white">Press Inquiries</h2>
          <p className="text-gray-300 mb-4">For media inquiries or products our press team is here to help.</p>
          <span className="font-semibold text-white">inquiries@blueberriesfilms.com</span>
        </div>
      </div>
      {/* Contact Form and Info Section */}
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-12">
        {/* Left: Contact Form */}
        <div className="flex-1 bg-zinc-900 rounded-xl shadow-lg p-8 mb-8 lg:mb-0">
          <h2 className="text-3xl font-bold text-white mb-2">Start the conversation</h2>
          <p className="text-gray-300 mb-8">Fill out the contact form, and one of our team members will be in touch shortly</p>
          <form className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input type="text" placeholder="First Name *" className="flex-1 px-4 py-3 rounded bg-black border border-gray-700 text-white focus:outline-none" required />
              <input type="text" placeholder="Last Name *" className="flex-1 px-4 py-3 rounded bg-black border border-gray-700 text-white focus:outline-none" required />
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <input type="email" placeholder="Your Email *" className="flex-1 px-4 py-3 rounded bg-black border border-gray-700 text-white focus:outline-none" required />
              <input type="text" placeholder="Phone Number *" className="flex-1 px-4 py-3 rounded bg-black border border-gray-700 text-white focus:outline-none" required />
            </div>
            <textarea placeholder="Your Message *" className="w-full px-4 py-3 rounded bg-black border border-gray-700 text-white focus:outline-none min-h-[120px]" required />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="save-info" className="accent-red-600" />
              <label htmlFor="save-info" className="text-gray-300 text-sm">Save my name, email, and website in this browser for the next time I comment.</label>
            </div>
            <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition transform hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 mt-2 text-lg">Send Message</button>
          </form>
        </div>
        {/* Right: Info */}
        <div className="w-full max-w-md flex flex-col gap-8">
          <div className="bg-zinc-900 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Visit Us</h2>
            <p className="text-gray-300 mb-2">If you'd like to visit or write to us:</p>
            <div className="mb-2"><span className="text-lg">📍 <span className="font-bold">Address:</span></span></div>
            <div className="text-gray-300 mb-1">Registered Office:<br />135/A Canning Street, Kolkata – 700001</div>
            <div className="text-gray-300 mb-1">Working Studio:<br />B51, B.P. Township, Kolkata – 700094</div>
            <div className="text-gray-300 mb-1">Phone: <span className="text-white font-semibold">+91 9830252175 / +91 7595867967</span></div>
          </div>
          <div className="bg-zinc-900 rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-2">Business Inquiries</h2>
            <p className="text-gray-300 mb-2">For partnership opportunities, licensing, or media-related queries, please reach out to our business team.<br />business@blueberriesfilms.com</p>
            <div className="flex flex-col gap-2 mt-4 mb-8">
              <Link href="/privacy-policy" className="text-red-500 font-bold hover:underline">Privacy Policy</Link>
              <Link href="/terms-and-conditions" className="text-red-500 font-bold hover:underline">Terms & Condition</Link>
              <Link href="/shipping-and-delivery-policy" className="text-red-500 font-bold hover:underline">Shipping & Delivery Policy</Link>
              <Link href="/cancellation-and-refund-policy" className="text-red-500 font-bold hover:underline">Cancellation & Refund Policy</Link>
            </div>
            {/* Follow Us Section */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <div className="flex gap-6">
                <a href="#" className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center text-white text-3xl hover:bg-red-600 transition"><FaFacebookF /></a>
                <a href="#" className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center text-white text-3xl hover:bg-red-600 transition"><FaXTwitter /></a>
                <a href="#" className="w-20 h-20 rounded-full bg-neutral-900 flex items-center justify-center text-white text-3xl hover:bg-red-600 transition"><FaYoutube /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Google Map Embed */}
      <div className="max-w-7xl mx-auto w-full mt-16 rounded-xl overflow-hidden shadow-lg">
        <iframe
          title="BlueBerries Films Entertainment Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8343.300542673554!2d88.34632528039779!3d22.5805189934438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277fc2b6e82e3%3A0x47375a3a7a14d1cb!2sBlueBerries%20Films%20Entertainment!5e1!3m2!1sen!2sus!4v1752676207966!5m2!1sen!2sus"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
} 