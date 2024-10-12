import React from "react";
import Sidebar from "../component/Sidebar";
import Navbar from "../component/Navbar";
import { FaPlus, FaMarker, FaIdCardClip, FaTrashCan } from "react-icons/fa6";
import FormJamaah from "../component/FormJamaah";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import jamaah, { addJamaah } from "../redux/reducers/jamaah";

function DataJamaah() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [add, setAdd] = React.useState(true);
  const token = useSelector((state) => state.auth.token);
  console.log(token, "ini adlah token");
  const jamaahList = useSelector((state) => state.jamaah.data);
  console.log(jamaahList, "ini adalah data");
  if (token === null) {
    navigate("/");
  }
  function btnTambah() {
    setAdd(!add);
  }

  React.useEffect(() => {
    async function Data() {
      const response = await fetch("http://103.93.58.89:21219/jamaah");
      const json = await response.json();
      dispatch(addJamaah(json.results));
    }
    Data();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-col p-5 md:p-10 gap-5 bg-blue-500 w-full">
          <h1 className="text-[20px] md:text-[24px]">Data Jamaah</h1>
          <div>
            <button
              onClick={btnTambah}
              className="flex items-center gap-2 hover:brightness-75 bg-yellow-300 p-3 rounded-lg"
            >
              <FaPlus className="font-extrabold text-[20px]" />
              <h2>Tambah data</h2>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="table-auto border w-full">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Nama</th>
                  <th className="p-2 text-left">NIK</th>
                  <th className="p-2 text-left">Tempat Lahir</th>
                  <th className="p-2 text-left">Tanggal Lahir</th>
                  <th className="p-2 text-left">Alamat</th>
                  <th className="p-2 text-center">Preview</th>
                  <th className="p-2 text-center">Edit & Delete</th>
                </tr>
              </thead>
              <tbody>
                {jamaahList.map((jamaah) => (
                  <tr key={jamaah.id} className="border-t">
                    <td className="p-2 text-center">{jamaah.nama_lengkap}</td>
                    <td className="p-2 text-center">{jamaah.nik}</td>
                    <td className="p-2 text-center">{jamaah.tempat_lahir}</td>
                    <td className="p-2 text-center">{jamaah.tanggal_lahir}</td>
                    <td className="p-2 text-center">{jamaah.alamat}</td>
                    <td className="p-2 text-center">
                      <button>
                        <FaIdCardClip />
                      </button>
                    </td>
                    <td className="p-2 flex justify-center gap-5">
                      <button className="text-orange-500">
                        <FaMarker />
                      </button>
                      <button className="text-red-600">
                        <FaTrashCan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {!add && <FormJamaah onClose={btnTambah} />}
      </div>
    </>
  );
}

export default DataJamaah;
