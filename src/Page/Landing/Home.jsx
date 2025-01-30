import React, { useState, useEffect } from "react";

const Home = ({ navigate }) => {
  const [reports, setReports] = useState([]); // State untuk data laporan

  // Fungsi untuk memuat data dari JSON Server
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch("http://localhost:5000/reports");
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error("Gagal memuat data:", error);
      }
    };

    fetchReports();
  }, []);

  // Scroll ke elemen berdasarkan hash URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, []);

  return (
    <>
      <span className="text-5xl text-left font-bold ml-20 mt-[20vh] my-3 text-white">
        Selamat datang di Aplikasi <br />
        Pelaporan Layanan Umum Masyarakat
      </span>
      <p className="text-left ml-20 text-white">
        Platform modern untuk melaporkan dan memantau permasalahan layanan umum
        masyarakat secara cepat, mudah, dan transparan.
      </p>
      <button
        onClick={() => navigate("/form")}
        className="ml-20 mt-5 text-nowrap text-black font-bold p-2 rounded-md bg-gradient-to-r from-blue-100 via-blue-300 to-blue-500 w-[min-content]"
      >
        Mulai Memberikan Laporan
      </button>
      <hr className="mt-[10%]" />
      <span className="mx-auto mt-[5vh] text-white text-2xl font-medium">
        Daftar Laporan
      </span>
      <table
        id="daftarlaporan"
        className="border-collapse w-[92vw] mt-2 mb-[20px] mx-auto text-left text-black mt-20 bg-white rounded-xl overflow-hidden shadow-xl"
      >
        <thead>
          <tr>
            <th className="border-b-2 px-4 py-4">Email</th>
            <th className="border-b-2 px-4 py-4">Waktu pelaporan</th>
            <th className="border-b-2 px-4 py-4">Pelapor</th>
            <th className="border-b-2 px-4 py-4">Keterangan</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report, index) => (
            <tr key={index} className="hover:bg-gray-100 hover:cursor-pointer">
              <td className="px-4 py-4 border-r-2 border-b-2">
                {report.email}
              </td>
              <td className="px-4 py-4 border-r-2 border-b-2">{report.date}</td>
              <td className="px-4 py-4 border-r-2 border-b-2">{report.name}</td>
              <td className="px-4 py-4 border-b-2">{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
