import React, { useState } from 'react';
import { Grid, Button, TextField } from '@mui/material';
import { MeetingProvider, MeetingConsumer, useMeeting } from '@videosdk.live/react-sdk';

// import { getToken, createMeeting } from "./api";
import ParticipantView from './ParticipantView';
import { meetingService } from 'service/meetingService';

const chunk = (arr) => {
  const newArr = [];
  while (arr.length) newArr.push(arr.splice(0, 3));
  return newArr;
};

function MeetingGrid(props) {
  const [joined, setJoined] = useState(false);
  const { join, leave, toggleMic, toggleWebcam, toggleScreenShare } = useMeeting();
  const { participants } = useMeeting();
  const joinMeeting = () => {
    setJoined(true);
    join();
  };

  return (
    <div>
      <header>Meeting Id: {props.meetingId}</header>
      {joined ? (
        <div>
          <Button onClick={leave}>Leave</Button>
          <Button onClick={toggleMic}>Toggle Mic</Button>
          <Button onClick={toggleWebcam}>Toggle Webcam</Button>
          <Button onClick={toggleScreenShare}>Toggle Screen Share</Button>
        </div>
      ) : (
        <Button onClick={joinMeeting}>Join</Button>
      )}
      <Grid container spacing={3}>
        {chunk([...participants.keys()]).map((k) => (
          <Grid key={k} container item spacing={3}>
            {k.map((l) => (
              <Grid key={l} item xs={4}>
                <ParticipantView key={l} participantId={l} />
              </Grid>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

function JoinScreen({ updateMeetingId, getMeetingAndToken }) {
  const [meetingIdInput, setMeetingIdInput] = useState('');

  const handleJoinClick = () => {
    updateMeetingId(meetingIdInput);
    getMeetingAndToken();
  };

  const handleCreateClick = () => {
    getMeetingAndToken();
  };

  return (
    <div>
      <TextField type="text" placeholder="Enter Meeting Id" value={meetingIdInput} onChange={(e) => setMeetingIdInput(e.target.value)} />
      <Button onClick={handleJoinClick}>Join</Button>
      <Button onClick={handleCreateClick}>Create Meeting</Button>
    </div>
  );
}

function MeetingPage() {
  const token = process.env.REACT_APP_VIDEOSDK_TOKEN;
  const [meetingId, setMeetingId] = useState(null);

  const getMeetingAndToken = async () => {
    setMeetingId(meetingId ? meetingId : await meetingService.createMeeting(token));
  };

  const updateMeetingId = (meetingId) => {
    setMeetingId(meetingId);
  };

  return token && meetingId ? (
    <MeetingProvider
      config={{
        meetingId,
        micEnabled: true,
        webcamEnabled: true,
        name: 'John Doe'
      }}
      token={token}
    >
      <MeetingConsumer>{() => <MeetingGrid meetingId={meetingId} getMeetingAndToken={getMeetingAndToken} />}</MeetingConsumer>
    </MeetingProvider>
  ) : (
    <JoinScreen updateMeetingId={updateMeetingId} getMeetingAndToken={getMeetingAndToken} />
  );
}

export default MeetingPage;
