import { useState, useEffect } from "react";
import { ExternalLink, Calendar, Search, Filter, Award, FileText, TrendingUp, Loader2, AlertCircle } from "lucide-react";

const API_BASE_URL = 'http://localhost:3000/api/agriculture/government-schemes';

// Parse documents - handles both array and string formats
const parseDocuments = (docsData) => {
  console.log("Documents raw data:", docsData, "Type:", typeof docsData);
  
  if (!docsData) {
    return [];
  }
  
  // If it's an array, process each item
  if (Array.isArray(docsData)) {
    // If array contains a single string with line breaks, split it
    if (docsData.length === 1 && typeof docsData[0] === 'string') {
      return docsData[0]
        .split(/[\n\r]+/)
        .map(doc => doc.trim())
        .filter(doc => doc.length > 0);
    }
    // If array contains multiple items, return as is
    return docsData.filter(doc => doc && doc.trim().length > 0);
  }
  
  // If it's a string, split by line breaks, commas, or semicolons
  if (typeof docsData === 'string') {
    return docsData
      .split(/[,\n\r;]+/)
      .map(doc => doc.trim())
      .filter(doc => doc.length > 0);
  }
  
  return [];
};

// SchemeCard Component
function SchemeCard({
  schemeName,
  benefit,
  eligibility,
  requiredDocuments,
  lastDate,
  officialWebsite,
  applySteps,
}) {
  // Parse documents before rendering
  const documentsArray = parseDocuments(requiredDocuments);

  return (
    <div className="bg-gradient-to-br from-white to-[#fffbf7] rounded-xl shadow-sm border border-[#ffe4d1] p-6 hover:shadow-lg hover:border-[#ffd4b3] transition-all duration-300 max-w-full overflow-hidden">
      {/* Header with scheme name */}
      <div className="mb-5 max-w-full">
        <h3 className="text-[#fe640b] text-xl font-bold text-left leading-tight" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{schemeName}</h3>
      </div>
      
      {/* Benefit */}
      <div className="mb-5 p-4 bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-2xl border border-[#ffd4b3] max-w-full overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <Award className="w-5 h-5 text-[#fe640b] flex-shrink-0" />
          <h4 className="text-[#fe640b] font-semibold text-sm">Key Benefit</h4>
        </div>
        <p className="text-[#4c4f69] text-sm text-left leading-relaxed" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{benefit}</p>
      </div>
      
      {/* Required Documents - Updated with parsing */}
      <div className="mb-5 p-4 bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-2xl border border-[#ffd4b3] max-w-full overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <FileText className="w-5 h-5 text-[#fe640b] flex-shrink-0" />
          <h4 className="text-[#fe640b] font-semibold text-sm">Required Documents</h4>
        </div>
        {documentsArray.length > 0 ? (
          <ul className="space-y-2 max-w-full">
            {documentsArray.map((doc, index) => (
              <li key={index} className="flex items-start gap-2 max-w-full overflow-hidden">
                <span className="text-[#fe640b] flex-shrink-0 text-sm">•</span>
                <span className="flex-1 text-[#4c4f69] text-sm text-left min-w-0" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{doc}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#4c4f69] text-sm text-left">No documents specified</p>
        )}
      </div>
      
      {/* Last Date */}
      <div className="mb-5 p-4 bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-2xl border border-[#ffd4b3] max-w-full overflow-hidden">
        <div className="flex items-start gap-3 max-w-full">
          <Calendar className="w-5 h-5 text-[#fe640b] flex-shrink-0 mt-0.5" />
          <div className="flex items-center gap-2">
            <span className="text-[#5c5f77] font-medium text-left text-sm block mb-1">Application Deadline : </span>
            <span className="text-[#fe640b] font-semibold text-sm block" style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{lastDate}</span>
          </div>
        </div>
      </div>
      
      {/* Apply Steps */}
      <div className="mb-5 p-5 bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-2xl border border-[#ffd4b3] max-w-full overflow-hidden">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="w-5 h-5 text-[#fe640b] flex-shrink-0" />
          <h4 className="text-[#fe640b] font-semibold text-sm">How to Apply</h4>
        </div>
        <p className="text-[#4c4f69] text-sm text-left leading-relaxed" style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{applySteps}</p>
      </div>
      
      {/* Official Website Link */}
      <a
        href={officialWebsite}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#fe640b] text-white rounded-2xl font-medium hover:bg-[#e55a0a] transition-colors w-full text-sm"
      >
        <ExternalLink className="w-4 h-4 flex-shrink-0" />
        <span>Visit Official Website</span>
      </a>
    </div>
  );
}

// Main Component
export default function GovernmentSchemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchemes();
  }, []);

  const fetchSchemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("tokens");
      const response = await fetch(`${API_BASE_URL}/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      const data = await response.json();
      
      if (data.success || response.ok) {
        console.log("Fetched schemes data:", data.data);
        setSchemes(data.data || []);
      } else {
        setError(data.message || 'Failed to load schemes');
      }
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('Failed to load government schemes');
    } finally {
      setLoading(false);
    }
  };

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.schemeName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scheme.benefit?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="w-8 h-8 text-[#fe640b] animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading government schemes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-full">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-2 text-red-800 max-w-full overflow-hidden">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span style={{ wordBreak: 'break-word', overflowWrap: 'break-word' }}>{error}</span>
        </div>
      </div>
    );
  }

  if (schemes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-[#6c6f85]">No government schemes available at the moment.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-full overflow-x-hidden">
      
      {/* Search Bar */}
      <div className="mb-8 bg-white p-4 sm:p-6 rounded-2xl border-2 border-[#ffe4d1] shadow-lg max-w-full">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#fe640b] h-5 w-5" />
          <input
            type="text"
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border-2 border-[#ffe4d1] rounded-xl focus:ring-2 focus:ring-[#fe640b] focus:border-[#fe640b] focus:outline-none bg-gradient-to-r from-[#fff5ed] to-white transition-all text-sm"
          />
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="space-y-6 max-w-full">
        {filteredSchemes.length > 0 ? (
          filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme._id || scheme.id} {...scheme} />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-[#fe640b] shadow-lg">
            <div className="inline-block p-6 bg-gradient-to-br from-[#fff5ed] to-[#ffe8d6] rounded-full mb-6">
              <Filter className="w-16 h-16 text-[#fe640b]" />
            </div>
            <h3 className="text-[#fe640b] mb-3 text-2xl font-bold">No schemes found</h3>
            <p className="text-[#5c5f77] text-lg">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}