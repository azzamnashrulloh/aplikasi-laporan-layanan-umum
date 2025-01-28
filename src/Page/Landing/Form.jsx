import { useFormik } from "formik";
import * as Yup from "yup";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";

const Form = ({ navigate }) => {
  // Fungsi untuk memeriksa email unik dari JSON Server
  const checkUniqueEmail = async (email) => {
    try {
      const response = await fetch("http://localhost:3001/reports");
      const reports = await response.json();
      return !reports.some((report) => report.email === email); // Kembalikan true jika email tidak ditemukan
    } catch (error) {
      console.error("Error checking email uniqueness:", error);
      return false; // Anggap email tidak unik jika gagal memeriksa
    }
  };

  // Skema validasi menggunakan Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Za-z\s]+$/, "Nama hanya boleh berisi huruf")
      .max(100, "Nama tidak boleh lebih dari 100 karakter")
      .required("Nama wajib diisi"),
    email: Yup.string()
      .email("Format email tidak valid")
      .required("Email wajib diisi")
      .test("unique-email", "Email sudah digunakan", async (value) => {
        if (!value) return true; // Skip jika email kosong (error lain akan menangani)
        return await checkUniqueEmail(value);
      }),
    description: Yup.string()
      .max(500, "Deskripsi tidak boleh lebih dari 500 karakter")
      .required("Deskripsi wajib diisi"),
  });

  // Inisialisasi Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      // Buat laporan baru
      const newReport = {
        name: values.name,
        email: values.email,
        description: values.description,
        date: new Date().toLocaleString("id-ID"),
      };

      // Kirim data ke JSON Server
      try {
        const response = await fetch("http://localhost:3001/reports", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newReport),
        });

        if (response.ok) {
          alert("Laporan berhasil dikirim!");
          resetForm(); // Reset form setelah berhasil
          navigate("/home#daftarlaporan"); // Navigasi ke daftar laporan
        } else {
          alert("Gagal mengirim laporan.");
        }
      } catch (error) {
        console.error("Gagal mengirim laporan:", error);
        alert("Terjadi kesalahan. Silakan coba lagi.");
      }
    },
  });

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
      <form
        onSubmit={formik.handleSubmit}
        className="mt-[50px] w-[92%] mx-auto"
      >
        <span className="text-white mx-auto">Nama Lengkap</span>
        <div className="flex flex-row mx-auto">
          <input
            className="textBox rounded-md p-5 mx-auto  mt-2 min-w-[30vw] max-w-[60vw] mb-5"
            type="text"
            placeholder="Masukan Nama Anda..."
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.touched.name && formik.errors.name && (
            <span className="bg-red-800 p-2 text-white font-medium rounded-md my-auto mb-10 ml-[20px]">
              {formik.errors.name}
            </span>
          )}
        </div>
        <span className="text-white mx-auto">Email</span>
        <div className="flex flex-row mx-auto">
          <input
            className="textBox rounded-md p-5 mx-auto mt-2 min-w-[30vw] max-w-[60vw] mb-5"
            type="text"
            placeholder="Masukan Email Anda..."
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.touched.email && formik.errors.email && (
            <span className="bg-red-800 p-2 text-white font-medium rounded-md mx-auto mb-10 my-auto ml-[20px]">
              {formik.errors.email}
            </span>
          )}
        </div>

        <span className="text-white mx-auto">Keterangan Laporan</span>

        <div className="flex fle-row mx-auto">
          <textarea
            className="textBox rounded-md p-5 mx-auto mt-2 h-[30vh] mb-5 min-w-[30vw] max-w-[60vw] min-h-[100px]"
            placeholder="Tuliskan laporan Anda..."
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="description"
          />
          {formik.touched.description && formik.errors.description && (
            <span className="bg-red-800 p-2 text-white font-medium rounded-md mx-auto mb-10 my-auto ml-[20px]">
              {formik.errors.description}
            </span>
          )}
        </div>

        <div className="mx-auto">
          <button
            className="bg-green-500 text-white px-3 py-1 rounded-md"
            type="submit"
            disabled={formik.isSubmitting} // Tombol dinonaktifkan saat pengiriman
          >
            Kirim Laporan
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
