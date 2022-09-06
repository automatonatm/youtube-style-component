import React, {useEffect, useState} from 'react';
import styled  from 'styled-components'
import {Card} from "components";
import api from 'util/axios'

import {getVideos, defaultState} from 'store/reducers/videosSlice'
import {useDispatch, useSelector} from "react-redux";

const Container = styled.div`
    display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
 
`

const Home = ({type}) => {


    const dispatch = useDispatch()


    //const [videos, setVideos] = useState([])
    //const [loading, setLoading] = useState(false)

    const {videos, loading, error} = useSelector(state => state.videos)

    useEffect(() => {

        dispatch(defaultState())

        dispatch(getVideos({type}))


    }, [dispatch, type])



    return (
        <Container>


            {loading ? <p>Loading...</p> : (
                <>
                    {
                      videos &&  (
                          videos.data.map(video => (
                              <Card key={video._id} video={video}/>
                          ))
                      )
                    }
                </>
            )}


        </Container>
    );
};

export default Home;
