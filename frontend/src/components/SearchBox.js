import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';


const SearchBox = () => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/search/${keyword}`)
        } else {
            navigate('/')
        }
    }

    return (
        <Form onSubmit={submitHandler} inline="true">
            <Form.Control
                type='text'
                autoComplete='off'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                placeholder='Search...'
                className='mr-sm-2 ml-sm-5'
                style={{ backgroundColor: 'transparent', width: '300px', color: 'white', margin: '4px' }}
            ></Form.Control>
        </Form>
    )
}

export default SearchBox
