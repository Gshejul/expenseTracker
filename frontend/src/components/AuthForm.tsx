import {useState} from 'react'




interface AuthFormProps{
    isLogin:boolean;
    onSubmit:(username:string, password:string) => Promise<void>
}


const AuthForm: React.FC<AuthFormProps> = ({isLogin, onSubmit}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async(e: React.FormEvent)=>{
        e.preventDefault()
        await onSubmit(username, password);
    }

    return(
        <>
            <form onSubmit={handleSubmit}>
                <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder='username' required />
                <input value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='password' required/>

                <button type='submit'>{isLogin ? 'Login' : 'Register'}</button>
            </form>
        </>
    )
}



export default AuthForm;