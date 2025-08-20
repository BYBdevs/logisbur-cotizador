import { useState } from 'react';
import jsPDF from 'jspdf';

export default function Home() {
  const [kmEcuador, setKmEcuador] = useState(0);
  const [kmPeru, setKmPeru] = useState(0);
  const [combustibleEc, setCombustibleEc] = useState(2.5);
  const [combustiblePe, setCombustiblePe] = useState(4.0);
  const [resumen, setResumen] = useState('');

  const calcular = () => {
    const costoEc = (kmEcuador / 8) * combustibleEc;
    const costoPe = (kmPeru / 8) * combustiblePe;
    const total = costoEc + costoPe;

    const texto = `Ruta calculada:\n
    - KM en Ecuador: ${kmEcuador}\n
    - KM en Perú: ${kmPeru}\n
    - Costo en Ecuador: $${costoEc.toFixed(2)}\n
    - Costo en Perú: $${costoPe.toFixed(2)}\n
    - TOTAL: $${total.toFixed(2)}`;

    setResumen(texto);
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Ruta Logisbur", 20, 20);
    doc.text(resumen, 20, 40);
    doc.save("reporte_logisbur.pdf");
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>Logisbur Cotizador</h1>
      <div>
        <label>Kilómetros en Ecuador: </label>
        <input type="number" value={kmEcuador} onChange={e => setKmEcuador(Number(e.target.value))} />
      </div>
      <div>
        <label>Kilómetros en Perú: </label>
        <input type="number" value={kmPeru} onChange={e => setKmPeru(Number(e.target.value))} />
      </div>
      <div>
        <label>Costo Combustible Ecuador: </label>
        <input type="number" step="0.01" value={combustibleEc} onChange={e => setCombustibleEc(Number(e.target.value))} />
      </div>
      <div>
        <label>Costo Combustible Perú: </label>
        <input type="number" step="0.01" value={combustiblePe} onChange={e => setCombustiblePe(Number(e.target.value))} />
      </div>
      <button onClick={calcular}>Calcular</button>
      <button onClick={exportarPDF}>Exportar PDF</button>
      <pre>{resumen}</pre>
    </div>
  );
}