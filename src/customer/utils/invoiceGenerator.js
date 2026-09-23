import { jsPDF } from 'jspdf';
import { KAARYA_WATERMARK_PNG, KAARYA_WATERMARK_ASPECT } from './watermarkImage';

// ===== kaarya brand palette (mirrors src/index.css) =====
const FOREST = [30, 58, 47];        // #1E3A2F
const FOREST_MID = [45, 84, 68];    // #2D5444
const EARTH = [200, 131, 74];       // #C8834A
const EARTH_DARK = [179, 111, 56];  // #B36F38
const EARTH_PALE = [253, 240, 228]; // #FDF0E4
const INK = [17, 24, 22];           // #111816
const SAND_500 = [124, 117, 104];   // muted text
const SAND_200 = [221, 213, 196];   // hairlines
const CREAM = [247, 244, 238];      // #F7F4EE
const WHITE = [255, 255, 255];
const MINT = [63, 143, 99];         // success green

function setFill(doc, rgb) { doc.setFillColor(rgb[0], rgb[1], rgb[2]); }
function setText(doc, rgb) { doc.setTextColor(rgb[0], rgb[1], rgb[2]); }
function setDraw(doc, rgb) { doc.setDrawColor(rgb[0], rgb[1], rgb[2]); }

/**
 * Generates and downloads an aesthetic invoice PDF for a completed/active order.
 * @param {object} order - order object (see UserContext / BookingModal shape)
 * @param {object} labels - optional translated label overrides
 */
