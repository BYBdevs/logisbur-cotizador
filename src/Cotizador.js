import React, { useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Cotizador() {
  const [accessKey, setAccessKey] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [route, setRoute] = useState("Machala - Lima");
  const [peajes, setPeajes] = useState(23);
  const [peajesCost, setPeajesCost] = useState(305.0);
  const [costoTon, setCostoTon] = useState(45.0);
  const [pvpTon, setPvpTon] = useState(60.0);
  const [includeFrontera, setIncludeFrontera] = useState(false);

  const handleExportPDF = () => {
    const input = document.getElementById("report");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("reporte-logisbur.pdf");
    });
  };

  const handleLogin = () => {
    if (accessKey === "2407") setAuthorized(true);
    else alert("Clave incorrecta");
  };

  if (!authorized) {
    return (
      <div style={{ textAlign: "center", marginTop: "20%" }}>
        <h2>Acceso Restringido</h2>
        <input
          type="password"
          placeholder="Ingrese clave"
          value={accessKey}
          onChange={(e) => setAccessKey(e.target.value)}
        />
        <button onClick={handleLogin}>Ingresar</button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>LogisBur S.A. - Cotizador</h1>
      <div id="report" style={{ border: "1px solid #ddd", padding: "20px" }}>
        <h2>Reporte de Ruta</h2>
        <p><b>Ruta:</b> {route}</p>
        <p><b>Peajes incluidos:</b> {peajes}</p>
        <p><b>Total Peajes:</b> ${peajesCost.toFixed(2)}</p>
        <p><b>Costo por tonelada:</b> ${costoTon.toFixed(2)}</p>
        <p><b>PVP por tonelada:</b> ${pvpTon.toFixed(2)}</p>
        <p><b>Cruce de frontera:</b> {includeFrontera ? "Sí" : "No"}</p>
      </div>
      <button onClick={handleExportPDF}>Exportar a PDF</button>
    </div>
  );
}