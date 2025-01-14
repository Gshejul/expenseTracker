import React, { createContext, useContext, useState, useEffect, Children} from 'react';


interface AuthContextType {
  user:any;
  login:(token: string) =>void;
  logout:() => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider: React.FC<{children:React.ReactNode}> = ({children}) =>{

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){

      setUser({ token });
    }
  }, [])

  const login = (token : string) => {
    localStorage.setItem('token', token)
    setUser({token})
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  };

  return(
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  )

}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context){
    throw new Error('useAuth must be use in authprovider')
  }
  return context;
}