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

import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Common/Sidebar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-[#eff1f5] overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
