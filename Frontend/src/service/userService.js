import axiosInstance from './axiosInterceptor';

const changePassword = async (credentials) => {
  return await axiosInstance.patch('/users/change-password', credentials);
};

const update = async (id,user) => {
  return await axiosInstance.put('/users/'+id, user);
};

const uploadAvatar = async (id,formData) => {
  return await axiosInstance.patch('users/upload/avatar/'+id, formData);
}

const getAvatar = async (id) => {
  return await axiosInstance.get('users/profile-image/'+id,{ responseType: 'arraybuffer' });
}

const verifyUser = async (token) =>{
  return await axiosInstance.post('users/confirm/'+token);
}

const userService = {
  changePassword,
  update,
  uploadAvatar,
  getAvatar,
  verifyUser,
};

export default userService;
