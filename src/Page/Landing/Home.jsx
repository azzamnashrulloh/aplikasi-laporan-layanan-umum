import React, { useState, useEffect } from "react";

const Home = () => {
  const [text, setText] = useState(""); // State untuk input teks
  const [reports, setReports] = useState([]); // State untuk data laporan

  // Fungsi untuk memuat data dari JSON Server
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:3001/reports");
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    fetchReports();
  }, []);

  // Fungsi untuk mengirim data ke JSON Server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) {
      alert("Keterangan tidak boleh kosong!");
      return;
    }

    const newReport = {
      description: text,
      date: new Date().toLocaleString("id-ID"), // Tanggal saat ini dalam format lokal
    };

    try {
      const response = await fetch("http://localhost:3001/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReport),
      });

      if (response.ok) {
        const addedReport = await response.json();
        setReports([...reports, addedReport]); // Perbarui state dengan laporan baru
        setText(""); // Reset input
      } else {
        alert("Gagal mengirim laporan.");
      }
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
    }
  };

  return (
    <>
      <h1 className="Heading">
        Selamat datang di Aplikasi Pelaporan Layanan Umum Masyarakat
      </h1>
      <p className="description">
        Platform modern untuk melaporkan dan memantau permasalahan layanan umum
        masyarakat secara cepat, mudah, dan transparan.
      </p>
      <form onSubmit={handleSubmit}>
        <textarea
          className="textBox"
          type="text"
          placeholder="Tuliskan laporan Anda..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="ml-auto">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      <table className="w-1/2 border border-gray-300 border-collapse mx-auto text-left mt-20">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Tanggal</th>
            <th className="border border-gray-300 px-4 py-2">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">
                {report.date}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {report.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
