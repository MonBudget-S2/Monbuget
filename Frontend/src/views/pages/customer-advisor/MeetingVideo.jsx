import React, { useEffect, useState } from 'react';
import { MeetingProvider, useMeeting } from '@videosdk.live/react-sdk';
import { meetingService } from 'service/meetingService';
import { useParams } from 'react-router-dom';

const MeetingVideo = () => {
  const [token, setToken] = useState('');
  const [isMeetingValid, setIsMeetingValid] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  let { meetingId } = useParams();
  console.log(meetingId);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await meetingService.getToken(meetingId);
        if (response.status === 200) {
          setToken(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      validateMeeting();
    }
  }, [token]);

  const validateMeeting = async () => {
    const data = {
      token: token
    };
    try {
      const response = await meetingService.validateToken(meetingId, data);
      if (response.status === 201) {
        if (response.data.isValid) {
          setIsMeetingValid(true);
          joinMeeting();
        } else {
          setIsMeetingValid(false);
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const joinMeeting = () => {
    const meetingProviderConfig = {
      meetingId: meetingId,
      name: 'Your Name',
      micEnabled: true,
      webcamEnabled: true,
      maxResolution: '720p'
    };

    return (
      <MeetingProvider config={meetingProviderConfig} token={token}>
        <MeetingView />
      </MeetingProvider>
    );
  };

  const MeetingView = () => {
    const meeting = useMeeting();

    const handleJoinMeeting = () => {
      meeting?.join();
    };

    return (
      <div>
        <h1>Meeting View</h1>
        <button onClick={handleJoinMeeting}>Join Meeting</button>
      </div>
    );
  };

  return (
    <div>
      <h1>Meeting</h1>
      {isLoading ? <p>Loading...</p> : isMeetingValid ? joinMeeting() : <p>Invalid meeting ID</p>}
    </div>
  );
};

export default MeetingVideo;
