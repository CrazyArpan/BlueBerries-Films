export const metadata = {
  title: "Cancellation & Refund Policy - BlueBerries Films"
};

export default function CancellationAndRefundPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-black pt-32 pb-12 px-4">
      <div className="max-w-3xl mx-auto bg-zinc-900 rounded-xl shadow-lg p-8 text-white">
        <h1 className="text-3xl font-bold mb-2 text-red-500">Cancellation & Refund Policy</h1>
        <div className="text-gray-400 mb-6">Last updated on July 13th, 2025</div>
        <p className="mb-4">BlueBerries Films believes in helping its customers and partners as much as possible and therefore follows a liberal cancellation and refund policy. Under this policy:</p>
        <ul className="list-disc list-inside mb-4 text-gray-200">
          <li>Cancellations will be considered only if the request is made immediately after placing the order. However, the cancellation request may not be entertained if the order has already been communicated to vendors, distributors, or collaborators, and processing or delivery has begun.</li>
        </ul>
        <p className="mb-4">BlueBerries Films does not accept cancellation requests for time-sensitive or digital services/products such as downloadable content, subscriptions, or digital screenings. However, refund or replacement may be initiated if it is clearly established that the service delivered was faulty or significantly below expected quality.</p>
        <p className="mb-4">In case of receipt of damaged or defective products or service errors, customers must report the issue to our Customer Service team on the same day of receipt. The request will be considered once we verify and confirm the issue internally.</p>
        <p className="mb-4">If you feel that the service or content received does not match the description or your expectations, please report it within the same day to our Customer Service team. Upon review of your concern, a suitable resolution will be offered based on the nature of the case.</p>
        <p className="mb-4">For any products or services that include manufacturer warranties, we request customers to contact the respective service providers directly for resolution.</p>
        <p className="mb-4">In case of any refunds approved by BlueBerries Films, please note that it will take 3–5 business days for the amount to be processed and reflected back to the customer’s original payment method.</p>
        <h2 className="text-xl font-bold mt-8 mb-2 text-white">📩 For support or refund-related queries:</h2>
        <p className="mb-4">Email us at: <span className="text-blue-400">blueberriesent123@gmail.com</span></p>
        <p className="mb-4">We’ll do our best to resolve your issue with care and fairness.</p>
      </div>
    </div>
  );
} 