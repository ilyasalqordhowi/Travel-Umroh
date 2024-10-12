import React, { useState, useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import { addJamaah } from "../redux/reducers/jamaah";
import { useDispatch } from "react-redux";

function FormJamaah({ onClose }) {
  const [provinsiList, setProvinsi] = React.useState([]);
  const [kabupatenList, setKabupaten] = React.useState([]);
  const [kamarList, setKamar] = React.useState([]);
  const [paketList, setPaket] = React.useState([]);
  const dispatch = useDispatch();
  // namaLengkap: "",
  // nik: "",
  // tempatLahir: "",
  // tanggalLahir: "",
  // alamat: "",
  // provinsi: "",
  // kabupaten: "",
  // jenisKelamin: "",
  // noPaspor: "",
  // masaBerlakuPaspor: "",
  // noVisa: "",
  // berlakuSampai: "",
  // paketDipilih: "",
  // kamar: "",
  // lampiranKtp: null,
  // lampiranKk: null,
  // lampiranFotoDiri: null,
  // lampiranPaspor: null,
  const formik = useFormik({
    onSubmit: Post,
    initialValues: {
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
      paket: "",
      kamar: "",
    },
    validationSchema: Yup.object({
      namaLengkap: Yup.string().required("Nama Lengkap wajib diisi"),
      nik: Yup.string().required("NIK wajib diisi"),
      tempatLahir: Yup.string().required("Tempat Lahir wajib diisi"),
      tanggalLahir: Yup.date().required("Tanggal Lahir wajib diisi"),
      alamat: Yup.string().required("Alamat wajib diisi"),
      provinsi: Yup.string().required("Provinsi wajib diisi"),
      kabupaten: Yup.string().required("Kabupaten wajib diisi"),
      jenisKelamin: Yup.string().required("Jenis Kelamin wajib diisi"),
      noPaspor: Yup.string().required("Nomor Paspor wajib diisi"),
      masaBerlakuPaspor: Yup.date().required("Masa Berlaku Paspor wajib diisi"),
      noVisa: Yup.string(),
      berlakuSampai: Yup.date(),
      paket: Yup.string().required("Paket wajib dipilih"),
      kamar: Yup.string().required("Kamar wajib diisi"),
    }),
  });
  async function Post() {
    const namaLengkap = formik.values.namaLengkap;
    const nik = formik.values.nik;
    const tempatLahir = formik.values.tempatLahir;
    const tanggalLahir = formik.values.tanggalLahir;
    const alamat = formik.values.alamat;
    const provinsi = formik.values.provinsi;
    const kabupaten = formik.values.kabupaten;
    const jenisKelamin = formik.values.jenisKelamin;
    const noPaspor = formik.values.noPaspor;
    const masaBerlakuPaspor = formik.values.masaBerlakuPaspor;
    const noVisa = formik.values.noVisa;
    const berlakuSampai = formik.values.berlakuSampai;
    const paket = formik.values.paket;
    const kamar = formik.values.kamar;

    console.log(namaLengkap, "ini Nama Lengkap");
    console.log(nik, "ini NIK");
    console.log(tempatLahir, "ini Tempat Lahir");
    console.log(tanggalLahir, "ini Tanggal Lahir");
    console.log(alamat, "ini Alamat");
    console.log(provinsi, "ini Provinsi");
    console.log(kabupaten, "ini Kabupaten");
    console.log(jenisKelamin, "ini Jenis Kelamin");
    console.log(noPaspor, "ini No. Paspor");
    console.log(masaBerlakuPaspor, "ini Masa Berlaku Paspor");
    console.log(noVisa, "ini No. Visa");
    console.log(berlakuSampai, "ini Berlaku Sampai");
    console.log(paket, "ini Paket Dipilih");
    console.log(kamar, "ini Kamar");

    // setLoading(false);
    const formData = new URLSearchParams();
    formData.append("nama_lengkap", namaLengkap);
    formData.append("nik", nik);
    formData.append("tempat_lahir", tempatLahir);
    formData.append("tanggal_lahir", tanggalLahir);
    formData.append("alamat", alamat);
    formData.append("provinsi_id", provinsi);
    formData.append("kabupaten_kota_id", kabupaten);
    formData.append("jenis_kelamin", jenisKelamin);
    formData.append("no_paspor", noPaspor);
    formData.append("masa_berlaku_paspor", masaBerlakuPaspor);
    formData.append("no_visa", noVisa);
    formData.append("berlaku_sampai", berlakuSampai);
    formData.append("paket_id", paket);
    formData.append("kamar_id", kamar);

    const dataProfile = await fetch("http://103.93.58.89:21219/jamaah/create", {
      method: "POST",
      body: formData,
    });
    console.log(dataProfile, "ini data profile");
    const response = await dataProfile.json();
    console.log(response, "ini data jamaah");
    if (response.success) {
      dispatch(addJamaah(response.results));
    }
    //   uploadImage();
    //   setTimeout(() => {
    //     setLoading(true);
    //   }, 3000);
    // } else {
    //   setTimeout(() => {
    //     setLoading(true);
    //     setMessage(true);
    //   }, 3000);
    // }
  }
  console.log(kabupatenList, "ini kabupaten");
  console.log(provinsiList, "ini provinsi");
  React.useEffect(() => {
    async function dataProvinsi() {
      const response = await fetch("http://103.93.58.89:21219/jamaah/provinsi");
      const json = await response.json();
      const allProvinsi = json.results;
      setProvinsi(allProvinsi);
    }
    dataProvinsi();
  }, []);
  React.useEffect(() => {
    async function dataKabupaten() {
      const response = await fetch(
        "http://103.93.58.89:21219/jamaah/kabupaten"
      );
      const json = await response.json();
      const allKabupaten = json.results;
      setKabupaten(allKabupaten);
    }
    dataKabupaten();
  }, []);
  React.useEffect(() => {
    async function dataKamar() {
      const response = await fetch("http://103.93.58.89:21219/jamaah/kamar");
      const json = await response.json();
      const allKamar = json.results;
      setKamar(allKamar);
    }
    dataKamar();
  }, []);
  React.useEffect(() => {
    async function dataPaket() {
      const response = await fetch("http://103.93.58.89:21219/jamaah/paket");
      const json = await response.json();
      const allPaket = json.results;
      setPaket(allPaket);
    }
    dataPaket();
  }, []);

  return (
    <>
      <div className="md:flex md:flex-row overflow-y-auto items-center justify-center fixed bg-black/25 w-full h-full top-0">
        <div className="md:flex md:flex-row flex flex-col p-4 max-w-4xl mx-auto w-full">
          <form
            onSubmit={formik.handleSubmit}
            className="bg-blue-300 p-4   rounded shadow-md"
          >
            <div className="flex justify-between items-center">
              <h1 className="text-2xl mb-4 font-bold">Form Data Jamaah</h1>
              <button type="button" onClick={onClose}>
                <FaXmark />
              </button>
            </div>
            <div className="grid grid-cols-2  md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <input
                  type="text"
                  name="namaLengkap"
                  placeholder="Nama Lengkap"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.namaLengkap && formik.touched.namaLengkap && (
                  <p className="font-bold text-red-300">
                    {formik.errors.namaLengkap}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="number"
                  name="nik"
                  placeholder="NIK"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.nik && formik.touched.nik && (
                  <p className="font-bold text-red-300">{formik.errors.nik}</p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="tempatLahir"
                  placeholder="Tempat Lahir"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.tempatLahir && formik.touched.tempatLahir && (
                  <p className="font-bold text-red-300">
                    {formik.errors.tempatLahir}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="date"
                  name="tanggalLahir"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.tanggalLahir && formik.touched.tanggalLahir && (
                  <p className="font-bold text-red-300">
                    {formik.errors.tanggalLahir}
                  </p>
                )}
              </div>
              <textarea
                name="alamat"
                placeholder="Alamat"
                className="border p-2 col-span-2 w-full"
              />
              <select name="provinsi" className="border p-2 w-full">
                <option value="" disabled>
                  Pilih Provinsi
                </option>
                {provinsiList.map((provinsi) => (
                  <option key={provinsi.id} value={provinsi.id}>
                    {provinsi.provinsi}
                  </option>
                ))}
              </select>
              <select name="kabupaten" className="border p-2 w-full">
                <option value="" disabled>
                  Pilih Kabupaten
                </option>
                {kabupatenList.map((kabupaten) => (
                  <option key={kabupaten.id} value={kabupaten.id}>
                    {kabupaten.kabupaten_kota}
                  </option>
                ))}
              </select>
              <div className="flex gap-4 col-span-2 w-full">
                <label>
                  <input type="radio" name="jenisKelamin" value="Laki-laki" />
                  Laki-laki
                </label>
                <label>
                  <input type="radio" name="jenisKelamin" value="Perempuan" />
                  Perempuan
                </label>
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  name="noPaspor"
                  placeholder="No Paspor"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.noPaspor && formik.touched.noPaspor && (
                  <p className="font-bold text-red-300">
                    {formik.errors.noPaspor}
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <input
                  type="date"
                  name="masaBerlakuPaspor"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.masaBerlakuPaspor &&
                  formik.touched.masaBerlakuPaspor && (
                    <p className="font-bold text-red-300">
                      {formik.errors.masaBerlakuPaspor}
                    </p>
                  )}
              </div>

              <div className="flex flex-col">
                <input
                  type="file"
                  name="lampiranKtp"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="file"
                  name="lampiranKk"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="file"
                  name="lampiranFotoDiri"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="file"
                  name="lampiranPaspor"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
              </div>
              <div className="flex flex-col">
                <input
                  name="noVisa"
                  placeholder="No Visa (Opsional)"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.noVisa && formik.touched.noVisa && (
                  <p className="font-bold text-red-300">
                    {formik.errors.noVisa}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="date"
                  name="berlakuSampai"
                  className="border p-2 w-full"
                  onChange={formik.handleChange}
                />
                {formik.errors.berlakuSampai &&
                  formik.touched.berlakuSampai && (
                    <p className="font-bold text-red-300">
                      {formik.errors.berlakuSampai}
                    </p>
                  )}
              </div>

              <select name="paket" className="border p-2 w-full">
                <option value="" disabled>
                  Pilih Paket
                </option>
                {paketList.map((paket) => (
                  <option key={paket.id} value={paket.id}>
                    {paket.paket}
                  </option>
                ))}
              </select>
              <select name="kamar" className="border p-2 w-full">
                <option value="" disabled>
                  Pilih Kamar
                </option>
                {kamarList.map((kamar) => (
                  <option key={kamar.id} value={kamar.id}>
                    {kamar.kamar}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="mt-4 bg-yellow-300 text-black px-4 py-2 rounded w-full"
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
