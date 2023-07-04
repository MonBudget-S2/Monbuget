import axiosInstance from './axiosInterceptor';

const addEvent = async (event) => {
  console.log('createEvent', event);
  return await axiosInstance.post('/events', event);
};

const getEvents = async () => {
  return await axiosInstance.get('/events');
};

const getEventById = async (id) => {
  return await axiosInstance.get(`/events/${id}`);
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

const getAllExpensesByEventId = async (id) => {
  return await axiosInstance.get(`/events/${id}/expenses`);
};

const getAllInvitations = async () => {
  return await axiosInstance.get(`/events/participant/invitations`);
};

const acceptInvitation = async (id) => {
  return await axiosInstance.patch(`/events/participant/invitations/${id}/accept`);
};

const rejectInvitation = async (id) => {
  return await axiosInstance.patch(`/events/participant/invitations/${id}/reject`);
};

const eventService = {
  addEvent,
  updateEvent,
  getEvents,
  getEventById,
  deleteEvent,
  getAllExpenses,
  getAllExpensesByEventId,
  getAllInvitations,
  acceptInvitation,
  rejectInvitation
};

export default eventService;
