import { useState, useEffect } from "react";
import {
  Heart,
  Shield,
  GraduationCap,
  Building,
  Droplet,
  Phone,
  MapPin,
  Clock,
} from "lucide-react";

/* ---------------- TRANSLATIONS ---------------- */
const translations = {
  en: {
    title: "Local Services Directory",
    subtitle: "Find all essential services in your village",
    categories: {
      health: "Health Services",
      police: "Police & Safety",
      education: "Education",
      government: "Government Offices",
      utilities: "Utilities",
    },
    phone: "Phone",
    address: "Address",
    hours: "Hours",
    services: "Services",
  },
};

export default function VillageLocalServices({ language = "en" }) {
  const t = translations[language];

  const [selectedCategory, setSelectedCategory] = useState("health");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- ICONS ---------------- */
  const categoryIcons = {
    health: Heart,
    police: Shield,
    education: GraduationCap,
    government: Building,
    utilities: Droplet,
  };

 

  /* ---------------- FETCH SERVICES ---------------- */
  useEffect(() => {
    const loadServices = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/local-services");
        const data = await res.json();
        setServices(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to load services", err);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-6xl mx-auto mt-12">
      {/* HEADER */}
      <div className="mb-6 text-left">
        <h1 className="text-latte-peach mb-2 text-4xl">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* CATEGORY TABS */}
      <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-2 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(t.categories).map((category) => {
            const Icon = categoryIcons[category];
            const colorClass = "bg-latte-peach";

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all ${
                  selectedCategory === category
                    ? `${colorClass} text-white`
                    : "bg-gray-50 text-gray-700 hover:bg-orange-50"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm text-center">
                  {t.categories[category]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SERVICES LIST */}
      {loading ? (
        <div className="text-center py-12 text-gray-500">
          Loading services...
        </div>
      ) : (
        <div className="space-y-4">
          {services
            .filter((s) => s.category === selectedCategory)
            .map((service) => (
              <div
                key={service._id}
                className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 text-left"
              >
                <h3 className="text-gray-900 mb-4 font-semibold">
                  {service.name}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t.phone}</p>
                      <p className="text-gray-900">{service.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t.address}</p>
                      <p className="text-gray-900">{service.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t.hours}</p>
                      <p className="text-gray-900">{service.hours}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Building className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-600">{t.services}</p>
                      <p className="text-gray-900">{service.services}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

          {/* EMPTY STATE */}
          {services.filter((s) => s.category === selectedCategory).length ===
            0 && (
            <div className="text-center text-gray-500 py-8">
              No services available in this category
            </div>
          )}
        </div>
      )}
    </div>
  );
}
