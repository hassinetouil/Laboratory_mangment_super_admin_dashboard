import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
    {
        id: 1,
        text: 'all users',
        path: 'all-users',
        icon: <MdQueryStats />,
    },
    {
        id: 2,
        text: 'add user',
        path: 'add-user',
        icon: <FaWpforms />,
    },
    {
        id: 3,
        text: 'profile',
        path: 'profile',
        icon: <ImProfile />,
    },
]

export default links