import { useState } from 'react';
import { Bell, AlertCircle, Megaphone, Search, FileText, Download } from 'lucide-react';
import { ImageWithFallback } from '../Common/ImageWithFallback';

const translations = {
  en: {
    title: 'Village News & Announcements',
    search: 'Search news...',
    filter: 'Filter',
    all: 'All',
    emergency: 'Emergency',
    announcement: 'Announcement',
    bulletin: 'Bulletin',
    administrative: 'Administrative',
    event: 'Event',
    enableNotifications: 'Enable Push Notifications',
    postedOn: 'Posted on:',
    downloadPDF: 'Download PDF',
    news: [
      {
        id: 1,
        type: 'emergency',
        category: 'Emergency',
        title: 'Water Supply Maintenance - 12th December',
        description:
          'Water supply will be disrupted from 10 AM to 4 PM on 12th December for pipeline maintenance in Sector A and B. Please store water accordingly.',
        publishDate: '12 Dec 2025',
        timeAgo: '2 hours ago',
        priority: 'High',
      },
      {
        id: 2,
        type: 'announcement',
        category: 'Event',
        title: 'Free Health Camp on 15th December',
        description:
          'The village health center is organizing a free health checkup camp on 15th December from 9 AM to 5 PM. Services include general checkup, blood pressure monitoring, and diabetes screening.',
        publishDate: '11 Dec 2025',
        timeAgo: '5 hours ago',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        priority: 'Medium',
      },
      {
        id: 3,
        type: 'bulletin',
        category: 'Administrative',
        title: 'New Street Lights Installed',
        description:
          'Solar-powered street lights have been installed on Main Road and surrounding areas. This initiative is part of the village development program.',
        publishDate: '10 Dec 2025',
        timeAgo: '1 day ago',
        priority: 'Low',
      },
      {
        id: 4,
        type: 'announcement',
        category: 'Event',
        title: 'Village Panchayat Meeting - 20th December',
        description:
          'Monthly village panchayat meeting will be held on 20th December at 6 PM at the Community Hall. All villagers are encouraged to attend.',
        publishDate: '9 Dec 2025',
        timeAgo: '2 days ago',
        pdfUrl: '/documents/panchayat-agenda.pdf',
        priority: 'Medium',
      },
      {
        id: 5,
        type: 'emergency',
        category: 'Emergency',
        title: 'Heavy Rain Alert',
        description:
          'Weather department has issued heavy rain alert for next 48 hours. Farmers are advised to take necessary precautions. Emergency helpline: 1077',
        publishDate: '8 Dec 2025',
        timeAgo: '3 days ago',
        priority: 'High',
      },
    ],
  },

  hi: {
    title: 'ग्राम समाचार और घोषणाएं',
    search: 'समाचार खोजें...',
    filter: 'फ़िल्टर',
    all: 'सभी',
    emergency: 'आपातकाल',
    announcement: 'घोषणा',
    bulletin: 'बुलेटिन',
    administrative: 'प्रशासनिक',
    event: 'कार्यक्रम',
    enableNotifications: 'पुश सूचनाएं सक्षम करें',
    postedOn: 'पोस्ट किया गया:',
    downloadPDF: 'पीडीएफ डाउनलोड करें',
    news: [
      {
        id: 1,
        type: 'emergency',
        category: 'आपातकाल',
        title: 'जल आपूर्ति रखरखाव - 12 दिसंबर',
        description:
          'सेक्टर ए और बी में पाइपलाइन रखरखाव के लिए 12 दिसंबर को सुबह 10 बजे से शाम 4 बजे तक जल आपूर्ति बाधित रहेगी। कृपया पानी का भंडारण करें।',
        publishDate: '12 दिसंबर 2025',
        timeAgo: '2 घंटे पहले',
        priority: 'उच्च',
      },
      {
        id: 2,
        type: 'announcement',
        category: 'कार्यक्रम',
        title: '15 दिसंबर को निःशुल्क स्वास्थ्य शिविर',
        description:
          'ग्राम स्वास्थ्य केंद्र 15 दिसंबर को सुबह 9 बजे से शाम 5 बजे तक निःशुल्क स्वास्थ्य जांच शिविर का आयोजन कर रहा है। सेवाओं में सामान्य जांच, रक्तचाप निगरानी और मधुमेह जांच शामिल है।',
        publishDate: '11 दिसंबर 2025',
        timeAgo: '5 घंटे पहले',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        priority: 'मध्यम',
      },
      {
        id: 3,
        type: 'bulletin',
        category: 'प्रशासनिक',
        title: 'नई स्ट्रीट लाइट स्थापित',
        description:
          'मुख्य सड़क और आसपास के क्षेत्रों में सौर ऊर्जा से चलने वाली स्ट्रीટ લાઇટ स्थापित की गई हैं। यह पहल ग्राम विकास कार्यक्रम का हिस्सा है।',
        publishDate: '10 दिसंबर 2025',
        timeAgo: '1 दिन पहले',
        priority: 'कम',
      },
      {
        id: 4,
        type: 'announcement',
        category: 'कार्यक्रम',
        title: 'ग्राम पंचायत बैठक - 20 दिसंबर',
        description:
          'मासिक ग्राम पंचायत बैठक 20 दिसंबर को शाम 6 बजे सामुदायिक भवन में आयोजित की जाएगी। सभी ग्रामीणों को उपस्थित होने के लिए प्रोत्साहित किया जाता है।',
        publishDate: '9 दिसंबर 2025',
        timeAgo: '2 दिन पहले',
        pdfUrl: '/documents/panchayat-agenda.pdf',
        priority: 'मध्यम',
      },
      {
        id: 5,
        type: 'emergency',
        category: 'आपातकाल',
        title: 'भारी बारिश की चेतावनी',
        description:
          'मौसम विभाग ने अगले 48 घंटों के लिए भारी बारिश की चेतावनी जारी की है। किसानों को आवश्यक सावधानी बरतने की सलाह दी जाती है। आपातकालीन हेल्पलाइन: 1077',
        publishDate: '8 दिसंबर 2025',
        timeAgo: '3 दिन पहले',
        priority: 'उच्च',
      },
    ],
  },

  gu: {
    title: 'ગામ સમાચાર અને જાહેરાતો',
    search: 'સમાચાર શોધો...',
    filter: 'ફિલ્ટર',
    all: 'બધા',
    emergency: 'કટોકટી',
    announcement: 'જાહેરાત',
    bulletin: 'બુલેટિન',
    administrative: 'વહીવટી',
    event: 'કાર્યક્રમ',
    enableNotifications: 'પુશ નોટિફિકેશન્સ સક્ષમ કરો',
    postedOn: 'પોસ્ટ કર્યું:',
    downloadPDF: 'પીડીએફ ડાઉનલોડ કરો',
    news: [
      {
        id: 1,
        type: 'emergency',
        category: 'કટોકટી',
        title: 'પાણી પુરવઠા જાળવણી - 12મી ડિસેમ્બર',
        description:
          'સેક્ટર A અને B માં પાઇપલાઇન જાળવણી માટે 12મી ડિસેમ્બરે સવારે 10 થી સાંજે 4 વાગ્યા સુધી પાણી પુરવઠો વિક્ષેપિત રહેશે. કૃપા કરીને તદનુસાર પાણી સંગ્રહ કરો.',
        publishDate: '12 ડિસેમ્બર 2025',
        timeAgo: '2 કલાક પહેલાં',
        priority: 'ઉચ્ચ',
      },
      {
        id: 2,
        type: 'announcement',
        category: 'કાર્યક્રમ',
        title: '15મી ડિસેમ્બરે મફત આરોગ્ય શિબિર',
        description:
          'ગામ આરોગ્ય કેન્દ્ર 15મી ડિસેમ્બરે સવારે 9 થી સાંજે 5 વાગ્યા સુધી મફત આરોગ્ય તપાસ શિબિરનું આયોજન કરી રહ્યું છે. સેવાઓમાં સામાન્ય તપાસ, બ્લડ પ્રેશર મોનિટરિંગ અને ડાયાબિટીસ સ્ક્રિનિંગ શામેલ છે.',
        publishDate: '11 ડિસેમ્બર 2025',
        timeAgo: '5 કલાક પહેલાં',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800',
        priority: 'મધ્યમ',
      },
      {
        id: 3,
        type: 'bulletin',
        category: 'વહીવટી',
        title: 'નવી સ્ટ્રીટ લાઇટ્સ સ્થાપિત',
        description:
          'મુખ્ય રોડ અને આસપાસના વિસ્તારોમાં સોલાર-પાવર્ડ સ્ટ્રીટ લાઇટ્સ સ્થાપિત કરવામાં આવી છે. આ પહેલ ગામ વિકાસ કાર્યક્રમનો ભાગ છે.',
        publishDate: '10 ડિસેમ્બર 2025',
        timeAgo: '1 દિવસ પહેલાં',
        priority: 'નીચું',
      },
      {
        id: 4,
        type: 'announcement',
        category: 'કાર્યક્રમ',
        title: 'ગામ પંચાયત મીટિંગ - 20મી ડિસેમ્બર',
        description:
          'માસિક ગામ પંચાયત મીટિંગ 20મી ડિસેમ્બરે સાંજે 6 વાગ્યે સામુદાયિક હોલમાં યોજાશે. બધા ગ્રામજનોને હાજર રહેવા પ્રોત્સાહિત કરવામાં આવે છે.',
        publishDate: '9 ડિસેમ્બર 2025',
        timeAgo: '2 દિવસ પહેલાં',
        pdfUrl: '/documents/panchayat-agenda.pdf',
        priority: 'મધ્યમ',
      },
      {
        id: 5,
        type: 'emergency',
        category: 'કટોકટી',
        title: 'ભારી વરસાદની ચેતવણી',
        description:
          'હવામાન વિભાગે આગામી 48 કલાક માટે ભારે વરસાદની ચેતવણી જારી કરી છે. ખેડૂતોને જરૂરી સાવચેતી રાખવાની સલાહ આપવામાં આવે છે. કટોકટી હેલ્પલાઇન: 1077',
        publishDate: '8 ડિસેમ્બર 2025',
        timeAgo: '3 દિવસ પહેલાં',
        priority: 'ઉચ્ચ',
      },
    ],
  },
};

