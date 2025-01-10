import KhaltiCheckout from "khalti-checkout-web";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const navigate = useNavigate();

  const plans = [
    { name: "Basic", type: "Monthly", price: 150 },
    { name: "Standard", type: "Monthly", price: 199 },
    { name: "Premium", type: "Annual", price: 250 },
  ];

  const selectedPlanDetails = plans.find((plan) => plan.name === selectedPlan);

  // Khalti Configuration
  const khaltiConfig = {
    publicKey: "test_public_key_0713eb3c9e684be994feae24c451ff44",
    productIdentity: selectedPlanDetails.name,
    productName: selectedPlanDetails.name,
    productUrl: "http://chalchitra.com/subscription",
    eventHandler: {
      onSuccess(payload) {
        console.log("Payment successful!", payload);

        // Send the payload to your backend for verification
        fetch("http://localhost:5500/khalti/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Verification success:", data);
            alert("Subscription successful!");
          })
          .catch((error) => {
            console.error("Verification error:", error);
            toast.success("Payment done successfully!");
            navigate("/");
          });
      },
      onError(error) {
        console.error("Payment error:", error);
        alert("Payment failed. Please try again.");
      },
      onClose() {
        console.log("Payment widget is closed");
      },
    },
    paymentPreference: ["KHALTI"],
  };

  const handleKhaltiPayment = () => {
    const checkout = new KhaltiCheckout(khaltiConfig);
    const amount = selectedPlanDetails.price * 100; // Amount in paisa
    checkout.show({ amount });
  };

  return (
    <div className="min-h-screen w-full hero-bg flex flex-col items-center">
      {/* Header */}
      <div className="w-full flex justify-between items-center px-8 py-4">
        <div className="flex items-center space-x-2">
          <img
            src="/chalchitra-logo.png"
            alt="Chalachitra Logo"
            className="h-12"
          />
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
          Sign Out
        </button>
      </div>

      {/* Choose Plan Section */}
      <h2 className="text-3xl font-bold mt-8">Choose your plan</h2>

      <div className="bg-white text-black p-8 mt-8 rounded-xl shadow-lg">
        <div className="flex space-x-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              onClick={() => setSelectedPlan(plan.name)}
              className={`p-6 border-2 rounded-lg text-center cursor-pointer ${
                selectedPlan === plan.name
                  ? "border-orange-500"
                  : "border-gray-200"
              }`}
            >
              <h3 className="text-xl font-bold">{plan.name}</h3>
              <p className="text-lg mt-2">{plan.type}</p>
              <p className="text-2xl font-bold mt-4">Rs. {plan.price}</p>
            </div>
          ))}
        </div>

        {/* Payment Options */}
        <div className="flex justify-center space-x-8 mt-8">
          <img src="/khalti.png" alt="Khalti" className="h-12 object-contain" />
        </div>

        {/* Pay Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleKhaltiPayment}
            className="bg-orange-500 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-orange-600"
          >
            Pay Rs. {selectedPlanDetails.price}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
