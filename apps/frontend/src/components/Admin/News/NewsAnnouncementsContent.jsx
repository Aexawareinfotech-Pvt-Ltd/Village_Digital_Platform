import { useState, useEffect } from "react";
import { Plus, FileText } from "lucide-react";
import { AddNewsModal } from "./AddNewsModal";
import { NewsCard } from "./NewsCard";

const API_BASE_URL = 'http://localhost:3000/api/news'; // Update with your backend URL

export function NewsAnnouncementsContent() {
  const [activeTab, setActiveTab] = useState("published");
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all news from backend on component mount
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch News from Backend
  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/list`);
      const data = await response.json();
      
      if (data.success) {
        setNews(data.data);
      } else {
        setError(data.message || 'Failed to load news');
      }
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to load news. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort published news
  const publishedNews = news
    .filter((item) => item.status === "published")
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // Filter and sort draft news
  const draftNews = news
    .filter((item) => item.status === "draft")
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  // Handle Add News (called from AddNewsModal after successful creation)
  const handleAddNews = (newsItem) => {
    // Add new news to the beginning of the list
    setNews([newsItem, ...news]);
  };

  // Handle Update News (called from NewsCard or AddNewsModal)
  const handleUpdateNews = (updatedNews) => {
    setNews(
      news.map((item) =>
        item._id === updatedNews._id ? updatedNews : item
      )
    );
  };

  // Handle Delete News (called from NewsCard after successful deletion)
  const handleDeleteNews = (id) => {
    setNews(news.filter((item) => item._id !== id));
  };

  // Handle Edit Click - opens modal with news data
  const handleEditClick = (newsItem) => {
    setEditingNews(newsItem);
    setShowAddModal(true);
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setShowAddModal(false);
    setEditingNews(null);
  };

  // Loading State
  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fe640b] mx-auto mb-4"></div>
            <p className="text-[#6c6f85]">Loading news...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#d20f39]/10 mb-4">
            <FileText className="w-10 h-10 text-[#d20f39]" />
          </div>
          <h3 className="text-[#4c4f69] text-lg font-semibold mb-2">Error Loading News</h3>
          <p className="text-[#6c6f85] mb-4">{error}</p>
          <button
            onClick={fetchNews}
            className="px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#fe640b]/90 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[#fe640b] text-3xl font-bold text-left">News & Announcements</h1>
          <p className="text-[#6c6f85] mt-1 text-left">
            Manage village news and important announcements
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl shadow-lg transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add News
        </button>
      </div>

      {/* Tabs Section */}
      <div className="w-full">
        <div className="grid w-full grid-cols-2 h-14 bg-white rounded-2xl shadow-md p-1 mb-6">
          <button
            onClick={() => setActiveTab("published")}
            className={`rounded-2xl transition-all duration-200 font-medium ${
              activeTab === "published"
                ? "bg-[#fe640b] text-white"
                : "bg-transparent text-[#4c4f69] hover:bg-[#e6e9ef]"
            }`}
          >
            Published News ({publishedNews.length})
          </button>

          <button
            onClick={() => setActiveTab("draft")}
            className={`rounded-2xl transition-all duration-200 font-medium ${
              activeTab === "draft"
                ? "bg-[#fe640b] text-white"
                : "bg-transparent text-[#4c4f69] hover:bg-[#e6e9ef]"
            }`}
          >
            Draft News ({draftNews.length})
          </button>
        </div>

        {/* Published News Tab */}
        {activeTab === "published" && (
          <div className="mt-6">
            {publishedNews.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
                  <FileText className="w-10 h-10 text-[#7c7f93]" />
                </div>
                <h3 className="text-[#4c4f69] text-lg font-semibold mb-2">No Published News</h3>
                <p className="text-[#6c6f85] mb-4">
                  You haven't published any news yet. Create and publish your first news announcement.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#fe640b]/90 transition-colors"
                >
                  Add News
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {publishedNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem._id}
                    news={newsItem}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteNews}
                    onUpdate={handleUpdateNews}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Draft News Tab */}
        {activeTab === "draft" && (
          <div className="mt-6">
            {draftNews.length === 0 ? (
              <div className="bg-white rounded-xl shadow-md p-12 text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
                  <FileText className="w-10 h-10 text-[#df8e1d]" />
                </div>
                <h3 className="text-[#4c4f69] text-lg font-semibold mb-2">No Draft News</h3>
                <p className="text-[#6c6f85] mb-4">
                  You don't have any draft news. Create a draft to work on it before publishing.
                </p>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-[#fe640b] text-white rounded-2xl hover:bg-[#fe640b]/90 transition-colors"
                >
                  Add News
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {draftNews.map((newsItem) => (
                  <NewsCard
                    key={newsItem._id}
                    news={newsItem}
                    onEdit={handleEditClick}
                    onDelete={handleDeleteNews}
                    onUpdate={handleUpdateNews}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit News Modal */}
      <AddNewsModal
        open={showAddModal}
        onOpenChange={handleModalClose}
        onSubmit={editingNews ? handleUpdateNews : handleAddNews}
        editingNews={editingNews}
      />
    </div>
  );
}
