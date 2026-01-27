import { ArrowLeft, Download, User, Mail, Phone, FileText } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function RegistrationDetailsModal({ eventName, registrations, isOpen, onClose }) {
  if (!isOpen) return null;

const handleDownload = () => {
  const doc = new jsPDF("p", "mm", "a4");

  // ===== TITLE =====
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Event Registration Report", 105, 20, { align: "center" });

  // ===== DATE =====
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })}`,
    105,
    28,
    { align: "center" }
  );

  // ===== EVENT NAME =====
  doc.setFontSize(12);
  doc.text(`Event Name: ${eventName}`, 14, 42);

  // ===== TABLE =====
  autoTable(doc, {
    startY: 50,
    head: [["No.", "Name", "Email", "Phone Number", "Registered At"]],
    body: registrations.map((reg, index) => [
      index + 1,
      reg.name || "-",
      reg.email || "-",
      reg.phone || "-",
      reg.registeredAt
        ? new Date(reg.registeredAt).toLocaleString("en-IN")
        : "-",
    ]),
    theme: "plain", // clean white table
    styles: {
      fontSize: 10,
      cellPadding: 4,
    },
    headStyles: {
      fontStyle: "bold",
    },
  });

  // ===== TOTAL =====
  const finalY = doc.lastAutoTable.finalY + 15;
  doc.setFont("helvetica", "bold");
  doc.text(`Total Registrations: ${registrations.length}`, 14, finalY);

  // ===== SAVE =====
  doc.save(`${eventName.replace(/\s+/g, "_")}_registrations.pdf`);
};


 return (
  <div className="fixed inset-0 bg-gray-50 z-50 overflow-auto">
    <div className="min-h-screen">

      {/* ===== TOP BAR (FROM FIRST CODE) ===== */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Events
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTAINER ===== */}
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ===== HEADER CARD ===== */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-gray-900">Event Registrations</h1>
            <p className="text-gray-600 text-left">{eventName}</p>
            <p className="text-sm text-gray-500 mt-1 text-left">
              {registrations.length}{" "}
              {registrations.length === 1 ? "registration" : "registrations"}
            </p>
          </div>

          {registrations.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-[#fe640b] text-white rounded-2xl"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </button>
          )}
        </div>

        {/* ===== REGISTRATIONS LIST (FROM SECOND CODE) ===== */}
        {registrations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No registrations yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {registrations.map((registration, index) => (
              <div
                key={registration.id}
                className="bg-white rounded-2xl shadow-sm p-5 border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>

                  <div>
                    <h3 className="text-lg text-gray-900 text-left">
                      {registration.name}
                    </h3>
                    <p className="text-sm text-gray-500 text-left">
                      Registered:{" "}
                      {new Date(registration.registeredAt).toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-14">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Mail className="w-4 h-4 text-orange-500" />
                    {registration.email}
                  </div>

                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-orange-500" />
                    {registration.phone}
                  </div>
                </div>

                {registration.additionalDetails && (
                  <div className="mt-4 ml-14">
                    <div className="flex items-start gap-2 text-gray-700">
                      <FileText className="w-4 h-4 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-sm text-gray-500 mb-1">
                          Additional Details
                        </p>
                        <p>{registration.additionalDetails}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);

}
