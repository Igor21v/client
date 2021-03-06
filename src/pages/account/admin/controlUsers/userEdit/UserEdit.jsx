import React, { useEffect, useState } from 'react';
import { Card, Form, FormGroup, Stack, InputGroup, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword, deleteUser, saveUserChanges } from '../../../../../actions/user';
import ProcState from '../../../../../components/procState/ProcState';

const UserEdit = () => {
    const router = useNavigate()
    const dispatch = useDispatch()
    const param = useParams()
    const userList = useSelector(state => state.user.userList)
    const user = (userList != '') && userList.find(user => user._id == param.id)
    const [form, setForm] = useState({
        name: user.name,
        surname: user.surname,
        phon: user.phon,
        password: ''
    })
    const update = e => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    const procStateEdit = {
        state: [
            'Выполняется сохраненеие изменений...',
            'Изменения сохранены',
            'Ошибка при сохранении изменений'
        ],
        index: 0
    }
    const procStateDelete = {
        state: [
            'Выполняется сохраненеие изменений...',
            'Пароль успешно изменен',
            'Ошибка при сохранении изменений'
        ],
        index: 1
    }
    const saveChanges = (e) => {
        e.preventDefault()
        console.log('сохранение изменений')
        dispatch(saveUserChanges(user._id, form))
    }
    const delUser = () => {
        console.log('llllllllllll')
        dispatch(deleteUser(user._id))
        router('/account/controlUser/')
    }
    const changePass = (e) => {
        e.preventDefault()
        dispatch(changePassword(user._id, form.password))
    }

    return (
        <>
            <Card className='p-3'>
                <h3 style={{ textAlign: 'center', marginBottom: '30px' }}> Редактирование данных пользователя </h3>
                <Form onSubmit={saveChanges}>
                    <Stack gap={'3'}>
                        <FormGroup controlId='name'>
                            <Form.Label> Имя ученика </Form.Label>
                            <Form.Control
                                type='text'
                                name='name'
                                onChange={update}
                                placeholder='Введите имя ученика'
                                value={form.name} />
                        </FormGroup>
                        <FormGroup controlId='surname'>
                            <Form.Label> Фамилия </Form.Label>
                            <Form.Control
                                type='text'
                                name='surname'
                                onChange={update}
                                placeholder='Введите имя ученика'
                                value={form.surname} />
                        </FormGroup>
                        <Form.Group controlId="fromBasicPhon" className="mb-2">
                            <Form.Label>Номер телефона</Form.Label>
                            <InputGroup>
                                <InputGroup.Text>+7</InputGroup.Text>
                                <Form.Control type="text" name='phon' placeholder='Введите номер телефона' value={form.phon} onChange={update} />
                            </InputGroup>
                        </Form.Group>
                        <div className='d-flex flex-row flex-wrap'>
                            <Button type="submit" className="btn-primary me-auto" >Сохранить изменения</Button>
                            <p onClick={delUser}
                                className='text-decoration-underline text-danger'
                                style={{ cursor: 'pointer' }}>
                                Удалить пользователя</p>

                        </div>
                        <ProcState procState={procStateEdit} />
                    </Stack>
                </Form>
            </Card>

            <Card className='p-4 mt-4'>
                <h3 style={{ textAlign: 'center', marginBottom: '20px' }}> Изменение пароля </h3>
                <Form onSubmit={changePass}>
                    <Form.Group controlId="fromBasicPassword" className="mb-2">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control type="password" name='password' placeholder='Введите новый пароль' value={form.password} onChange={update} />
                    </Form.Group>
                    <div className='d-flex-wrap align-items-center'>
                        <Button type='submit' className='me-3'> Сохранить пароль</Button>
                        <ProcState procState={procStateDelete} />
                    </div>
                </Form>
            </Card>
        </>
    );
};

export default UserEdit;