import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'

import React from 'react'

const Loader = () => {
    return (

        <FontAwesomeIcon icon={faCircleNotch} size='3x' className='fa-spin' />

    )
}

export default Loader
