import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Angel Investor & Crowdfunding - BlueBerries Films",
};

export default function AngelInvestorPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black py-16 scroll-smooth">
      <div className="relative w-full max-w-5xl mx-auto rounded-lg overflow-hidden shadow-xl">
        {/* Background image */}
        <Image
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80"
          alt="Cinema seats background"
          fill
          style={{ objectFit: "cover", zIndex: 0 }}
          className="opacity-80"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/95 z-10" />
        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center w-full h-full py-24 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-red-600 text-center mb-8 flex items-center gap-4">
            <span role="img" aria-label="compass">🧭</span> Angel Investor & Crowdfunding Opportunities
          </h1>
          <p className="text-white text-lg md:text-xl text-center mb-8 max-w-2xl">
            Welcome, Visionary Investors! Join our cinematic revolution and earn while supporting Bengali storytelling.
          </p>
          <a href="#investment-model" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded text-lg transition shadow-lg">
            Explore Investment Options
          </a>
        </div>
      </div>
      {/* Second part: Investment Model - Project Shares */}
      <section id="investment-model" className="w-full flex flex-col items-center justify-center bg-neutral-950 py-16 px-2">
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-4 flex flex-col items-center gap-2">
            <span role="img" aria-label="bulb">💡</span>
            Our Investment Model: Project Shares.
          </h2>
          <p className="text-gray-200 text-center max-w-3xl mb-10">
            Every internal project—whether a theatre-released film, 25–55 min micro-film, web series, or full-length feature on our OTT—is structured around shares:
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature Films Card */}
            <div className="bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col items-start transition-transform duration-300 hover:scale-105 border border-neutral-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎬</span>
                <span className="text-xl font-bold text-red-500">Feature Films</span>
              </div>
              <div className="text-gray-100 mb-2 font-semibold">Budget per project: <span className="font-normal">₹1 crore</span></div>
              <div className="text-gray-100 mb-2 font-semibold">Shares offered: <span className="font-normal">100</span></div>
              <div className="text-gray-100 mb-4 font-semibold">Price per share: <span className="font-normal">₹1 lakh</span></div>
              <div className="text-gray-400 text-sm">This fractional model allows individuals to invest at scale and clarity.</div>
            </div>
            {/* Microfilms & Series Card */}
            <div className="bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col items-start transition-transform duration-300 hover:scale-105 border border-neutral-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">📱</span>
                <span className="text-xl font-bold text-red-500">Microfilms & Series</span>
              </div>
              <div className="text-gray-100 mb-2 font-semibold">Budget range: <span className="font-normal">₹10–25 lakh</span></div>
              <div className="text-gray-100 mb-2 font-semibold">Shares offered: <span className="font-normal">20–25</span></div>
              <div className="text-gray-100 mb-4 font-semibold">Price per share: <span className="font-normal">₹50,000–1,00,000</span></div>
              <div className="text-gray-400 text-sm">Flexible entry for smaller projects and web series.</div>
            </div>
            {/* Crowdfunding Card */}
            <div className="bg-neutral-800 rounded-xl shadow-lg p-8 flex flex-col items-start transition-transform duration-300 hover:scale-105 border border-neutral-700">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🌍</span>
                <span className="text-xl font-bold text-red-500">Crowdfunding</span>
              </div>
              <div className="text-gray-100 mb-2 font-semibold">Contribution: <span className="font-normal">₹5K–₹10K+</span></div>
              <div className="text-gray-100 mb-4 font-semibold">Perks: <span className="font-normal">Exclusive access, pre-release screenings, credit mentions</span></div>
              <div className="text-gray-400 text-sm">Support Bengali cinema and get unique rewards.</div>
            </div>
          </div>
        </div>
      </section>
      {/* Revenue Split Section */}
      <section className="w-full flex flex-col items-center justify-center bg-neutral-950 py-10 px-2">
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12 mt-8">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 text-center mb-6 flex flex-col items-center gap-2">
            <span role="img" aria-label="bar chart">📊</span>
            Win Together: Revenue Split.
          </h3>
          <div className="flex flex-col items-center w-full">
            <div className="text-white text-center text-lg md:text-xl max-w-3xl mb-2 mx-auto">
              <span className="font-bold text-2xl">70% of revenue</span> goes directly to investors
            </div>
            <div className="text-white text-center text-lg md:text-xl max-w-3xl mb-4 mx-auto">
              <span className="font-bold text-2xl">30% is retained</span> by BlueBerries for film production, marketing, and operations
            </div>
            <div className="text-gray-300 text-center text-base md:text-lg max-w-3xl mx-auto">
              Clear, fair, and built to reward — a model tailored for mutual success.
            </div>
          </div>
        </div>
      </section>
      {/* Why Partner With Us Section */}
      <section className="w-full flex flex-col items-center justify-center bg-neutral-950 py-12 px-2">
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 text-center mb-8 flex flex-col items-center gap-2">
            <span role="img" aria-label="handshake">🤝</span>
            Why Partner With Us?
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-lg font-bold text-white bg-neutral-800 rounded-tl-xl">Benefit for Investors</th>
                  <th className="px-6 py-3 text-lg font-bold text-white bg-neutral-800 rounded-tr-xl">Description</th>
                </tr>
              </thead>
              <tbody className="text-base">
                <tr className="border-b border-neutral-800">
                  <td className="px-6 py-3 text-white font-semibold flex items-center gap-2"><span role="img" aria-label="lock">🔒</span> Silent Partner</td>
                  <td className="px-6 py-3 text-gray-300">No operational responsibilities</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="px-6 py-3 text-white font-semibold flex items-center gap-2"><span role="img" aria-label="clapper">🎬</span> Proven Expertise</td>
                  <td className="px-6 py-3 text-gray-300">Our debut courtroom drama The Red Files sets a strong benchmark</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="px-6 py-3 text-white font-semibold flex items-center gap-2"><span role="img" aria-label="target">🎯</span> Clear ROI Structure</td>
                  <td className="px-6 py-3 text-gray-300">Transparent shares and revenue percentage</td>
                </tr>
                <tr className="border-b border-neutral-800">
                  <td className="px-6 py-3 text-white font-semibold flex items-center gap-2"><span role="img" aria-label="globe">🌍</span> Global Streaming</td>
                  <td className="px-6 py-3 text-gray-300">Films released on our upcoming OTT platform in Aug 2025</td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-white font-semibold flex items-center gap-2"><span role="img" aria-label="formats">🖥️</span> Multiple Formats</td>
                  <td className="px-6 py-3 text-gray-300">Diversified content—microfilms, series, features</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Crowdfunding Platform Card */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12 mt-8">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 text-center mb-6 flex flex-col items-center gap-2">
            <span role="img" aria-label="rocket">🚀</span>
            Crowdfunding Platform.
          </h3>
          <p className="text-gray-200 text-center max-w-3xl mx-auto mb-4">
            In addition to angel investment, we're launching verified crowdfunding campaigns where creators and audiences co-fund micro-projects:
          </p>
          <ul className="text-white text-lg max-w-2xl mx-auto mb-2">
            <li><span className="font-bold">Open to all</span> — contribute ₹5K, ₹10K, or more</li>
            <li><span className="font-bold">Community perks</span> — exclusive access, pre-release screenings, credit mentions</li>
            <li><span className="font-bold">Transparency first</span> — budgets & timelines are public</li>
          </ul>
        </div>
      </section>
      {/* How to Invest Section */}
      <section className="w-full flex flex-col items-center justify-center bg-neutral-950 py-12 px-2">
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12 mb-8">
          <h3 className="text-2xl md:text-3xl font-bold text-red-500 text-center mb-8 flex flex-col items-center gap-2">
            <span role="img" aria-label="tools">🛠️</span>
            How to Invest
          </h3>
          <ol className="text-white text-lg max-w-3xl mx-auto list-decimal list-inside space-y-2">
            <li><span className="font-bold">Explore Projects</span> — View upcoming titles on our Invest page</li>
            <li><span className="font-bold">Choose Your Share</span> — Invest ₹1 lakh/share for bigger projects or ₹10K+ for crowdfunding tiers</li>
            <li><span className="font-bold">Fill Out Contract</span> — You remain a silent investor; revenue share outlined clearly</li>
            <li><span className="font-bold">Receive Quarterly Reports</span> — Track budgets, production, and earnings</li>
            <li><span className="font-bold">Get Paid</span> — Revenue distribution begins post-release on a quarterly basis</li>
          </ol>
        </div>
        {/* Why This Model Works Card */}
        <div className="w-full max-w-5xl mx-auto rounded-2xl bg-neutral-900/90 shadow-xl p-8 md:p-12 mt-8">
          <h3 className="text-2xl md:text-3xl font-bold text-green-400 text-center mb-6 flex flex-col items-center gap-2">
            <span role="img" aria-label="check">✅</span>
            Why This Model Works
          </h3>
          <p className="text-gray-200 text-center max-w-3xl mx-auto">
            Industry veteran <span className="font-bold text-white">Angel Studios</span> uses a similar strategy—crowdsourced funding with revenue sharing to choose and produce meaningful stories. We're adapting that success for Bengali cinema, with regional insights, strategic efficiency, and minimal risk.
          </p>
        </div>
      </section>
      {/* Current Projects Seeking Investment Section */}
      <section className="w-full flex flex-col items-center justify-center bg-neutral-950 py-16 px-2">
        <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-10 flex flex-col items-center gap-2">
          <span role="img" aria-label="movie camera">🎥</span>
          Current Projects Seeking Investment
        </h2>
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* The Red Files Card */}
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-start border border-neutral-800 transition-transform duration-300 hover:scale-105">
            {/* No image */}
            <div className="text-2xl font-bold text-red-500 mb-2">The Red Files</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Type:</span> 25-min courtroom thriller</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Budget:</span> ₹15 lakh</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Shares available:</span> 15 at ₹1 lakh each</div>
            <div className="text-gray-300 mb-4"><span className="font-bold">Status:</span> Pre-production</div>
            <a href="#cta-section" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded w-full mt-auto text-center transition shadow-lg">Express Interest</a>
          </div>
          {/* Prothom Prem Card */}
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-start border border-neutral-800 transition-transform duration-300 hover:scale-105">
            {/* No image */}
            <div className="text-2xl font-bold text-red-500 mb-2">Prothom Prem</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Type:</span> Romantic web series (5 episodes)</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Budget:</span> ₹40 lakh</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Shares available:</span> 40 at ₹1 lakh each</div>
            <div className="text-gray-300 mb-4"><span className="font-bold">Status:</span> Scripting</div>
            <a href="#cta-section" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded w-full mt-auto text-center transition shadow-lg">Express Interest</a>
          </div>
          {/* Dark Shadows Card */}
          <div className="bg-neutral-900 rounded-2xl shadow-lg p-8 flex flex-col items-start border border-neutral-800 transition-transform duration-300 hover:scale-105">
            {/* No image */}
            <div className="text-2xl font-bold text-red-500 mb-2">Dark Shadows</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Type:</span> Feature film (120 mins)</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Budget:</span> ₹1 crore</div>
            <div className="text-gray-300 mb-1"><span className="font-bold">Shares available:</span> 100 at ₹1 lakh each</div>
            <div className="text-gray-300 mb-4"><span className="font-bold">Status:</span> Casting</div>
            <a href="#cta-section" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded w-full mt-auto text-center transition shadow-lg">Express Interest</a>
          </div>
        </div>
      </section>
      {/* Call to Action Section */}
      <section id="cta-section" className="w-full flex flex-col items-center justify-center bg-black py-20 px-2">
        <div className="w-full max-w-4xl mx-auto rounded-2xl bg-neutral-900 shadow-xl p-8 md:p-16 flex flex-col items-center transition-transform duration-300 hover:scale-105 border border-neutral-800">
          <h2 className="text-3xl md:text-4xl font-bold text-red-500 text-center mb-6 flex flex-col items-center gap-2">
            <span role="img" aria-label="clapperboard">🎬</span>
            Let's Create Stories—And Wealth
          </h2>
          <div className="text-white text-xl text-center mb-8">Ready to join the BlueBerries film family?</div>
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded text-lg transition shadow-lg flex items-center gap-2 mb-6">
            <span role="img" aria-label="calendar">📅</span> Book a Meeting
          </button>
          <div className="text-white text-center mb-8">
            Or email us at: <span className="text-yellow-400">blueberriesent123@gmail.com</span>
          </div>
          <div className="text-gray-300 italic text-center text-lg max-w-3xl">
            Partner with us and be part of this cinematic revolution—funding bold stories, supporting emerging talent, and earning on regional content's success. Your next ₹1 lakh share could be the spark behind the next Bengali hit.
          </div>
        </div>
      </section>
    </div>
  );
} 