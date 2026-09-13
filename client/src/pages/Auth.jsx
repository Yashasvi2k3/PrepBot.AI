import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserData } from '../redux/userSlice'
import { TbRobotFace } from "react-icons/tb";
import { RiSparkling2Fill } from "react-icons/ri";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerURL } from '../App';


function Auth({isModel = false}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleGoogleAuth = async () => {
        setError(null)
        setLoading(true)

        try {
            const response = await signInWithPopup(auth, provider)
            const { displayName: name, email } = response.user

            const result = await axios.post(
                `${ServerURL}/api/auth/google`,
                { name, email },
                { withCredentials: true }
            )
            dispatch(setUserData(result.data))
            navigate("/")
        } catch (err) {
            console.error(err)
            dispatch(setUserData(null))
            const message =
                err.response?.data?.message ||
                err.message ||
                "Login failed. Check Firebase config and that the server is running."
            setError(message)
        } finally {
            setLoading(false)
        }
    }
  const card = (
        <motion.div 
            initial={{ opacity: 0, y: isModel ? -20 : -80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isModel ? 0.3 : 1.0, delay: isModel ? 0 : 0.2 }}
            className='w-full max-w-md p-8 bg-white rounded-3xl shadow-md border border-gray-200'
        >
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'> 
                    <TbRobotFace size={28} />

                </div>
                <h1 className='text-4xl font-bold text-gray-700'>PrepBot</h1>
            </div>
            <h1 className='text-1xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with
                <span className=' bg-green-100 text-green px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <RiSparkling2Fill size = {20}/>
                    AI Smart Interview
                    </span> 
            </h1>

            <p className='text-center text -sm md: text-base leading-relaxed text-gray-500 mb-8>'>
                Sign in to start your interview preparation journey with PrepBot and experience the power of AI-driven learning.
            </p>

            {error && (
                <p className='text-center text-sm text-red-500 mb-4'>{error}</p>
            )}

            <motion.button
                onClick={handleGoogleAuth}
                disabled={loading}
                whileHover={{ opacity: 0.5, scale: 1.05 }}
                whileTap={{ opacity: 1, scale: 0.98 }}
                className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md disabled:opacity-60'>
                <FaGoogle size={20} />
                {loading ? "Signing in..." : "Continue with Google"}
            </motion.button>
      
        </motion.div>
  )

  if (isModel) return card

  return (
    <div className='w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'>
      {card}
    </div>
  )
}

export default Auth
