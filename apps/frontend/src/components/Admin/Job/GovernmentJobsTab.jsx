import { Building } from "lucide-react";

export function GovernmentJobsTab() {
  return (
    <div className="bg-white rounded-xl shadow-md p-12 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#e6e9ef] mb-4">
        <Building className="w-10 h-10 text-[#fe640b]" />
      </div>
      <p className="text-[#6c6f85]">No government jobs posted</p>
    </div>
  );
}
