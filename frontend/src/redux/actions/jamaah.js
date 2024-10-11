import axios from "axios";

export const CREATE_JAMAAH = "CREATE_JAMAAH";
export const UPDATE_JAMAAH = "UPDATE_JAMAAH";
export const DELETE_JAMAAH = "DELETE_JAMAAH";
export const GET_JAMAAH = "GET_JAMAAH";
export const GET_ALL_JAMAAH = "GET_ALL_JAMAAH";

const API_BASE_URL = "http://103.93.58.89:21219/jamaah";

export const createJamaah = (data) => async (dispatch) => {
  const response = await axios.post(`${API_BASE_URL}/create`, data);
  dispatch({ type: CREATE_JAMAAH, payload: response.data });
};

export const updateJamaah = (data) => async (dispatch) => {
  const response = await axios.patch(`${API_BASE_URL}/update`, data);
  dispatch({ type: UPDATE_JAMAAH, payload: response.data });
};

export const deleteJamaah = (id) => async (dispatch) => {
  await axios.delete(`${API_BASE_URL}/jamaah/${id}`);
  dispatch({ type: DELETE_JAMAAH, payload: id });
};

export const getJamaahById = (id) => async (dispatch) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  dispatch({ type: GET_JAMAAH, payload: response.data });
};

export const getAllJamaah = () => async (dispatch) => {
  try {
    const response = await axios.get(API_BASE_URL);
    console.log(response.data); // Periksa apa yang dikembalikan
    dispatch({ type: GET_ALL_JAMAAH, payload: response.data }); // Sesuaikan jika perlu
  } catch (error) {
    console.error("Error fetching all jamaah:", error);
  }
};
