import { useState } from "react";
import Heading from "../../Components/Landing/Heading.jsx";

const Home = () => {
  return (
    <>
      <h1 className="Heading">
        Selamat datang di Aplikasi Pelaporan Layanan Umum Masyarakat
      </h1>
      <p className="description">
        Platform modern untuk melaporkan dan memantau permasalahan layanan umum
        masyarakat secara cepat, mudah, dan transparan.
      </p>
      <form action="">
        <textarea className="textBox" type="text" />
        <div className="">
          <img src="" alt="attachfile" />
          <button>Submit</button>
        </div>
      </form>
    </>
  );
};
export default Home;
