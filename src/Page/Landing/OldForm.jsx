import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const Form = ({ navigate }) => {
  const [text, setText] = useState(""); // State untuk input teks
  const [textEmail, setTextEmail] = useState(""); // State untuk input teks
  const [textName, setTextName] = useState(""); // State untuk input teks
  const [reports, setReports] = useState([]); // State untuk menyimpan daftar laporan
  // Fungsi untuk mengirim data ke JSON Server
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text || !textName || !textEmail) {
      alert("Data Tidak boleh kosong!");
      return;
    }

    const newReport = {
      description: text,
      name: textName,
      email: textEmail,
      date: new Date().toLocaleString("id-ID"),
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
        setReports([...reports, addedReport]);
        setText("");
        navigate("/home#daftarlaporan");
      } else {
        alert("Gagal mengirim laporan.");
      }
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-row">
          <FaRegArrowAltCircleLeft
            onClick={() => navigate("/home")}
            className="ml-20 mr-2 my-auto hover:cursor-pointer"
            size="25"
            color="white"
          />
          <span className="text-white text-3xl font-medium">
            Formulir Laporan Layanan Umum
          </span>
        </div>
        <div className="bg-white h-[1px] w-[92%] mt-2 mx-auto"></div>
      </div>
      <form onSubmit={handleSubmit} className="mt-[50px] w-[92%] mx-auto">
        <span className="text-white mx-auto">Nama Lengkap</span>
        <input
          className="textBox rounded-md p-5 mx-auto mt-2 min-w-[30vw] max-w-[60vw] mb-5"
          type="text"
          placeholder="Masukan Nama Anda..."
          value={textName}
          onChange={(e) => setTextName(e.target.value)}
        />
        <span className="text-white mx-auto">Email</span>
        <input
          className="textBox rounded-md p-5 mx-auto mt-2 min-w-[30vw] max-w-[60vw] mb-5"
          type="text"
          placeholder="Masukan Email Anda..."
          value={textEmail}
          onChange={(e) => setTextEmail(e.target.value)}
        />
        <span className="text-white mx-auto">Keterangan Laporan</span>
        <textarea
          className="textBox rounded-md p-5 mx-auto mt-2 h-[30vh] mb-5 min-w-[30vw] max-w-[60vw] min-h-[100px]"
          type="text"
          placeholder="Tuliskan laporan Anda..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="mx-auto">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md"
            type="submit"
            onClick={() => confirm("yakin ingin mengirimkan laporan")}
          >
            Kirim Laporan
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
