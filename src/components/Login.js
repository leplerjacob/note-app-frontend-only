import React from 'react'

const Login = (props) => {

    const [handleLogin] = props


        return (
            <div>
                <h2>
                    Login
                </h2>
                <form onSubmit={handleLogin}>
                    <div>
                        username 
                        {/* <input type='text' value={username} /> */}
                    </div>
                </form>
            </div>
        )
}

export default Login
