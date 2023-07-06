import axiosInstance from './axiosInterceptor';

const createMeeting = async (token) => {
  console.log('token', token);
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: 'POST',
    headers: {
      authorization: `${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  });
  //Destructuring the roomId from the response
  const { roomId } = await res.json();
  return roomId;
};

// // API call to generate authentication token
export const getToken = async (meetingId) => {
  const res = await axiosInstance.get(`/meetings/${meetingId}/token`);
  return res;
};

const validateToken = async (meetingId, data) => {
  const res = await axiosInstance.post(`/meetings/${meetingId}/validateMeetingToken`, data);
  return res;
};

// // API call to create meeting
// export const createMeeting = async ({ token }) => {
//   const res = await fetch(`${API_BASE_URL}/create-meeting`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ token }),
//   });

//   const { meetingId } = await res.json();
//   return meetingId;
// };

const getSchedules = async () => {
  const res = await axiosInstance.get('/advisors/schedules');
  return res;
};

const updateSchedule = async (data) => {
  const res = await axiosInstance.patch('/advisors/schedules', data);
  return res;
};

const getAvailableSlotsForAppointment = async (advisorId) => {
  const res = await axiosInstance.get(`/advisors/${advisorId}/availability-for-appointment`);
  return res;
};

const getMeetings = async () => {
  const res = await axiosInstance.get('/meetings');
  return res;
};

const getMeetingDetails = async (meetingId) => {
  const res = await axiosInstance.get(`/meetings/${meetingId}`);
  return res;
};
const requestMeeting = async (data) => {
  const res = await axiosInstance.post('/meetings', data);
  return res;
};

const getAdvisors = async () => {
  const res = await axiosInstance.get('/advisors');
  return res;
};

const acceptMeetingRequest = async (meetingId) => {
  const res = await axiosInstance.patch(`/meetings/${meetingId}/approve`);
  return res;
};

export const meetingService = {
  createMeeting,
  getSchedules,
  updateSchedule,
  getMeetings,
  getAvailableSlotsForAppointment,
  requestMeeting,
  getMeetingDetails,
  getAdvisors,
  acceptMeetingRequest,
  getToken,
  validateToken
};
