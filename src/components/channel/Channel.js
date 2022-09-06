import React, {useEffect} from "react";
import styled from "styled-components";
import {defaultState, fetchFailure, fetchStart, fetchSuccess} from "store/reducers/channelSlice";
import api from "util/axios";

import {useSelector, useDispatch} from "react-redux";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`

const ChannelInfo = styled.div`
   display: flex;
  gap: 20px;
`

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;


const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
   background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`


const Channel = ({video}) => {

    const  {userId, desc} =  video

    const {channel, loading, error} = useSelector(state => state.channel)

    const {user} = useSelector(state => state.user)




    const dispatch = useDispatch()

    useEffect(() => {

        const fetchChannel = async () => {

            dispatch(defaultState())

            dispatch((fetchStart()))

            try {
                const { data: {data} } = await api.get(`/users/${userId}`);

                dispatch(fetchSuccess(data))

            }catch (err) {
                dispatch(fetchFailure(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message))
            }
        }

        fetchChannel()

    }, [userId, dispatch])


    return (
        <Container>
            {!loading && channel && (
                <>
                    <ChannelInfo>
                        <Image
                            src={channel.img || 'https://yt3.ggpht.com/yti/APfAmoE-Q0ZLJ4vk3vqmV4Kwp0sbrjxLyB8Q4ZgNsiRH=s88-c-k-c0x00ffffff-no-rj-mo'}/>
                        <ChannelDetail>
                            <ChannelName>{channel.name}</ChannelName>
                            <ChannelCounter>{channel.subscribers} subscribers</ChannelCounter>
                            <Description>
                                {desc}
                            </Description>
                        </ChannelDetail>

                    </ChannelInfo>

                    <Subscribe>
                        {user.subscribedUsers?.includes(channel._id)
                            ? "SUBSCRIBED"
                            : "SUBSCRIBE"}
                    </Subscribe>
                </>

            )}

        </Container>
    );
};

export default Channel;