export function VillageNews({ language }) {
  const t = translations[language];
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNews = t.news.filter((item) => {
    const matchesFilter = selectedFilter === 'all' || item.type === selectedFilter;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'emergency':
        return <AlertCircle className="w-5 h-5" />;
      case 'announcement':
        return <Megaphone className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-latte-red bg-opacity-10 text-latte-red border-latte-red';
      case 'announcement':
        return 'bg-latte-blue bg-opacity-10 text-latte-blue border-latte-blue';
      default:
        return 'bg-latte-peach bg-opacity-10 text-latte-peach border-latte-peach';
    }
  };

  const getCategoryColor = (type) => {
    switch (type) {
      case 'emergency':
        return 'bg-latte-red text-white';
      case 'announcement':
        return 'bg-latte-yellow text-latte-base';
      default:
        return 'bg-latte-overlay0 text-white';
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-12">
      <div className="mb-6">
        <button className="flex items-center gap-2 px-4 py-2 bg-latte-peach text-white rounded-2xl hover:bg-latte-yellow transition-colors">
          <Bell className="w-4 h-4" />
          {t.enableNotifications}
        </button>
      </div>

      {/* Search + Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-latte-surface0 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-latte-overlay0" />
            <input
              type="text"
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-latte-surface0 rounded-2xl focus:outline-none focus:ring-2 focus:ring-latte-peach bg-white text-latte-text"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-latte-peach text-white'
                  : 'bg-latte-surface0 text-latte-text hover:bg-latte-surface1'
              }`}
            >
              {t.all}
            </button>

            <button
              onClick={() => setSelectedFilter('emergency')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'emergency'
                  ? 'bg-latte-red text-white'
                  : 'bg-latte-surface0 text-latte-text hover:bg-latte-surface1'
              }`}
            >
              {t.emergency}
            </button>

            <button
              onClick={() => setSelectedFilter('announcement')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'announcement'
                  ? 'bg-latte-blue text-white'
                  : 'bg-latte-surface0 text-latte-text hover:bg-latte-surface1'
              }`}
            >
              {t.announcement}
            </button>

            <button
              onClick={() => setSelectedFilter('bulletin')}
              className={`px-4 py-2 rounded-2xl transition-colors ${
                selectedFilter === 'bulletin'
                  ? 'bg-latte-peach text-white'
                  : 'bg-latte-surface0 text-latte-text hover:bg-latte-surface1'
              }`}
            >
              {t.bulletin}
            </button>
          </div>
        </div>
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item) => (
          <div
            key={item.id}
            className={`bg-white shadow-sm border-2 ${getTypeColor(item.type)} overflow-hidden rounded-2xl`}
          >
            {/* Image */}
            {item.imageUrl && (
              <div className="w-full h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* CONTENT */}
            <div className="p-6 text-left">

              {/* ✔ ICON + CATEGORY BADGE IN ONE ROW */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`${getTypeColor(item.type)
                    .split(" ")
                    .find((c) => c.startsWith("text-"))}`}
                >
                  {getTypeIcon(item.type)}
                </div>

                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs ${getCategoryColor(
                    item.type
                  )}`}
                >
                  {item.category}
                </span>
              </div>

              {/* TITLE */}
              <h3 className="text-latte-text font-medium mb-2">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-latte-subtext0 mb-4">
                {item.description}
              </p>

              {/* DATE */}
              <div className="flex items-center gap-2 text-sm text-latte-subtext1 mb-3">
                <span>{t.postedOn}</span>
                <span className="text-latte-text">{item.publishDate}</span>
                <span className="text-latte-overlay0">•</span>
                <span>{item.timeAgo}</span>
              </div>

              {/* PDF */}
              {item.pdfUrl && (
                <button className="flex items-center gap-2 px-4 py-2 bg-latte-surface0 text-latte-text rounded-2xl hover:bg-latte-surface1 transition-colors">
                  <FileText className="w-4 h-4" />
                  {t.downloadPDF}
                  <Download className="w-4 h-4 ml-1" />
                </button>
              )}

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
