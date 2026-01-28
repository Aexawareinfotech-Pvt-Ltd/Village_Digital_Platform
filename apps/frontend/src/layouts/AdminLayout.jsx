// import { useState } from "react";
// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../components/Common/Sidebar";

// const AdminLayout = () => {
//   const [activeSection, setActiveSection] = useState(
//     "Job Portal & Skill Development"
//   );

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//       />

//       <main className="flex-1 overflow-auto bg-[#eff1f5]">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;


// AdminLayout.jsx
// import { useState } from "react";
// import { Sidebar } from "../components/Common/Sidebar";
// import { JobPortalContent } from "../components/Admin/Job/JobPortalContent";
// import {NewsAdmin} from "../components/Admin/News/NewsAdmin";

// const AdminLayout = () => {
//   const [activeSection, setActiveSection] = useState(
//     "Job Portal & Skill Development"
//   );

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//       />

//       <main className="flex-1 overflow-auto bg-[#eff1f5]">
//         {activeSection === "Job Portal & Skill Development" && (
//           <JobPortalContent />
//         )}

//         {activeSection !== "Job Portal & Skill Development" && (
//           <div className="p-8">
//             <h1 className="text-[#fe640b]">{activeSection}</h1>
//             <p className="text-[#5c5f77] mt-4">
//               Content for {activeSection} coming soon...
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

// import { useState } from "react";
// import { Sidebar } from "../components/Common/Sidebar";
// import { JobPortalContent } from "../components/Admin/Job/JobPortalContent";
// import NewsAdmin from "../components/Admin/News/NewsAdmin";


// const sectionComponents = {
//   "Job Portal & Skill Development": <JobPortalContent />,
// };

// const AdminLayout = () => {
//   const [activeSection, setActiveSection] = useState(
//     "Job Portal & Skill Development"
//   );

//   return (
//     <div className="flex h-screen overflow-hidden">
//       <Sidebar
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//       />

//       <main className="flex-1 overflow-auto bg-[#eff1f5]">
//         {sectionComponents[activeSection] || (
//           <div className="p-8">
//             <h1 className="text-[#fe640b]">{activeSection}</h1>
//             <p className="text-[#5c5f77] mt-4">
//               Content for {activeSection} coming soon...
//             </p>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default AdminLayout;

// import { Outlet } from "react-router-dom";
// import { Sidebar } from "../components/Common/Sidebar";

// export default function AdminLayout() {
//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <main className="flex-1 bg-[#eff1f5] overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   );
// }


// import { useState } from "react";
// import { Sidebar } from "../components/Common/Sidebar";

// import GrievanceAdminModule from "../components/Admin/Grievance/GrievanceAdminModule";
// import { JobPortalContent } from "../components/Admin/Job/JobPortalContent";
// import AdminDashboard from "../components/Admin/AdminDashboard/AdminDashboard";
// import AdminHeader from "../components/Common/AdminHeader";

// export default function AdminLayout() {
//   const [activeSection, setActiveSection] = useState("Dashboard");

//   const renderSection = () => {
//     switch (activeSection) {
//       case "Dashboard":
//         return <AdminDashboard setActiveSection={setActiveSection}/>;

//       case "Grievance & Feedback":
//         return <GrievanceAdminModule/>;

//       // case "Users & Roles":
//       //   return <AdminUsers />;

//       // case "News & Announcements":
//       //   return <AdminNews />;

//       case "Jobs":
//         return <JobPortalContent />;

//       // case "Events":
//       //   return <AdminEvents />;

//       // case "Settings":
//       //   return <AdminSettings />;

//       default:
//         return <AdminDashboard setActiveSection={setActiveSection}/>;
//     }
//   };

//   return (
//     <div className="flex h-screen bg-[#f8f9fc]">
//       <Sidebar
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//       />

//       <div className="flex flex-col flex-1">
//         <AdminHeader/>
//         <main className="flex-1 overflow-y-auto p-6">
//           {renderSection()}
//         </main>
//       </div>
//     </div>
//   );
// }

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Common/Sidebar";
import AdminHeader from "../components/Common/AdminHeader";



export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      
      <Sidebar />
      <main className="flex-1 bg-[#eff1f5] overflow-auto">
        <AdminHeader/>
        <Outlet />
      </main>
    </div>
  );
}

