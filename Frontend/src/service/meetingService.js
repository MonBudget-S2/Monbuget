// import axiosInstance from './axiosInterceptor';

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

const meetingService = {
  createMeeting
};

export default meetingService;

// const API_BASE_URL = process.env.REACT_APP_SERVER_URL;

// // API call to generate authentication token
// export const getToken = async () => {
//   const res = await fetch(`${API_BASE_URL}/get-token`, {
//     method: "GET",
//   });

//   const { token } = await res.json();
//   return token;
// };

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
