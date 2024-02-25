import { axiosInstance } from ".";

export const AddInventory = (data) => {
  return axiosInstance("post", "/api/inventory/add", data);
};

export const GetInventory = () => {
  return axiosInstance("get", "/api/inventory/get");
}

export const GetAllDonarsOfAnOrganization = () => {
  return axiosInstance("get", "/api/users/get-all-donars");
}
export const GetAllHospitalsOfAnOrganization = () => {
  return axiosInstance("get", "/api/users/get-all-hospitals");
}