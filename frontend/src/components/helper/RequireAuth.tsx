import { Navigate } from 'react-router-dom'

type Props = {
    children: JSX.Element
}

const RequireAuth = ({ children }: Props) => {
    const authenticated = !! localStorage.getItem("user_id")
    return (
        <>
        {authenticated ?
            children
        :
            <Navigate to="/" replace />
        }
        </>
    )
}

export default RequireAuth