import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();

        try {
            const response = await loginUser(username, password);

            const token = response.token;

            localStorage.setItem('token', token);

            console.log('Login successful! Token stored in localStorage.');
        } catch (error) {
            console.log('Login failed: ', error.message);
        }
    }

  return (
   <React.Fragment>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange}/>
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange} />
            </label>
            <br />
            <button type="submit">Login</button>  
        </form>
   </React.Fragment>
  )
}

export default Login