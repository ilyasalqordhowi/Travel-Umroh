import React from "react";
import { FaXmark } from "react-icons/fa6";

function FormJamaah() {
  const [closeForm, setCloseForm] = React.useState(true);
  function btnClose() {
    setCloseForm(!closeForm);
  }
  return (
    <>
      {closeForm && (
        <div className=" flex items-center justify-center fixed bg-black/25 w-full h-full top-0">
          <div className="p-6 max-w-4xl mx-auto">
            <form className="bg-white p-6 rounded shadow-md">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl mb-4 font-bold">
                  Form Edit Data Jamaah
                </h1>
                <button type="button" onClick={btnClose}>
                  <FaXmark />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  name="namaLengkap"
                  placeholder="Nama Lengkap"
                  className="border p-2"
                />
                <input
                  type="number"
                  name="nik"
                  placeholder="NIK"
                  className="border p-2"
                />
                <input
                  type="text"
                  name="tempatLahir"
                  placeholder="Tempat Lahir"
                  className="border p-2"
                />
                <input type="date" name="tanggalLahir" className="border p-2" />
                <textarea
                  name="alamat"
                  placeholder="Alamat"
                  className="border p-2 col-span-2"
                />
                <select name="provinsi" className="border p-2">
                  <option value="" disabled>
                    Pilih Provinsi
                  </option>
                  <option value="Jawa Barat">Jawa Barat</option>
                </select>

                <select name="jenisKelamin" className="border p-2">
                  <option value="" disabled>
                    Jenis Kelamin
                  </option>
                  <option value="Laki-laki">Laki-laki</option>
                  <option value="Perempuan">Perempuan</option>
                </select>
                <input
                  type="text"
                  name="noPaspor"
                  placeholder="No Paspor"
                  className="border p-2"
                />
                <input
                  type="date"
                  name="masaBerlakuPaspor"
                  className="border p-2"
                />

                <input type="file" name="lampiranKtp" className="border p-2" />
                <input type="file" name="lampiranKk" className="border p-2" />

                <input
                  type="text"
                  name="noVisa"
                  placeholder="No Visa (Opsional)"
                  className="border p-2"
                />
                <input
                  type="date"
                  name="berlakuSampai"
                  className="border p-2"
                />
                <select name="paketDipilih" className="border p-2">
                  <option value="" disabled>
                    Pilih Paket
                  </option>
                  <option value="Paket Itikaf">Paket Itikaf</option>
                  <option value="Paket Reguler">Paket Reguler</option>
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
      )}
    </>
  );
}
export default FormJamaah;
