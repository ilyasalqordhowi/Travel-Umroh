import {
  CREATE_JAMAAH,
  UPDATE_JAMAAH,
  DELETE_JAMAAH,
  GET_JAMAAH,
  GET_ALL_JAMAAH,
} from "../actions/jamaah";

// State awal untuk reducer
const initialState = {
  jamaah: null, // Menyimpan data jamaah untuk detail spesifik
  allJamaah: [], // Menyimpan daftar semua jamaah
};

// Reducer untuk mengelola state jamaah
const jamaahReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JAMAAH:
      // Menambahkan jamaah baru ke daftar
      return {
        ...state,
        allJamaah: [...state.allJamaah, action.payload], // Menggabungkan jamaah baru dengan yang lama
      };

    case UPDATE_JAMAAH:
      // Memperbarui jamaah yang ada
      return {
        ...state,
        allJamaah: state.allJamaah.map(
          (jamaah) =>
            jamaah.id === action.payload.id ? action.payload : jamaah // Mengganti yang sesuai
        ),
      };

    case DELETE_JAMAAH:
      // Menghapus jamaah berdasarkan ID
      return {
        ...state,
        allJamaah: state.allJamaah.filter(
          (jamaah) => jamaah.id !== action.payload // Mengambil yang tidak sesuai dengan ID yang dihapus
        ),
      };

    case GET_JAMAAH:
      // Menyimpan detail jamaah berdasarkan ID
      return {
        ...state,
        jamaah: action.payload,
      };

    case GET_ALL_JAMAAH:
      // Menyimpan semua jamaah yang diambil dari API
      return {
        ...state,
        allJamaah: action.payload, // Pastikan payload sesuai dengan struktur data yang diterima
      };

    default:
      return state; // Mengembalikan state yang tidak berubah untuk aksi yang tidak dikenali
  }
};

export default jamaahReducer;
