import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

const generatePaymentReceiptPDF = async (receipt, buyer, product) => {
  return new Promise((resolve, reject) => {
    try {
      const receiptsDir = path.join(process.cwd(), "receipts");
      if (!fs.existsSync(receiptsDir)) {
        fs.mkdirSync(receiptsDir, { recursive: true });
      }

      const filePath = path.join(
        receiptsDir,
        `receipt-${receipt._id}.pdf`
      );

      const doc = new PDFDocument({ size: "A4", margin: 40 });
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      /* ========== HEADER ========== */
      doc.rect(0, 0, 595, 90).fill("#1f2937");
      doc
        .fillColor("#ffffff")
        .fontSize(24)
        .text("Village Digital Platform", 40, 30);

      doc.moveDown(3);

      /* ========== TITLE ========== */
      doc
        .fillColor("#000")
        .fontSize(22)
        .text("Payment Receipt", { align: "center" });

      doc.moveDown(2);

      /* ========== RECEIPT BOX ========== */
      doc.roundedRect(40, 170, 515, 320, 12).stroke("#e5e7eb");

      doc.fontSize(13).fillColor("#000");

      doc.text(`Receipt ID: ${receipt._id}`, 60, 200);
      doc.text(`Transaction ID: ${receipt.paymentId}`, 60, 225);
      doc.text(`Order ID: ${receipt.orderId}`, 60, 250);

      doc.text(`Product: ${product.title}`, 60, 290);
      doc.text(`Amount Paid: ₹${receipt.amount}`, 60, 315);
      doc.text(`Payment Method: ${receipt.paymentMethod}`, 60, 340);

      doc.text(
        `Payment Date: ${new Date(receipt.createdAt).toLocaleString("en-IN")}`,
        60,
        365
      );

      /* ========== BUYER INFO ========== */
      doc.moveDown(2);
      doc.fontSize(12);
      doc.text(`Billed To: ${buyer.name}`, 60, 410);
      doc.text(`Email: ${buyer.email}`, 60, 430);

      /* ========== FOOTER ========== */
      doc
        .fontSize(10)
        .fillColor("gray")
        .text(
          "This is a system generated receipt. No signature required.",
          40,
          500,
          { align: "center" }
        );

      doc.text(
        "© 2026 Village Digital Platform. All rights reserved.",
        { align: "center" }
      );

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);

    } catch (err) {
      reject(err);
    }
  });
};

export default generatePaymentReceiptPDF;
