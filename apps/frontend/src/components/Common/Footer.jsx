import { Home, Phone, Mail, Facebook, Twitter, Instagram, Youtube ,MapPin , ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export function Footer() {
    const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
   const navigate = useNavigate();

  return (
    <footer className=" relative bg-gray-50 border-t border-gray-200">    

      <button
        onClick={scrollToTop}
        className="absolute -top-6 right-8 w-12 h-12 bg-[#ff6b35] hover:bg-[#ff8c42] text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
        aria-label="Scroll to top"
      >
      <ArrowUp className="w-6 h-6" />
      </button>

      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-orange-500 p-2 rounded-2xl">
                <Home className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Village Management</h3>
                <p className="text-xs text-gray-600 text-left">Smart Village Initiative</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm text-left">
              Empowering rural communities through digital transformation. 
              Access all village services in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className='text-left'>
            <h4 className="font-semibold mb-4 text-gray-900 text-left">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li onClick={()=>navigate("/news")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">News & Announcements</a></li>
              <li onClick={()=>navigate("/events")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Events</a></li>
              <li onClick={()=>navigate("/agriculture")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Agriculture Support</a></li>
              <li onClick={()=>navigate("/job")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Job Portal</a></li>
              <li onClick={()=>navigate("/marketplace")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Marketplace</a></li>
            </ul>
          </div>

          {/* Important Services */}
          <div className='text-left'>
            <h4 className="font-semibold mb-4 text-gray-900">Important Services</h4>
            <ul className="space-y-2 text-sm">
              <li onClick={()=>navigate("/service")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Emergency Services</a></li>
              <li onClick={()=>navigate("/grievance")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Grievance System</a></li>
              <li onClick={()=>navigate("/service")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Government Schemes</a></li>
              <li onClick={()=>navigate("/service")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Health Services</a></li>
              <li onClick={()=>navigate("/service")}><a  className="text-gray-600 hover:text-[#ff6b35] transition-colors text-left cursor-pointer">Education</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className='text-left'>
            <h4 className="font-semibold mb-4 text-gray-900 ">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5 text-[#ff6b35] flex-shrink-0 " />
                <span className="text-gray-600 text-left">Rajkot<br /></span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-[#ff6b35] flex-shrink-0" />
                <span className="text-gray-600 text-left">+91 851163820</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[#ff6b35] flex-shrink-0" />
                <span className="text-gray-600 text-left">villagedigital99@gmail.com</span>
              </li>
            </ul>

            {/* Social Media */}
            <div className="mt-4">
              <h4 className="font-semibold mb-3 text-sm text-gray-900">Follow Us</h4>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-[#fff3e0] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white text-[#ff6b35] transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#fff3e0] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white text-[#ff6b35] transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#fff3e0] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white text-[#ff6b35] transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-[#fff3e0] rounded-full flex items-center justify-center hover:bg-[#ff6b35] hover:text-white text-[#ff6b35] transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
          <div>
            © copyright 2026 VILLAGE MANAGEMENT | All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#ff6b35] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-[#ff6b35] transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
