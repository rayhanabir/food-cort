import './App.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,sendEmailVerification, sendPasswordResetEmail, updateProfile   } from "firebase/auth";
import initializeAuthentication from './firebase/firebase.init';
import { useState } from 'react';
initializeAuthentication();

const googleProvider = new GoogleAuthProvider();


function App() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

  const auth = getAuth();
  const handleGoogleSignIn= () =>{
      signInWithPopup(auth, googleProvider)
      .then(result=>{
        const user = result.user;
        console.log(user)
      })
      .catch(err=>{
        console.log(err.message);
      })

  }

  //handle registration
  const handleRegistration = e =>{
    e.preventDefault();
    console.log(email, password);
    if(password.length < 6){
      setError('password should be 6 charecter long');
      return;
    }
    isLogin? processLogin(email, password): registerNewUser(email, password);
  }

  const registerNewUser = (email, password) =>{
    createUserWithEmailAndPassword(auth, email, password)
    .then(result=>{
      const user = result.user;
      verifyEmail();
      setUserName()
      console.log(user);
      setError('');
    })
    .catch(err=>{
      console.log(err);
    })
  };

  const processLogin =(email, password) =>{
    signInWithEmailAndPassword(auth, email, password)
    .then(result=>{
      const user = result.user;
      console.log(user);
      setError('');
    })
    .catch(err=>{
      setError(err.message);
    })
  }

  //verify email

  const verifyEmail = () =>{
    sendEmailVerification(auth.currentUser)
    .then(result=>{
      console.log(result);
    })
  }
  //set user name :

  const setUserName =()=>{
    updateProfile(auth.currentUser, {displayName:name})
    .then(result=>{
      
    })
  }

  //reset email :

  const handleResetPassword =()=>{
    sendPasswordResetEmail(auth, email)
    .then(result=>{
        console.log(result);
    })
    .catch(err=>{
      console.log(err.message);
    })
  }

  //update name : 
  const handleNameChange =(e) =>{
    setName(e.target.value);
  }

  //handle email:

  const handleEmail=(e)=>{
     setEmail(e.target.value);
     
  }

  //handle password 
  const handlePassword= e =>{
    setPassword(e.target.value);
    
  }

  //toggle chekbox

  const toggleChekbox = e =>{
    setIsLogin(e.target.checked);
  }

  return (
    <div className="App">

      <div className="mt-4">
        <form onSubmit={handleRegistration}>
          <h3 className="text-primary">Please {isLogin? "Login" : 'Register'}</h3>
            {!isLogin && <div>
             <label htmlFor="name">name : </label> 
            <input type="text" onBlur={handleNameChange} placeholder="enter your name"/>
            </div>}
            <br />
            <label htmlFor="">Email : </label>
            <input className="my-3" onBlur={handleEmail} type="email" name="email" id="" required />
            <br />
            <label htmlFor="pass">Password : </label>
            <input onBlur={handlePassword} type="password" name="password" id="pass" required/>
            <br />
            <input onChange={toggleChekbox} type="checkbox" name="sign in " id="signIn" />
            <label htmlFor="signIn"> Already Registerd?</label>
            
            <p className="text-danger">{error}</p>
            <button className="btn btn-danger">{ isLogin? "Login" : "Register"}</button>
            <button onClick={handleResetPassword} className="btn btn-primary mx-2">Reset password</button>
        </form>
      </div>




    <p>---------------------</p>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
