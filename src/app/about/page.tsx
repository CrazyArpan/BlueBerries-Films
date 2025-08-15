import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "About Us - BlueBerries Films",
};

const bgImages = [
  "https://image.tmdb.org/t/p/original/6DrHO1jr3qVrViUO6s6kFiAGM7.jpg", // Everest
  "https://image.tmdb.org/t/p/original/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg", // John Wick
  "https://image.tmdb.org/t/p/original/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg", // Pirates
  "https://image.tmdb.org/t/p/original/4q2NNj4S5dG2RLF9CpXsej7yXl.jpg", // Better Call Saul
  "https://image.tmdb.org/t/p/original/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg", // Interstellar
  "https://image.tmdb.org/t/p/original/6ELJEzQJ3Y45HczvreC3dg0GV5R.jpg", // Black Panther
  "https://image.tmdb.org/t/p/original/2CAL2433ZeIihfX1Hb2139CX0pW.jpg", // Cinderella
  "https://image.tmdb.org/t/p/original/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", // Money Heist
  "https://image.tmdb.org/t/p/original/6TjllWT3cGrPFyqDXurVZ3L8bBi.jpg", // Frozen
  "https://image.tmdb.org/t/p/original/2lECpi35Hnbpa4y46JX0aY3AWTy.jpg", // Goal
  "https://image.tmdb.org/t/p/original/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Wonder Woman
  "https://image.tmdb.org/t/p/original/6KErczPBROQty7QoIsaa6wJYXZi.jpg" // Minions
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center overflow-x-hidden">
      {/* First section: About BlueBerries with background image */}
      <div className="relative w-full flex flex-col items-center justify-center mt-32" style={{ minHeight: '60vh' }}>
        <Image
          src="https://blueberriesfilms.com/wp-content/uploads/2025/07/new-Bengali-web-series-2025-India.jpg"
          alt="New Bengali web series 2025 India background"
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
          className="opacity-90"
          priority
        />
        <div className="relative z-10 flex flex-col items-center w-full px-4 pt-32 pb-12">
          <div className="bg-white/90 rounded-md shadow-lg max-w-3xl mx-auto p-8 mb-4">
            <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">About BlueBerries</h1>
            <p className="text-lg font-semibold text-blue-700 text-center">
              Blue Berries Films is a Kolkata-based independent production house, born in 2022 to champion authentic, emotionally resonant Bengali storytelling. Since our inception, we’ve worked deeply in drama and social-reform narratives, rather than psychological thrillers.
            </p>
          </div>
          <div className="bg-blue-800/90 rounded-md shadow-lg max-w-3xl mx-auto p-6 mt-2 mb-12">
            <p className="text-lg font-semibold text-white text-center">
              Our debut release, <span className="text-red-500 font-bold">The Red Files</span>, is a hard-hitting courtroom drama based on the infamous 1990 Bantala rape case in Kolkata. The film dramatizes the cover-up and fight for justice, combining powerful performances with a message-driven script.
            </p>
          </div>
        </div>
      </div>
      {/* Vision Section: solid black background */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12">
        {/* Left: Storyboard/desk image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/Bengali-web-series-streaming.jpg"
            alt="Bengali web series streaming"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Vision text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-2 mb-2">
            <span role="img" aria-label="target">🎯</span> Our Evolving Vision
          </h2>
          <p className="text-gray-200 text-lg mb-2">
            Blue Berries is more than shorts. We’re crafting a diverse cinematic universe: Micro-budget feature films and web series (25–55 minutes), full-length feature films destined for theatres and our OTT platform, and web series spanning drama, romance, horror, social, and thriller genres.
          </p>
          <p className="text-gray-200 text-base mb-2">
            Our mission? To produce 10+ original titles every year while scaling into multi-format storytelling and launching our own OTT platform in August 2025.
          </p>
          <hr className="my-4 border-gray-700" />
          <div className="flex items-start gap-4 mb-2">
            <span className="text-3xl">🎬</span>
            <div>
              <span className="text-lg font-bold text-red-500">20+ Movies and Shows Across All Genres every year</span>
              <p className="text-gray-300 text-base">Dive into a diverse library of top-rated content, from blockbuster hits to exclusive originals.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="text-3xl">🤖</span>
            <div>
              <span className="text-lg font-bold text-white">AI-Powered Films</span>
              <p className="text-gray-300 text-base">Enjoy the new era of film making. We are going to dive into AI driven film making. Audience will enjoy everyday because we will able to release content almost everyday.</p>
            </div>
          </div>
        </div>
      </div>
      {/* Third section: Hero with grid background and CTA */}
      <div className="relative w-full flex flex-col items-center justify-center min-h-[60vh] py-24 overflow-hidden">
        {/* Grid of images */}
        <div className="absolute inset-0 z-0 grid grid-cols-4 grid-rows-3 gap-2 opacity-60">
          {bgImages.map((src, i) => (
            <div key={i} className="relative w-full h-full min-h-[200px]">
              <Image
                src={src}
                alt={`bg${i}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
                priority={i < 4}
              />
            </div>
          ))}
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-6 drop-shadow-lg">Your Ultimate Streaming Experience<br />Begins Here. Join Now</h2>
          <p className="text-lg text-gray-200 text-center mb-8">Enjoy Unlimited Streaming for ₹199/Month</p>
          <Link href="/checkout/basic" className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded text-lg transition shadow-lg flex items-center gap-2">
            Start Free Trial <span className="text-xl">▶</span>
          </Link>
        </div>
      </div>
      {/* Fourth section: Invest and Grow With Us */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: Investment image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/Blueberries-Bengali-film-platform.jpg"
            alt="Blueberries Bengali film platform"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Investment text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="money">💸</span> Invest and Grow With Us
          </h2>
          <p className="text-gray-200 text-base mb-2">
            We believe in democratizing film investment. That’s why we’ve opened an <b>Angel Investor & Crowdfunding program</b>: Angel investment opportunities (small or micro-scale, with clear revenue-sharing terms), crowdfunding campaigns (invite passionate audiences to co-create films), and a simplified investment process (no big budgets, no industry barriers—just transparent, creative partnerships).
          </p>
          <p className="text-gray-200 text-base mb-2">
            Many want to support films, but hesitate due to high costs or opacity. <b>We’ve changed the game</b>—allowing anyone to invest in Bengali cinema and share in its success.
          </p>
          <p className="text-gray-400 italic text-sm">(Full details are available on our dedicated “Invest With Us” page.)</p>
        </div>
      </div>
      {/* Fifth section: Bengali Entertainment Site */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: Bengali entertainment site image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/Bengali-entertainment-site-India.jpg"
            alt="Bengali entertainment site India"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Placeholder for future content */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 flex items-center gap-2 mb-2">
            <span role="img" aria-label="star">⭐</span> Bengali Entertainment Platform
          </h2>
          <p className="text-gray-200 text-base mb-2">
            From our first courtroom drama to planned horror-thrillers and heartfelt series, Blue Berries operates by our <b>MBSR strategy</b>—capturing market, branding identity, monetizing smartly, and building stable revenue streams.
          </p>
          <p className="text-gray-200 text-base mb-2">
            We’re not just telling stories—we’re building a <b>film ecosystem</b>.
          </p>
        </div>
      </div>
      {/* Sixth section: Empowering Filmmakers */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: Filmmaker image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/Investment-For-Filmmaker.jpg"
            alt="Investment For Filmmaker"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Empowering Filmmakers text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="clapper">🎬</span> Empowering Filmmakers
          </h2>
          <p className="text-gray-200 text-base mb-2">
            At Blue Berries Films, we support <b>emerging and independent filmmakers</b> who want to bring their dream stories to life.
          </p>
          <p className="text-gray-200 text-base mb-2">
            If you’ve got the vision, we’ll help you with the production, team, and platform to make it real — from script to screen.
          </p>
        </div>
      </div>
      {/* Seventh section: Release Your Film With Us */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: OTT for Filmmaker and Producer image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/OTT-For-Filmmaker-and-producer.jpg"
            alt="OTT For Filmmaker and producer"
            width={600}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Release Your Film text */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <h2 className="text-3xl md:text-4xl font-bold text-red-600 flex items-center gap-2 mb-2">
            <span role="img" aria-label="tv">📺</span> Release Your Film With Us
          </h2>
          <p className="text-gray-200 text-base mb-2">
            Filmmakers and producers can now <b>distribute their films directly on our OTT platform.</b>
          </p>
          <p className="text-gray-200 text-base mb-2">
            Whether it’s a short, a web series, or a feature — we offer a space to showcase your work to a growing Bengali audience worldwide.
          </p>
        </div>
      </div>
      {/* Eighth section: Masterminds Team */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-black rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: Team member image */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/3YRpeocusxLmMjo4v5lKrky1XZu.jpg.jpg"
            alt="Masterminds Team Member"
            width={400}
            height={500}
            className="rounded-lg shadow-lg object-cover"
          />
          <div className="mt-4 text-center">
            <div className="text-lg text-gray-300 font-semibold">CEO</div>
            <div className="text-2xl text-white font-bold">Nitesh Parekh</div>
          </div>
        </div>
        {/* Right: Team info */}
        <div className="w-full md:w-1/2 flex flex-col gap-8 items-center md:items-start">
          <h2 className="text-4xl font-bold text-white text-center md:text-left mb-8">Masterminds Team</h2>
          <div className="flex flex-col md:flex-row gap-16 w-full justify-between">
            <div>
              <div className="text-lg text-gray-300 font-semibold">Designer</div>
              <div className="text-2xl text-white font-bold">Barry Tech</div>
            </div>
            <div>
              <div className="text-lg text-gray-300 font-semibold">Developer</div>
              <div className="text-2xl text-white font-bold">kep John</div>
            </div>
          </div>
        </div>
      </div>
      {/* Ninth section: Connect with Us */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-8 bg-neutral-900 rounded-lg shadow-xl p-6 md:p-12 mb-12 mt-8">
        {/* Left: Film Investment image */}
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <Image
            src="https://blueberriesfilms.com/wp-content/uploads/2025/07/Film-Investment.jpg"
            alt="Film Investment"
            width={500}
            height={400}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        {/* Right: Connect with Us text */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center md:items-start">
          <h2 className="text-4xl font-bold text-white mb-6 text-center md:text-left">Connect with Us</h2>
          <p className="text-gray-300 text-base mb-4 text-center md:text-left">
            We’re always open to creative conversations.<br /><br />
            If you’re a filmmaker, investor, or collaborator interested in partnering with us — whether it’s production, OTT distribution, or investment — we’d love to hear from you.
          </p>
          <p className="text-gray-300 text-base mb-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1 font-bold text-red-500"><span role="img" aria-label="calendar">📅</span> Book a Meeting</span> to connect directly with our team.<br />
            Let’s make something powerful, together.
          </p>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded text-lg transition shadow-lg mt-2">Book Meeting</button>
        </div>
      </div>
    </div>
  );
} 