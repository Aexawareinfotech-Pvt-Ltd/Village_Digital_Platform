import { useState } from "react";
import { X } from "lucide-react";

const DeliveryAddressModal = ({ item, onClose, onProceed }) => {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  });

  const submit = async () => {
  try {
    const res = await fetch(
      `http://localhost:3000/api/marketplace/delivery-address/${item._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      }
    );

    if (!res.ok) {
      alert("Failed to save address");
      return;
    }

    onProceed(form); // 🔥 triggers payment
    onClose();
  } catch (err) {
    console.error(err);
    alert("Error saving address");
  }
};



  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Delivery Address</h2>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <div className="space-y-3">
          {Object.keys(form).map((key) => (
            <input
              key={key}
              placeholder={key.replace(/([A-Z])/g, " $1")}
              className="w-full px-4 py-2 border rounded-xl"
              value={form[key]}
              onChange={(e) =>
                setForm({ ...form, [key]: e.target.value })
              }
              required
            />
          ))}

          <button
            onClick={submit}
            className="w-full bg-orange-500 text-white py-3 rounded-xl"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeliveryAddressModal;
