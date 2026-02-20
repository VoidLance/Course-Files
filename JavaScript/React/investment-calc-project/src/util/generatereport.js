import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export async function generatepdf(data, chartRef) {
  const doc = new jsPDF();

  // Add text content to the PDF
  doc.setFontSize(20);
  doc.text("Investment Report", 10, 10);
  doc.setFontSize(12);
  doc.text(`Beginning Investment: ${data.begInvestment}`, 10, 30);
  doc.text(`Annual Investment: ${data.annInvestment}`, 10, 40);
  doc.text(`Return on Investment: ${data.returnInv}%`, 10, 50);
  doc.text(`Years of Investment: ${data.yearInv}`, 10, 60);

// Add chart to the PDF
  if (chartRef && chartRef.current) {
    const canvas = await html2canvas(chartRef.current, {
      scale: 2, // Increase the scale for higher resolution
    });
    const imgData = canvas.toDataURL("image/png");

    // Adjust the width and height of the image in the PDF
    const pdfWidth = 180; // Width in the PDF (mm)
    const aspectRatio = canvas.width / canvas.height;
    const pdfHeight = pdfWidth / aspectRatio;

    doc.addImage(imgData, "PNG", 10, 70, pdfWidth, pdfHeight); // Adjust dimensions
  } else {
    console.error("chartRef is undefined or not attached to a DOM element.");
  }

  // Add table data to the PDF
  let yOffset = 170; // Adjust starting position after the chart
  const linespacing = 10;
  const pageHeight = doc.internal.pageSize.height;
  data.results.forEach((result) => {
    if (yOffset + 50 > pageHeight) {
      doc.addPage();
      yOffset = 20;
    }
    doc.text(`Year: ${result.year}`, 10, yOffset);
    doc.text(`Interest (Year): ${result.interest.toFixed(2)}`, 10, yOffset + linespacing);
    doc.text(`Interest (Total): ${result.totalInterest.toFixed(2)}`, 10, yOffset + 2 * linespacing);
    doc.text(`Invested Capital: ${result.investedCapital.toFixed(2)}`, 10, yOffset + 3 * linespacing);
    doc.text(`Total Investment Value: ${result.investmentValue.toFixed(2)}`, 10, yOffset + 4 * linespacing);
    yOffset += 60;
  });

  // Save the PDF
  doc.save("Investment Report.pdf");
}
