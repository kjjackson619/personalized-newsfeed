import React, {useState} from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

   

    const handleSubmit = async(event) => {
        event.preventDefault();
        
        try {
            const response = await fetch ('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
                    
            });
            if (response.ok) {
                setIsLoggedIn(true);
                const responseData = await response.json();
                const token = responseData.token;

                localStorage.setItem('token', token);
                
                console.log('Login successful!');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

        } catch (error) {
            console.log('Login failed!:', error.message)
        }
    };

  return (
   <React.Fragment>
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
            {isLoggedIn && <p>You are logged in!</p>}
        </div>
        
   </React.Fragment>
  )
}

export default Login