import { useEffect, useState } from 'react';
import { AlertCircle, Megaphone, Bell, Clock, Loader2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const API_BASE_URL = 'http://localhost:3000/api/news';

export function NewsSection() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/list?status=published`);
      const data = await res.json();

      if (data.success) {
        setNews(data.data);
      } else {
        setError('Failed to load news');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  /* ICON LOGIC */
  const getIcon = (category) => {
    if (category === 'Emergency') return AlertCircle;
    if (category === 'Event' || category === 'Announcement') return Megaphone;
    return Bell;
  };

  /* SINGLE BADGE COLOR */
  const getBadge = () => {
    return 'bg-[#fff3e0] text-[#ff6b35]';
  };

  /* DATE FORMAT */
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="p-8 text-center">
          <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading news...</p>
        </div>
      </section>
    );
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="text-center text-red-500">{error}</div>
      </section>
    );
  }

  const handleViewAllNews = () => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/news");
  } else {
    navigate("/VillageLogin");
  }
};


  return (
    <section className="py-16 bg-gray-50" id="news">
      <div className="container mx-auto px-4">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Latest News & Announcements
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with real-time notifications, emergency alerts, and community bulletins
          </p>
        </div>

        {/* NEWS GRID – ONLY LAST 4 */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {news.slice(0,4).map((item) => {
            const Icon = getIcon(item.category);

            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-[#ff6b35] cursor-pointer"
              >
                <div className="p-6">

                  <div className="flex items-start space-x-3 mb-4">
                    <div className="w-10 h-10 bg-[#fff3e0] rounded-full flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-[#ff6b35]" />
                    </div>

                    <div className="flex flex-col items-start">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-2 ${getBadge()}`}
                      >
                        {item.category}
                      </span>

                      <h3
                        className="text-lg font-semibold text-gray-900 text-left"
                        style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="text-gray-600 mb-3 ml-13 text-left"
                    style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
                  >
                    {item.description}
                  </p>

                  <div className="flex items-center text-sm text-gray-500 ml-13">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatDate(item.publishDate)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-center mt-6">
                <button 
                onClick={handleViewAllNews}
                className="px-6 py-2 border border-[#ff6b35] text-[#ff6b35] rounded-2xl hover:bg-[#fff3e0] transition-colors">
                  View All News
                </button>
              </div>
    </section>
  );
}
