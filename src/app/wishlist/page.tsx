export const metadata = {
  title: "My Wishlist - BlueBerries Films",
};

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center py-16 px-2 mt-24">
      <h1 className="text-4xl font-bold text-white mb-12 w-full max-w-5xl text-left">My wishlist</h1>
      <div className="w-full max-w-5xl">
        <div className="overflow-x-auto rounded-lg">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#181818]">
                <th className="py-4 px-6 text-lg font-bold text-white">Product name</th>
                <th className="py-4 px-6 text-lg font-bold text-white">Unit price</th>
                <th className="py-4 px-6 text-lg font-bold text-white">Stock status</th>
              </tr>
            </thead>
          </table>
        </div>
        <div className="flex justify-center mt-8">
          <span className="text-gray-400 text-lg font-semibold">No products added to the wishlist</span>
        </div>
      </div>
    </div>
  );
} 