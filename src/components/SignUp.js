import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBRow,
    MDBCol,
    MDBIcon,
    MDBInput
}
from 'mdb-react-ui-kit';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const res = await axios.post('', { email, userName, password });
        if (res.status === 201 || 200) {
            navigate('/');
        }
        } catch (error) {
            if(error.response){
                console.log(error.response)
                if(error.response.status === 400 || 401){
                    setError("Candidate already exists");
                    navigate('/signup');
                } else if (error.response.status === 500) {
                    setError('Server error, please try again later');
                } else {
                    setError('An unknown error occurred');
                }
            } else if (error.request) {
                setError('No response from the server');
            } else {
                setError('Error in setting up request');
            }
        console.error('Error signing up', error);
        }
    };

    return (
        <MDBContainer className="my-5">
        <form onSubmit={handleSubmit}>
        <MDBCard>
            <MDBRow className='g-0'>

            <MDBCol md='6'>
                <MDBCardImage src='/homeImage.png' alt="login form" className='rounded-start w-75 mx-5 p-5' />
            </MDBCol>

            <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>

                <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="cubes fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">CANDIDATE DETAILS</span>
                </div>

                <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Create New Account</h5>

                    <MDBInput wrapperClass='mb-4' label='User Name' id='formControlLg' type='text' size="lg" value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='text' size="lg" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" value={password} onChange={(e) => setPassword(e.target.value)} />

                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <MDBBtn className="mb-4 px-5" color='dark' size='lg' type='submit'>Register</MDBBtn>
                <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Already have an account? <a href="/login" style={{color: 'blue'}}>Login</a></p>

                </MDBCardBody>
            </MDBCol>

            </MDBRow>
        </MDBCard>
        </form>
    </MDBContainer>
    );
}
