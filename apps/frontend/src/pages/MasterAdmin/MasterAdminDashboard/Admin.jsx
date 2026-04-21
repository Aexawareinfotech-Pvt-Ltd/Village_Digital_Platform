
import { useState } from 'react';
import { MasterSidebar } from "../../../components/Common/MasterSidebar.jsx";
import { MasterAdmin } from "../../../components/MasterAdmin/AdminDashboard/MasterAdmin";

export default function Admin() {
  const [activeSection, setActiveSection] = useState('Manage village Admin');

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <MasterSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <MasterAdmin 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />
      </div>
    </div>
  );
}