import axios from "axios";
import React, { useRef,useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ResetEmail() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputsRef = useRef([]);

  const [isEmail, setIsEmail] = useState(false);
  const [isOTP, setIsOTP] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  const baseUrl=useSelector((state)=>state.app.baseURL);
  const navigate=useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
      if (index < 5) {
        inputsRef.current[index + 1].focus();
      }
    } else if (value === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleForgetPassword =async (e) => {
    e.preventDefault();
    
    // // API call to verify finalOtp
    if(!isEmail){
      try {
        const response=await axios.post(baseUrl+'/auth/send-reset-otp',{email},{withCredentials:true});
        console.log(response.data);
        if(response.data.success){
          //TODO add toast
          setIsEmail(true)
        }
        
      } catch (error) {
        console.log(error);
      }
    }
    else if(!isOTP){
      setIsOTP(true);
      // const finalOtp = otp.join("");
      // console.log("OTP entered:", finalOtp);
      // try {
      //   const response=await axios.post(baseUrl+'/auth/verify-account',{otp:finalOtp},{withCredentials:true});
      //   console.log(response.data);
      //   if(response.data.success){
      //     //TODO add toast
      //     setIsOTP(true)
      //   }
        
      // } catch (error) {
      //   console.log(error);
      // }
    }
    else if(!isPassword){
      const finalOtp = otp.join("");
      try {
        const response=await axios.post(baseUrl+'/auth/reset-password',{email:email,otp:finalOtp,newPassword:password},{withCredentials:true});
        console.log(response.data);
        if(response.data.success){
          //TODO add toast
          setIsPassword(true)
          setTimeout(()=>navigate('/login'),1000);
        }
        
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {/* Show Email Page */}
      {!isEmail && (
        <div className="min-h-screen flex items-center justify-around bg-white">
          <div>
            <img src="/public/email.png" width={600} alt="email" />
          </div>
          <form
            onSubmit={handleForgetPassword}
            className="bg-white shadow-[0_0_10px_2px_rgba(128,128,128,0.3)] rounded-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Enter Registered Email
            </h2>

            <div className="mb-10">
              <label
                htmlFor="email"
                className="block text-left text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,255)]"
                placeholder="Enter your email"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[rgb(108,99,255)] hover:bg-[rgb(86,79,204)] text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Send OTP
            </button>
          </form>
        </div>
      )}
      {/* Show OTP Page */}
      {isEmail && !isOTP && (
        <div className="min-h-screen flex items-center justify-around bg-white">
          <div>
            <img src="/public/otpsend.png" width={600} alt="" />
          </div>
          <form
            onSubmit={handleForgetPassword}
            className="bg-white shadow-[0_0_10px_2px_rgba(128,128,128,0.3)] rounded-xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Enter OTP
            </h2>

            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputsRef.current[index] = el)}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,255)]"
                  required
                />
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-[rgb(108,99,255)] hover:bg-[rgb(86,79,204)] text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}
      {/* Show Password Page */}
      {isEmail && isOTP && !isPassword && (
        <div className="min-h-screen flex items-center justify-around bg-white">
          <div>
            <img src="/public/newpassword.png" width={600} alt="password" />
          </div>
          <form
            onSubmit={handleForgetPassword}
            className="bg-white shadow-[0_0_10px_2px_rgba(128,128,128,0.3)] rounded-2xl p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Enter New Password
            </h2>

            <div className="mb-10">
              <label
                htmlFor="password"
                className="block text-left text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[rgb(108,99,255)]"
                placeholder="Enter your new password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[rgb(108,99,255)] hover:bg-[rgb(86,79,204)] text-white font-semibold py-2 rounded-lg transition duration-300"
            >
              Update Password
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default ResetEmail;