export function downloadInvoicePDF(order, labels = {}) {
  const L = {
    invoice: 'Invoice',
    billTo: 'Billed To',
    serviceProvider: 'Service Provider',
    invoiceNo: 'Invoice No.',
    dateIssued: 'Date Issued',
    orderId: 'Order ID',
    status: 'Status',
    description: 'Description',
    amount: 'Amount (₹)',
    serviceCharge: 'Service Charge',
    platformFee: 'Platform Fee',
    taxes: 'Taxes (GST)',
    subtotal: 'Subtotal',
    total: 'Total Paid',
    paymentStatus: 'Payment Status',
    location: 'Service Location',
    problem: 'Issue Reported',
    thanks: 'Thank you for booking with kaarya.',
    footerNote: 'This is a system-generated invoice and does not require a physical signature.',
    tagline: 'Stronger Together',
    customer: 'Demo Customer',
    needHelp: 'Need help with this order?',
    ...labels,
  };

  // jsPDF's built-in Helvetica font has no glyph for ₹, so we use the
  // universally-supported "Rs." prefix instead to avoid broken glyphs.
  const rupee = (v) => `Rs. ${v ?? 0}`;

  const doc = new jsPDF({ unit: 'pt', format: 'a4' }); // 595 x 842 pt
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 48;
  const contentW = pageW - marginX * 2;

  doc.setProperties({
    title: `Invoice ${order.id}`,
    subject: 'kaarya service invoice',
    author: 'kaarya',
  });

  // ---------- Background ----------
  setFill(doc, WHITE);
  doc.rect(0, 0, pageW, pageH, 'F');

  // ---------- Header band ----------
  const headerH = 128;
  setFill(doc, FOREST);
  doc.rect(0, 0, pageW, headerH, 'F');
  // subtle darker accent stripe at header base
  setFill(doc, FOREST_MID);
  doc.rect(0, headerH - 6, pageW, 6, 'F');
  // earth accent tick beside wordmark
  setFill(doc, EARTH);
  doc.roundedRect(marginX, 34, 5, 30, 2.5, 2.5, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(26);
  setText(doc, WHITE);
  doc.text('kaarya', marginX + 16, 58);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  setText(doc, [214, 226, 219]);
  doc.text(L.tagline.toUpperCase(), marginX + 16, 73);

  // INVOICE label + meta, right aligned
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  setText(doc, WHITE);
  doc.text(L.invoice.toUpperCase(), pageW - marginX, 52, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  setText(doc, [214, 226, 219]);
  doc.text(`${L.invoiceNo}  ${order.id}`, pageW - marginX, 70, { align: 'right' });
  doc.text(`${L.dateIssued}  ${order.date || new Date().toLocaleDateString()}`, pageW - marginX, 83, { align: 'right' });

  // status chip
  const statusText = (order.status || 'confirmed').toUpperCase();
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  const chipPadX = 10;
  const chipW = doc.getTextWidth(statusText) + chipPadX * 2;
  const chipH = 17;
  const chipX = pageW - marginX - chipW;
  const chipY = 96;
  setFill(doc, EARTH);
  doc.roundedRect(chipX, chipY, chipW, chipH, 8.5, 8.5, 'F');
  setText(doc, WHITE);
  doc.text(statusText, chipX + chipW / 2, chipY + chipH / 2 + 3, { align: 'center' });

  // ---------- Billed To / Service Provider cards ----------
  let y = headerH + 34;
  const cardGap = 16;
  const cardW = (contentW - cardGap) / 2;
  const cardH = 92;

  function infoCard(x, title, lines) {
    setFill(doc, CREAM);
    doc.roundedRect(x, y, cardW, cardH, 8, 8, 'F');
    setDraw(doc, SAND_200);
    doc.setLineWidth(0.75);
    doc.roundedRect(x, y, cardW, cardH, 8, 8, 'S');

    setFill(doc, EARTH);
    doc.roundedRect(x, y, 4, cardH, 2, 2, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    setText(doc, SAND_500);
    doc.text(title.toUpperCase(), x + 18, y + 22);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12.5);
    setText(doc, INK);
    doc.text(lines[0] || '', x + 18, y + 42);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    setText(doc, SAND_500);
    let ly = y + 58;
    for (let i = 1; i < lines.length; i++) {
      if (!lines[i]) continue;
      const wrapped = doc.splitTextToSize(lines[i], cardW - 36);
      doc.text(wrapped, x + 18, ly);
      ly += wrapped.length * 12;
    }
  }

  infoCard(marginX, L.billTo, [
    L.customer,
    order.location || '',
  ]);
  infoCard(marginX + cardW + cardGap, L.serviceProvider, [
    order.workerName || '',
    order.service || '',
  ]);

  y += cardH + 32;

  // ---------- Service details strip ----------
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setText(doc, FOREST);
  doc.text('Service Details', marginX, y);
  y += 10;
  setDraw(doc, SAND_200);
  doc.setLineWidth(0.75);
  doc.line(marginX, y, pageW - marginX, y);
  y += 20;

  const detailRows = [
    [L.problem, order.problem || '-'],
    [L.location, order.location || '-'],
    [L.orderId, order.id],
  ];
  doc.setFontSize(9.5);
  detailRows.forEach(([label, value]) => {
    doc.setFont('helvetica', 'normal');
    setText(doc, SAND_500);
    doc.text(label, marginX, y);
    doc.setFont('helvetica', 'bold');
    setText(doc, INK);
    const wrapped = doc.splitTextToSize(String(value), contentW - 160);
    doc.text(wrapped, marginX + 150, y);
    y += Math.max(16, wrapped.length * 13);
  });

  y += 14;

  // ---------- Pricing table ----------
  const tableTop = y;
  const rowH = 30;
  const col2X = pageW - marginX - 110;

  // table header
  setFill(doc, FOREST);
  doc.rect(marginX, tableTop, contentW, 28, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  setText(doc, WHITE);
  doc.text(L.description.toUpperCase(), marginX + 14, tableTop + 18);
  doc.text('AMOUNT (RS.)', pageW - marginX - 14, tableTop + 18, { align: 'right' });

  const rows = [
    [L.serviceCharge, order.serviceCharge],
    [L.platformFee, order.platformFee],
    [L.taxes, order.tax],
  ];

  let rowY = tableTop + 28;
  rows.forEach(([label, value], i) => {
    if (i % 2 === 1) {
      setFill(doc, CREAM);
      doc.rect(marginX, rowY, contentW, rowH, 'F');
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    setText(doc, INK);
    doc.text(label, marginX + 14, rowY + rowH / 2 + 3.5);
    doc.text(rupee(value), pageW - marginX - 14, rowY + rowH / 2 + 3.5, { align: 'right' });
    rowY += rowH;
  });

  setDraw(doc, SAND_200);
  doc.setLineWidth(0.75);
  doc.line(marginX, rowY, pageW - marginX, rowY);

  // total band
  const totalH = 42;
  setFill(doc, EARTH_PALE);
  doc.rect(marginX, rowY, contentW, totalH, 'F');
  setFill(doc, EARTH);
  doc.rect(marginX, rowY, 4, totalH, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  setText(doc, FOREST);
  doc.text(L.total.toUpperCase(), marginX + 18, rowY + totalH / 2 + 4.5);
  doc.setFontSize(15);
  setText(doc, EARTH_DARK);
  doc.text(rupee(order.total), pageW - marginX - 14, rowY + totalH / 2 + 5, { align: 'right' });

  rowY += totalH + 20;

  // outer border for whole table
  setDraw(doc, SAND_200);
  doc.setLineWidth(0.75);
  doc.roundedRect(marginX, tableTop, contentW, rowY - tableTop - 20, 4, 4, 'S');

  // payment status pill
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  setText(doc, SAND_500);
  doc.text(`${L.paymentStatus}:`, marginX, rowY + 10);
  doc.setFont('helvetica', 'bold');
  setText(doc, MINT);
  doc.text(String(order.paymentStatus || '-'), marginX + 92, rowY + 10);

  const contentBottom = rowY + 10;

  // ---------- Watermark (fills leftover whitespace elegantly) ----------
  const minFooterY = pageH - 86;
  const footerY = Math.min(minFooterY, contentBottom + 150);
  const gap = footerY - contentBottom;
  if (gap > 130) {
    const wmH = Math.min(120, gap * 0.66);
    const wmW = wmH * KAARYA_WATERMARK_ASPECT;
    const wmCenterY = footerY - gap * 0.32;
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.07 }));
    doc.addImage(
      KAARYA_WATERMARK_PNG,
      'PNG',
      pageW / 2 - wmW / 2,
      wmCenterY - wmH / 2,
      wmW,
      wmH
    );
    doc.restoreGraphicsState();
  }
  setDraw(doc, SAND_200);
  doc.setLineWidth(0.75);
  doc.line(marginX, footerY, pageW - marginX, footerY);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  setText(doc, FOREST);
  doc.text(L.thanks, marginX, footerY + 24);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  setText(doc, SAND_500);
  const footerWrap = doc.splitTextToSize(L.footerNote, contentW - 200);
  doc.text(footerWrap, marginX, footerY + 40);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  setText(doc, SAND_500);
  doc.text(`${L.needHelp} support@kaarya.in`, pageW - marginX, footerY + 40, { align: 'right' });

  // small brand tick bottom-right
  setFill(doc, EARTH);
  doc.circle(pageW - marginX - 4, footerY + 26, 3, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  setText(doc, FOREST_MID);
  doc.text('kaarya.in', pageW - marginX - 14, footerY + 29, { align: 'right' });

  doc.save(`kaarya-invoice-${order.id}.pdf`);
}
