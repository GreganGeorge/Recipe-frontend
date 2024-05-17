
import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [email, setemail] = useState('');
    const [otp, setOtp] = useState(generateOTP());
    function generateOTP() {
        const digits = '0123456789';
        let OTP = '';
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }
        return OTP;
    }
    return (
        <LoginContext.Provider value={{ email, setemail,otp }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;
