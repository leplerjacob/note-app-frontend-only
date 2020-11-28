import axios from "axios";
const baseUrl = "/api/notes";

let token = null

const setToken = newToken => {
    token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const create = async (newObject) => {
  const config = {
    headers: {Authorization: token},
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
};

const deleteNote = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(() => "Note deleted...")
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((res) => res.data)
};

export default {
  getAll,
  create,
  deleteNote,
  update,
  setToken
};
