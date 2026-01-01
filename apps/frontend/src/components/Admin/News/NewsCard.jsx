import { useState } from "react";
import { Calendar, Pin, Pencil, Trash, Eye, Image, FileText } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/news';

const categoryColors = {
  Administrative: "#1e66f5",
  Health: "#d20f39",
  Education: "#8839ef",
  Infrastructure: "#df8e1d",
  Agriculture: "#40a02b",
  Event: "#ea76cb",
  Emergency: "#e64553",
};

export function NewsCard({ news, onEdit, onDelete, onUpdate }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePublish = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("tokens");
      
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('description', news.description);
      formData.append('category', news.category);
      formData.append('status', 'published');
      formData.append('featured', news.featured);
      if (news.expiryDate) {
        formData.append('expiryDate', news.expiryDate);
      }
      if (news.publishDate) {
        formData.append('publishDate', news.publishDate);
      }

      const response = await fetch(`${API_BASE_URL}/update/${news._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        onUpdate(data.data);
      } else {
        alert(data.message || 'Failed to publish news');
      }
    } catch (error) {
      console.error('Error publishing news:', error);
      alert('Failed to publish news');
    } finally {
      setLoading(false);
    }
  };

  const handleUnpublish = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("tokens");
      
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('description', news.description);
      formData.append('category', news.category);
      formData.append('status', 'draft');
      formData.append('featured', news.featured);
      if (news.expiryDate) {
        formData.append('expiryDate', news.expiryDate);
      }
      if (news.publishDate) {
        formData.append('publishDate', news.publishDate);
      }

      const response = await fetch(`${API_BASE_URL}/update/${news._id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();
      
      if (data.success) {
        onUpdate(data.data);
      } else {
        alert(data.message || 'Failed to move to draft');
      }
    } catch (error) {
      console.error('Error unpublishing news:', error);
      alert('Failed to move to draft');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem("tokens");
      
      const response = await fetch(`${API_BASE_URL}/delete/${news._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      const data = await response.json();
      
      if (data.success) {
        onDelete(news._id);
        setShowDeleteDialog(false);
      } else {
        alert(data.message || 'Failed to delete news');
      }
    } catch (error) {
      console.error('Error deleting news:', error);
      alert('Failed to delete news');
    } finally {
      setLoading(false);
    }
  };

  const categoryColor = categoryColors[news.category] || "#7c7f93";

  const getFileIcon = (fileType) => {
    if (fileType === 'image' || fileType?.includes('image')) {
      return <Image className="w-4 h-4" />;
    }
    return <FileText className="w-4 h-4" />;
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:shadow-lg">
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                {news.featured && (
                  <div className="flex items-center gap-1 px-3 py-1 bg-[#fef3c7] text-[#df8e1d] rounded-full">
                    <Pin className="w-3 h-3" />
                    <span className="text-xs font-medium">Pinned</span>
                  </div>
                )}

                <div
                  className="px-3 py-1 rounded-full text-xs font-medium text-white"
                  style={{ backgroundColor: categoryColor }}
                >
                  {news.category}
                </div>

                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    news.status === "published"
                      ? "bg-[#d4f7dc] text-[#40a02b]"
                      : "bg-[#fef3c7] text-[#df8e1d]"
                  }`}
                >
                  {news.status === "published" ? "Published" : "Draft"}
                </div>
              </div>

              <h3 className="text-[#4c4f69] text-lg font-semibold mb-2 text-left">
                {news.title}
              </h3>

              <p className="text-[#6c6f85] text-left mb-4 leading-relaxed">
                {expanded
                  ? news.description
                  : `${news.description.slice(0, 150)}${
                      news.description.length > 150 ? "..." : ""
                    }`}
              </p>

              {news.description.length > 150 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-[#1e66f5] hover:text-[#04a5e5] mb-4 flex items-center gap-1 text-sm font-medium"
                >
                  <Eye className="w-4 h-4" />
                  {expanded ? "Show less" : "Read more"}
                </button>
              )}

              {news.attachments && news.attachments.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {news.attachments.map((file, index) => (
                      <a
                        key={index}
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-3 py-2 bg-[#e6e9ef] hover:bg-[#ccd0da] rounded-lg text-[#4c4f69] transition-colors text-sm"
                        title={file.fileName}
                      >
                        {getFileIcon(file.fileType)}
                        <span className="max-w-[150px] truncate">
                          {file.fileName}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-4 text-[#9ca0b0] text-sm flex-wrap">
                {news.expiryDate && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Expires:{" "}
                      {new Date(news.expiryDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Created:{" "}
                    {new Date(news.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => onEdit(news)}
                className="border border-[#fe640b] text-[#fe640b] hover:bg-[#fe640b] hover:text-white p-2 rounded-2xl transition-colors disabled:opacity-50"
                title="Edit news"
                disabled={loading}
              >
                <Pencil className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowDeleteDialog(true)}
                className="border border-[#fe640b] text-[#fe640b] hover:bg-[#fe640b] hover:text-white p-2 rounded-2xl transition-colors disabled:opacity-50"
                title="Delete news"
                disabled={loading}
              >
                <Trash className="w-4 h-4" />
              </button>
            </div>
          </div>

          {news.status === "draft" && (
            <div className="mt-4 pt-4 border-t border-[#e6e9ef]">
              <button
                onClick={handlePublish}
                disabled={loading}
                className="w-full px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl shadow-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Publishing...
                  </>
                ) : (
                  'Publish Now'
                )}
              </button>
            </div>
          )}

          {news.status === "published" && (
            <div className="mt-4 pt-4 border-t border-[#e6e9ef]">
              <button
                onClick={handleUnpublish}
                disabled={loading}
                className="w-full px-4 py-2 border border-[#fe640b] text-[#fe640b] hover:bg-[#fe640b] hover:text-white rounded-2xl transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#fe640b]"></div>
                    Moving...
                  </>
                ) : (
                  'Move to Draft'
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {showDeleteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => !loading && setShowDeleteDialog(false)}
          />
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-[#fe640b]/10 flex items-center justify-center">
                <Trash className="w-6 h-6 text-[#fe640b]" />
              </div>
              <div>
                <h2 className="text-[#4c4f69] text-lg font-semibold">Delete News?</h2>
              </div>
            </div>
            
            <p className="text-[#6c6f85] mb-6 text-left">
              Are you sure you want to delete <strong>"{news.title}"</strong>? This action cannot be undone.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteDialog(false)}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-[#ccd0da] text-[#4c4f69] rounded-2xl hover:bg-[#e6e9ef] transition-colors font-medium disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2 bg-[#fe640b] hover:bg-[#fe640b]/90 text-white rounded-2xl transition-colors font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
