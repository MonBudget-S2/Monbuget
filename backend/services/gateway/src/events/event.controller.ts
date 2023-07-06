import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from "@nestjs/common";
import { EventService } from "./event.service";
import {
  AuthenticationRequired,
  HasRole,
} from "src/authentication/authentication.decorator";
import { Role } from "src/authentication/authentication.enum";
import {
  CreateEventBudgetDto,
  UpdateEventBudgetDto,
} from "./event-budget.request";
import { InvitationStatus } from "./event-invitation.enum";

@AuthenticationRequired()
@Controller("events")
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(
    @Body() createEventBudgetDto: CreateEventBudgetDto,
    @Req() request: CustomRequest
  ) {
    createEventBudgetDto.userId = request.user.id;
    return this.eventService.createEvent(createEventBudgetDto);
  }

  @Get()
  getAllEvents(@Req() request: CustomRequest) {
    const user = request.user;
    return this.eventService.getAllEvents(user);
  }

  @Get("/invitations")
  getInvitations(@Req() request: CustomRequest) {
    const user = request.user;
    return this.eventService.getInvitations(user);
  }

  @Get(":id")
  getEventById(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.eventService.getEventById(id, user);
  }
  @Get("participant/expenses")
  getParticipantExpenses(@Req() request: CustomRequest) {
    console.log("getParticipantExpenses");
    const user = request.user;
    return this.eventService.getParticipantExpenses(user);
  }
  @Get(":id/expenses")
  getEventExpenses(@Param("id") id: string, @Req() request: CustomRequest) {
    console.log("getEventExpenses");
    const user = request.user;
    return this.eventService.getEventExpenses(id, user);
  }

  @Put(":id")
  updateEvent(
    @Param("id") id: string,
    @Body() updateEventBudgetDto: UpdateEventBudgetDto,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.eventService.updateEvent(id, updateEventBudgetDto, user);
  }

  @Delete(":id")
  deleteEvent(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.eventService.deleteEvent(id, user);
  }

  @Post(":id/invite")
  inviteUserToEvent(
    @Param("id") id: string,
    @Body("username") username: string,
    @Req() request: CustomRequest
  ) {
    const inviteUsername = username;
    const user = request.user;
    return this.eventService.inviteUserToEvent(id, inviteUsername, user);
  }

  @Patch("participant/invitations/:invitationId/accept")
  acceptInvitation(
    @Param("invitationId") invitationId: string,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.eventService.updateInvitation(
      invitationId,
      InvitationStatus.ACCEPTED,
      user
    );
  }

  @Patch("participant/invitations/:invitationId/reject")
  rejectInvitation(
    @Param("invitationId") invitationId: string,
    @Req() request: CustomRequest
  ) {
    const user = request.user;
    return this.eventService.updateInvitation(
      invitationId,
      InvitationStatus.REJECTED,
      user
    );
  }

  @Patch(":id/finish")
  markEventAsFinished(@Param("id") id: string, @Req() request: CustomRequest) {
    const user = request.user;
    return this.eventService.markEventAsFinished(id, user);
  }
}
