import React, {useState} from 'react';

const Signup = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            if (response.ok) {
                console.log('Sign up successful!');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
        } catch (error) {
            console.error('Sign-up failed:', error.message);
        }
    };

  return (
   <React.Fragment>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" value={username} onChange={handleUsernameChange}/>
            </label>
            <br />
            <label>
                Password:
                <input type="password" value={password} onChange={handlePasswordChange}/>
            </label>
            <br />
            <button type="submit">Sign Up</button>
        </form>
   </React.Fragment>
  )
}

export default Signup