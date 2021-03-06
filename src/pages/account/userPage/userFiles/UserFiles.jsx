import React, { useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postUserFile } from '../../../../actions/file';
import { getUserExtend } from '../../../../actions/user';
import { setUserExtend } from '../../../../reducers/userReducer';
import FileList from '../../../../components/fileList/FileList';
import ProcState from '../../../../components/procState/ProcState';

const UserFiles = () => {
    const currentUser = useSelector(state => state.user.currentUser)
    const param = useParams()
    let userId
    if (currentUser.role === 'ADMIN') {
        userId = param.id
    } else {
        userId = currentUser.id
    }
    const dispatch = useDispatch()
    let inputFiles = React.createRef()
    useEffect(() => {
        console.log('user.id' + userId)
        dispatch(getUserExtend(userId, 'General'))
        return () => {
            dispatch(setUserExtend({}))
        }
    }, [])
    function fileUploadHandler() {
        const files = [...inputFiles.current.files]
        files.forEach(file => dispatch(postUserFile(userId, 'General', file)))
        console.log('отправка файла на сервер')
    }
    const userExtend = useSelector(state => state.user.userExtend)
    const procState = {
        state: [
            'Выполняется добавление файлов...',
            'Файлы успешно добавлены',
            'Ошибка при добавлении файлов.'
        ],
        index: 0
    }

    return (
        <>
            <Card className='p-3 mt-3' >
                <h4 className='text-center'>Файлы</h4>
                <FileList files={userExtend.files} userId={userId} folder={'General'} />
                <Form className='border p-3 rounded-3 mt-4'>
                    <Form.Group controlId="Add files">
                        <Form.Label>Добавить файлы</Form.Label>
                        <Form.Control type="file" multiple className='mb-3' ref={inputFiles} />
                        <Button className='me-2' onClick={fileUploadHandler}>Добавить</Button>
                        <ProcState procState={procState} />
                    </Form.Group>
                </Form>
            </Card>
        </>
    );
};

export default UserFiles;