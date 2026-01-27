import { Bell, Search, Users, FileText, Briefcase, ShoppingBag } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-[#ff6b35] via-[#ff8c42] to-[#ffab73] text-white py-16 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Bell className="w-4 h-4 mr-2" />
            <span className="text-sm">New: Agricultural subsidies applications now open!</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to Your Digital Village
          </h1>
          
          <p className="text-lg md:text-xl mb-8 text-white/90">
            Access all village services, news, and opportunities in one place. 
            Empowering our community through technology.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-full p-2 flex items-center shadow-lg">
            <Search className="w-5 h-5 text-gray-400 ml-4" />
            <input 
              type="text"
              placeholder="Search for services, schemes, jobs..." 
              className="flex-1 px-4 py-2 outline-none text-gray-900"
            />
            <button className="px-8 py-2 bg-[#ff6b35] text-white rounded-full hover:bg-[#ff8c42] transition-colors font-medium">
              Search
            </button>
          </div>

          {/* Quick Access Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <a className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">Community Services</div>
            </a>
            
            <a className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">Agriculture Info</div>
            </a>
            
            <a  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <Briefcase className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">Job Portal</div>
            </a>
            
            <a  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all group cursor-pointer">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <div className="text-sm font-medium">Marketplace</div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
