import axiosInstance from './axiosInterceptor';

const changePassword = async (credentials) => {
  return await axiosInstance.patch('/users/change-password', credentials);
};

const update = async (id,user) => {
  return await axiosInstance.put('/users/'+id, user);
};

const userService = {
  changePassword,
  update,
};

export default userService;
