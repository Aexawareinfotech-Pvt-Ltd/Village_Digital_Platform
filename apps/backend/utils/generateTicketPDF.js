import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";

const generateTicketPDF = async (ticket, event) => {
  return new Promise(async (resolve, reject) => {
    try {
      // 📁 tickets directory
      const ticketsDir = path.join(process.cwd(), "tickets");
      if (!fs.existsSync(ticketsDir)) {
        fs.mkdirSync(ticketsDir, { recursive: true });
      }

      const filePath = path.join(
        ticketsDir,
        `ticket-${ticket.ticketId}.pdf`
      );

      const doc = new PDFDocument({
        size: "A4",
        margin: 40
      });

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      /* ================= HEADER ================= */
      doc.rect(0, 0, 595, 90).fill("#1f2937");

      doc
        .fillColor("#ffffff")
        .fontSize(24)
        .text("Village Digital Platform", 40, 30);

      doc.moveDown(3);

      /* ================= TITLE ================= */
      doc
        .fillColor("#000")
        .fontSize(22)
        .text("Event Entry Ticket", { align: "center" });

      doc.moveDown(2);

      /* ================= CARD ================= */
      doc
        .roundedRect(40, 170, 515, 260, 12)
        .stroke("#e5e7eb");

      /* ================= EVENT DETAILS ================= */
      doc.fontSize(14).fillColor("#000");
      doc.text(`Event Name: ${event.eventName}`, 60, 200);
      doc.text(`Venue: ${event.venue}`, 60, 230);
      doc.text(
        `Date: ${new Date(event.startDate).toDateString()}`,
        60,
        260
      );

      doc.moveDown();

      doc.fontSize(13);
      doc.text(`Issued To: ${ticket.userName}`, 60, 300);
      doc.text(`Ticket ID: ${ticket.ticketId}`, 60, 330);

      /* ================= QR CODE ================= */
      const qrData = JSON.stringify({
        ticketId: ticket.ticketId,
        eventId: ticket.eventId,
        userId: ticket.userId
      });

      const qrImage = await QRCode.toDataURL(qrData);

      doc.image(qrImage, 420, 230, {
        width: 100,
        height: 100
      });

      doc
        .fontSize(10)
        .fillColor("gray")
        .text("Scan at entry", 435, 335);

      /* ================= FOOTER ================= */
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(
          "Please carry this ticket (printed or digital) while attending the event.",
          40,
          460,
          { align: "center" }
        );

      doc.text(
        "© 2026 Village Digital Platform. All rights reserved.",
        { align: "center" }
      );

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (error) {
      reject(error);
    }
  });
};

export default generateTicketPDF;
