import { useState, useEffect } from 'react';
import { signInGoogle, callFunction, getIdToken } from './firebaseUtils';
import { useCookies } from 'react-cookie';

export const useAuth = () => {
  const [ cookies, setCookie, removeCookie ] = useCookies(['idToken']);
  const [ status, setStatus ] = useState('idle');
  const [ user, setUser ] = useState();
  const [ error, setError ] = useState();

  useEffect(() => {
    if (status === "idle") {
      setStatus("signing");
      const { idToken } = cookies;
      if (idToken) {
        callFunction("verifyAdmin", { idToken }).then((result) => {
          const { hasAuthority, name, email, picture: photo } = result;
          if (hasAuthority) {
            setUser({ name, email, photo });
            setStatus('authenticated');
          } else {
            removeCookie("idToken");
            setStatus('unauthorized');
          }
        }).catch((error) => {
          console.log(error);
          setStatus('unauthorized');
        });
      } else {
        setStatus('unauthorized');
      }
    }
  }, [status, cookies, removeCookie])

  const signIn = () => {
    if (status === 'unauthorized') {
      setStatus('signing');
      signInGoogle().then((result) => {
        const { displayName: name, email, photoURL: photo } = result.user;
        
        callFunction("verifyAdmin", { email }).then(res => {
          if (res.hasAuthority) {
            getIdToken().then(idToken => {
              setCookie('idToken', idToken);
              setUser({ name, email, photo });
              setStatus('authenticated');
            })
          } else {
            setError(`account ${email} don't have authority`);
            setStatus('unauthorized');
          }
        }).catch(error => {
          console.log(error);
          setError(error.message);
          setStatus('unauthorized');
        });
      }).catch(error => {
        console.log(error);
        setError(error.message);
        setStatus('unauthorized');
      });
    }
  }

  return { 
    isAuthenticated: status === 'authenticated',
    isSigning: status === 'signing',
    signIn, 
    error, 
    user 
  };
}