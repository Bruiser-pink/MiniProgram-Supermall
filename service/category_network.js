import request from "./network"

const baseURL = "http://123.207.32.32:8000/api/hy"
export function getMultiData() {
  return request({
    url:baseURL + '/home/multidata'
  })
}