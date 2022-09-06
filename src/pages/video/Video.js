import React, {useEffect, useState} from 'react';
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import styled from 'styled-components'

import {format} from 'timeago.js'

import {Card, Comments} from "components";
import {useDispatch, useSelector} from "react-redux";



import { useParams } from 'react-router';

import {Recommendations, Channel} from "components";

import api from "util/axios";

import {fetchStart, fetchSuccess, fetchFailure, defaultState, like, dislike} from "store/reducers/videoSlice";


const Container = styled.div`
  display: flex;
  gap: 24px;
`

const Content = styled.div`
  flex: 5;

`

const VideoWrapper = styled.div`
  
`

const Title = styled.h1`
 font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({theme}) => theme.text};
`

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Info = styled.span`
  color: ${({theme}) => theme.textSoft};
`

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({theme}) => theme.text};
`

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;




const Hr = styled.hr`
  margin: 15px;
  border: 0.5px solid ${({theme}) => theme.soft};
`;



const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;


const Video = () => {

    const {user, loading, error} = useSelector(state => state.user)

    const {video, loading: videoLoading, error: videoError} = useSelector(state => state.video)

    const dispatch = useDispatch()

   const {id} = useParams()


    useEffect(() => {

        const fetchData = async () => {

            dispatch(defaultState())

            dispatch((fetchStart()))

            try {
                const { data: {data} } = await api.get(`/videos/${id}`);


                dispatch(fetchSuccess(data))

            }catch (err) {
                dispatch(fetchFailure(err.response && err.response.data.message ? err.response.data.message : err.message))
            }
        }


        fetchData()

    }, [id, dispatch])


    const handleLike = async () => {
        await api.put(`/users/like/${video.id}`);
        dispatch(like(user.id));
    };

    const handleDislike = async () => {
        await api.delete(`/users/like/${video.id}`);
        dispatch(dislike(user.id));
    };

  /*  const handleSub = async () => {
        currentUser.subscribedUsers.includes(channel._id)
            ? await axios.put(`/users/unsub/${channel._id}`)
            : await axios.put(`/users/sub/${channel._id}`);
        dispatch(subscription(channel._id));
    };*/


    return (
        <Container>
            {videoLoading ? <p>Loading....</p> : (video && (
                <Content>
                    <VideoWrapper>
                        <VideoFrame src={video.videoUrl} controls />
                    </VideoWrapper>
                    <Title>{video.title}</Title>
                    <Details>
                        <Info>{video.views} views • {format(video.createdAt)}</Info>
                        <Buttons>
                            <Button onClick={handleLike}>
                                {video.likes?.includes(user.id) ? (
                                    <>
                                        <ThumbUpIcon/> {video.likes?.length}
                                    </>
                                ) : (
                                    <>
                                    <ThumbUpOutlinedIcon/> {video.likes?.length}
                                    </>
                                )}

                            </Button>
                            <Button onClick={handleDislike}>
                                {video.dislikes?.includes(user.id) ? (
                                    <>
                                        <ThumbDownIcon/> {video.dislikes?.length}
                                    </>
                                ) : (

                                    <>
                                        <ThumbDownOffAltOutlinedIcon/> {video.dislikes?.length}
                                    </>
                                )}

                            </Button>
                            <Button>
                                <ReplyOutlinedIcon/> Share
                            </Button>
                            <Button>
                                <AddTaskOutlinedIcon/> Save
                            </Button>
                        </Buttons>
                    </Details>

                    <Hr/>

                    <Channel video={video}/>

                    <Hr/>

                    <Comments>

                    </Comments>

                </Content>
            ))}


            {/*<Recommendations user={user}/>*/}

        </Container>
    );
};

export default Video;
