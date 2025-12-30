import { useState, useEffect } from 'react';
import { Bell, AlertCircle, Megaphone, Search, FileText, Download, Pin } from 'lucide-react';
import { ImageWithFallback } from '../Common/ImageWithFallback';

const API_BASE_URL = 'http://localhost:3000/api/news';

export function VillageNews() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`${API_BASE_URL}/list?status=published`);
      const data = await response.json();
      
      if (data.success) {
        setNews(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news');
    } finally {
      setLoading(false);
    }
  };

  const filteredNews = news
    .filter((item) => {
      const matchesFilter =
        selectedFilter === 'all' ||
        item.category.toLowerCase() === selectedFilter.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      // Pinned news first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;

      // Latest news first (by publishDate)
      return new Date(b.publishDate) - new Date(a.publishDate);
    });

  const getTypeIcon = (category) => {
    if (category === 'Emergency') return <AlertCircle className="w-5 h-5" />;
    if (category === 'Event') return <Megaphone className="w-5 h-5" />;
    return <Bell className="w-5 h-5" />;
  };

  const getTypeColor = (category) => {
    if (category === 'Emergency') return 'bg-latte-red bg-opacity-10 text-latte-red border-latte-red';
    return 'bg-latte-peach bg-opacity-10 text-latte-peach border-latte-peach';
  };

  const getCategoryColor = (category) => {
    if (category === 'Emergency') return 'bg-latte-red text-white';
    return 'bg-latte-peach text-white';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto mt-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-latte-surface0 p-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-latte-peach mx-auto mb-4"></div>
          <p className="text-latte-text">Loading news...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto mt-12 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-latte-surface0 p-12">
          <AlertCircle className="w-12 h-12 text-latte-red mx-auto mb-4" />
          <p className="text-latte-text">Failed to load news</p>
          <button 
            onClick={fetchNews}
            className="mt-4 px-4 py-2 bg-latte-peach text-white rounded-2xl hover:bg-latte-yellow transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto mt-12">
      {/* Enable Notifications Button */}
      <div className="mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-latte-peach text-white rounded-2xl hover:bg-latte-peach transition-colors">
          <Bell className="w-4 h-4" />
          Enable Push Notifications
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col gap-4">
          {/* Search */}
          <div className="w-full relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white text-gray-700"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>

            <button
              onClick={() => setSelectedFilter('administrative')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'administrative'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Administrative
            </button>

            <button
              onClick={() => setSelectedFilter('health')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'health'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Health
            </button>

            <button
              onClick={() => setSelectedFilter('education')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'education'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Education
            </button>

            <button
              onClick={() => setSelectedFilter('infrastructure')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'infrastructure'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Infrastructure
            </button>

            <button
              onClick={() => setSelectedFilter('agriculture')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'agriculture'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Agriculture
            </button>

            <button
              onClick={() => setSelectedFilter('event')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'event'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Event
            </button>

            <button
              onClick={() => setSelectedFilter('emergency')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'emergency'
                  ? 'bg-latte-peach text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Emergency
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-latte-surface0 p-12 text-center">
            <FileText className="w-12 h-12 text-latte-overlay0 mx-auto mb-4" />
            <p className="text-latte-text">No news available</p>
          </div>
        ) : (
          filteredNews.map((item) => (
            <div
              key={item._id}
              className={`bg-white shadow-sm border-2 ${getTypeColor(item.category)} overflow-hidden rounded-2xl`}
            >
              {/* Image */}
              {item.attachments && 
               item.attachments.length > 0 && 
               item.attachments[0].fileType === 'image' && (
                <div className="w-full h-64 overflow-hidden">
                  <ImageWithFallback
                    src={item.attachments[0].fileUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 text-left">
                {/* Icon + Category Badge + Pinned Badge */}
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className={`${getTypeColor(item.category)
                      .split(' ')
                      .find((c) => c.startsWith('text-'))}`}
                  >
                    {getTypeIcon(item.category)}
                  </div>

                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>

                  {item.featured && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-latte-peach text-white">
                      <Pin className="w-3 h-3" />
                      Pinned
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-latte-text font-medium mb-2">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-latte-subtext0 mb-4">
                  {item.description}
                </p>

                {/* Date */}
                <div className="flex items-center gap-2 text-sm text-latte-subtext1 mb-3">
                  <span>Posted on:</span>
                  <span className="text-latte-text">{formatDate(item.publishDate)}</span>
                  <span className="text-latte-overlay0">•</span>
                  <span>{getTimeAgo(item.publishDate)}</span>
                </div>

                {/* PDF Attachments */}
                {item.attachments &&
                  item.attachments.filter((att) => att.fileType === 'pdf').length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {item.attachments
                        .filter((att) => att.fileType === 'pdf')
                        .map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-latte-surface0 text-latte-text rounded-2xl hover:bg-latte-surface1 transition-colors"
                          >
                            <FileText className="w-4 h-4" />
                            <span>{attachment.fileName}</span>
                            <Download className="w-4 h-4 ml-1" />
                          </a>
                        ))}
                    </div>
                  )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}