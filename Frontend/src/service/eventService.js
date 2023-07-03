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

const getAllExpenses = async () => {
  return await axiosInstance.get(`/events/participant/expenses`);
};

const eventService = {
  addEvent,
  updateEvent,
  getEvents,
  deleteEvent,
  getAllExpenses
};

export default eventService;
