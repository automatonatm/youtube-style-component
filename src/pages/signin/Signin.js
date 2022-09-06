import React, {useState} from "react";
import styled from "styled-components";
import api from "util/axios";
import {useDispatch, useSelector} from "react-redux";
import {loginStart, loginSuccess, loginFailure} from "store/reducers/userSlice";

import {auth, provider} from "util/firebase";

import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from "react-router";
import {logout} from "../../store/reducers/userSlice";



const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const More = styled.div`
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const Links = styled.div`
  margin-left: 50px;
`;

const Link = styled.span`
  margin-left: 30px;
`;

const SignIn = () => {

    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch()


    const loginHandler = async (e) => {
        e.preventDefault()


        dispatch(loginStart())


            try {
                const { data: {data} } = await api.post(`/auth/signin`, {email, password});


                dispatch(logout())
                dispatch(loginSuccess(data))

                navigate('/')


            }catch (err) {
                setLoading(false)

                dispatch(loginFailure(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message))

                setError(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message)
            }

        console.log(error)


    }

    const signInWithGoogle = async () => {

        signInWithPopup(auth, provider).then( async (result) => {


            const {user : {displayName: name, email, photoURL: img}} = result



            dispatch(loginStart())

            try {
                const { data: {data} } = await api.post(`/auth/google`, {name, email, img});



                dispatch(loginSuccess(data))

                navigate('/')


            }catch (err) {

                dispatch(loginFailure(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message))

                setError(err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message)
            }


        }).catch((error) => {
            console.log(error)
        })


    }

    return (
        <Container>
            <Wrapper>
                <Title>Sign in</Title>
                <SubTitle>to continue to LamaTube</SubTitle>
                <Input placeholder="email" onChange={e => setEmail(e.target.value)} />
                <Input type="password"  placeholder="password" onChange={e => setPassword(e.target.value)}  />
                <Button onClick={loginHandler}>Sign in</Button>
                <Title>or</Title>
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
                <Input placeholder="username"  onChange={e => setName(e.target.value)} />
                <Input placeholder="email" onChange={e => setEmail(e.target.value)}  />
                <Input type="password" placeholder="password" onChange={e => setPassword(e.target.value)}  />
                <Button>Sign up</Button>
            </Wrapper>
            <More>
                English(USA)
                <Links>
                    <Link>Help</Link>
                    <Link>Privacy</Link>
                    <Link>Terms</Link>
                </Links>
            </More>
        </Container>
    );
};

export default SignIn;
