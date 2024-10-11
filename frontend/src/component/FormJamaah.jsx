// components/FormJamaah.jsx
import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import axios from "axios";
import { createJamaah } from "../redux/actions/jamaah";

function FormJamaah({ onClose }) {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nik: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    provinsi: "",
    kabupaten: "",
    jenisKelamin: "",
    noPaspor: "",
    masaBerlakuPaspor: "",
    noVisa: "",
    berlakuSampai: "",
    paketDipilih: "",
    kamar: "",
    lampiranKtp: null,
    lampiranKk: null,
    lampiranFotoDiri: null,
    lampiranPaspor: null,
  });

  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [paketList, setPaketList] = useState([]);
  const [kamarList, setKamarList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8888/provinsi")
      .then((res) => setProvinsiList(res.data));
    axios
      .get("http://localhost:8888/paket")
      .then((res) => setPaketList(res.data));
    axios
      .get("http://localhost:8888/kamar")
      .then((res) => setKamarList(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });

    // Fetch kabupaten based on selected provinsi
    if (name === "provinsi") {
      axios
        .get(`/api/kabupaten?provinsiId=${value}`)
        .then((res) => setKabupatenList(res.data));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }

    dispatch(createJamaah(dataToSend)); // Dispatch aksi untuk membuat Jamaah
    onClose(); // Close form setelah submit
  };

  return (
    <>
      <div className="flex items-center justify-center fixed bg-black/25 w-full h-full top-0">
        <div className="p-6 max-w-4xl mx-auto">
          <form
            className="bg-white p-6 rounded shadow-md"
            onSubmit={handleSubmit}
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl mb-4 font-bold">Form Data Jamaah</h1>
              <button type="button" onClick={onClose}>
                <FaXmark />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="namaLengkap"
                placeholder="Nama Lengkap"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="number"
                name="nik"
                placeholder="NIK"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="text"
                name="tempatLahir"
                placeholder="Tempat Lahir"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="date"
                name="tanggalLahir"
                className="border p-2"
                onChange={handleChange}
              />
              <textarea
                name="alamat"
                placeholder="Alamat"
                className="border p-2 col-span-2"
                onChange={handleChange}
              />

              {/* Dropdown Provinsi */}
              <select
                name="provinsi"
                className="border p-2"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                {provinsiList.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.id}>
                    {provinsi.name}
                  </option>
                ))}
              </select>

              {/* Dropdown Kabupaten */}
              <select
                name="kabupaten"
                className="border p-2"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih Kabupaten
                </option>
                {kabupatenList.map((kabupaten) => (
                  <option key={kabupaten.id} value={kabupaten.id}>
                    {kabupaten.name}
                  </option>
                ))}
              </select>

              {/* Radio Button Jenis Kelamin */}
              <div className="flex gap-4 col-span-2">
                <label>
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Laki-laki"
                    onChange={handleChange}
                  />
                  Laki-laki
                </label>
                <label>
                  <input
                    type="radio"
                    name="jenisKelamin"
                    value="Perempuan"
                    onChange={handleChange}
                  />
                  Perempuan
                </label>
              </div>

              <input
                type="text"
                name="noPaspor"
                placeholder="No Paspor"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="date"
                name="masaBerlakuPaspor"
                className="border p-2"
                onChange={handleChange}
              />

              {/* Upload Lampiran */}
              <input
                type="file"
                name="lampiranKtp"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="file"
                name="lampiranKk"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="file"
                name="lampiranFotoDiri"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="file"
                name="lampiranPaspor"
                className="border p-2"
                onChange={handleChange}
              />

              <input
                type="text"
                name="noVisa"
                placeholder="No Visa (Opsional)"
                className="border p-2"
                onChange={handleChange}
              />
              <input
                type="date"
                name="berlakuSampai"
                className="border p-2"
                onChange={handleChange}
              />

              {/* Dropdown Paket */}
              <select
                name="paketDipilih"
                className="border p-2"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih Paket
                </option>
                {paketList.map((paket) => (
                  <option key={paket.id} value={paket.id}>
                    {paket.name}
                  </option>
                ))}
              </select>

              <select
                name="kamar"
                className="border p-2"
                onChange={handleChange}
              >
                <option value="" disabled>
                  Pilih Kamar
                </option>
                {kamarList.map((kamar) => (
                  <option key={kamar.id} value={kamar.id}>
                    {kamar.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
              Simpan Data
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default FormJamaah;
