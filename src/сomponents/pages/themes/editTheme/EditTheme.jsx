import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from "react-redux";
import EditText from './editText/EditText';
import EditFiles from './editFiles/EditFiles';
import EditImage from './editImage/EditImage';


const EditTheme = () => {
    const param = useParams()
    const theme = {
        _id: param.id,
        name: 'Тема222',
        discription: 'Описание'
    }
    return (
        <>
            <Container className='mb-3 mt-3'>
                <h2 style={{ textAlign: 'center' }}>Изменение темы с ID: {param.id}</h2>
                <EditImage theme={theme} />
                <EditFiles theme={theme} />
                <EditText theme={theme} />
            </Container>
        </>
    );
};

export default EditTheme;