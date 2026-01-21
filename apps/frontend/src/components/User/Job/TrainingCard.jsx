import { GraduationCap, Clock, DollarSign, Wifi, Calendar } from "lucide-react";

export default function TrainingCard({ program }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="flex items-start justify-between mb-5">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-left text-gray-900">{program.title}</h3>
              <p className="text-sm text-left text-gray-600 font-medium">{program.provider}</p>
            </div>
          </div>
        </div>
        <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-xl text-sm font-semibold border border-yellow-200">
          Education
        </span>
      </div>

      <p className="text-gray-700 text-left mb-5 text-sm leading-relaxed pl-13">
        {program.description}
      </p>

      <div className="grid grid-cols-2 gap-4 mb-5 text-sm">
        <div className="bg-gray-50 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Clock className="w-4 h-4 text-orange-500" />
            <p className="text-gray-500 text-left font-medium">Duration</p>
          </div>
          <p className="text-gray-900 text-left font-semibold">{program.duration}</p>
        </div>
        <div className="bg-gray-50 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-orange-500" />
            <p className="text-gray-500 text-left font-medium">Fee</p>
          </div>
          <p className="text-gray-900 text-left font-semibold">{program.fee}</p>
        </div>
        <div className="bg-gray-50 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <Wifi className="w-4 h-4 text-orange-500" />
            <p className="text-gray-500 text-left font-medium">Mode</p>
          </div>
          <p className="text-gray-900 text-left font-semibold">{program.mode}</p>
        </div>
        <div className="bg-gray-50 px-4 py-3 rounded-xl">
          <div className="flex items-center gap-2 mb-1">
            <GraduationCap className="w-4 h-4 text-orange-500" />
            <p className="text-gray-500 text-left font-medium">Eligibility</p>
          </div>
          <p className="text-gray-900 text-left font-semibold">{program.eligibility}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-5 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-orange-500" />
          <span>Starts: <span className="font-semibold text-gray-900">{program.startDate}</span></span>
        </div>
        <button className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-2.5 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-md hover:shadow-lg">
          Enroll Now
        </button>
      </div>
    </div>
  );
}
