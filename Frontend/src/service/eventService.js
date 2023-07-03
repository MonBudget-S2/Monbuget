import axiosInstance from './axiosInterceptor';

const addEvent = async (event) => {
  console.log('createEvent', event);
  return await axiosInstance.post('/events', event);
};

const getEvents = async () => {
  return await axiosInstance.get('/events');
};

const updateEvent = async (id, event) => {
  return await axiosInstance.put(`/events/${id}`, event);
};

const deleteEvent = async (id) => {
  return await axiosInstance.delete(`/events/${id}`);
};

const getExpenses = async (id) => {
  return await axiosInstance.get(`/events/${id}/expenses`);
};

const eventService = {
  addEvent,
  updateEvent,
  getEvents,
  deleteEvent,
  getExpenses
};

export default eventService;
