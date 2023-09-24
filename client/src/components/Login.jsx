import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const loginUser = async(username, password) => {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username, password})
        };
        try {
            const response = await fetch('api/login', requestOptions);
            if(!response.ok) {
                throw new Error('Network response was not ok.');
            }
            const userDataResponse = await response.json();
            setUserData(userDataResponse);
        } catch (error) {
            throw new Error('Login failed');
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        try {
            const response = await loginUser(username, password);

            localStorage.setItem('token', response.token);

            setIsLoggedIn(true);

            console.log('Login successful! Token stored in localStorage.');
        } catch (error) {
            console.error('Login failed', error.message);
        }
    };

  return (
   <React.Fragment>
    <div>
        {isLoggedIn ? (
            <div>
                <h2>User Data</h2>
                {userData ? (
                    <div>
                        <p>Name: {userData.name}</p>
                        <p>Email: {userData.email}</p>
                    </div>
                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        ) : (
            <div>
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
            </div>
        )}
    </div> 
        
   </React.Fragment>
  )
}

export default Login