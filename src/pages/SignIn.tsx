import { useForm } from 'react-hook-form'
import * as apiClient from '../api-client'
import { useMutation, useQueryClient } from 'react-query';
import { useAppContext } from '../contexts/AppContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

export type SignInFormData = {

    email : string;
    password : string

}


const SignIn = () => {

    const {register, formState : {errors}, handleSubmit} = useForm<SignInFormData>()

    const {showToast} = useAppContext()

    const location = useLocation()

    const navigate = useNavigate()

    const queryClient = useQueryClient()

    const mutation = useMutation(apiClient.signIn, {

        onSuccess: async() => {

            showToast({
                message : 'Sign in successful',
                type: 'SUCCESS'
            })

            await queryClient.invalidateQueries('validateToken')

            navigate(location.state?.from?.pathname  ||  '/')

        },
        onError : (error : Error) => {

            showToast({
                message : error.message,
                type: 'ERROR'
            })

        }
   })



   const onSubmit = handleSubmit((data) => {

      mutation.mutate(data)

   })


  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
        <label className="text-gray-700 text-sm font-bold flex-1" htmlFor='email'>Email
                  <input type="email" className="border border-blue-800  rounded w-full py-1 px-2 font-normal" {...register("email", {required : "This field is required"})}/>
                  {errors.email && <span className="text-red-500">{errors.email.message}</span>}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1" htmlFor='password'>Password
                  <input type="password" className="border border-blue-800  rounded w-full py-1 px-2 font-normal" {...register("password", {required : "This field is required"})}/>
                  {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        </label>
        <span className='flex items-center justify-between'>
            <span className='text-sm'>Not Registered? <Link to='/register' className='underline'>Create an account here</Link></span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                Login
            </button>
        </span>

    </form>
  )
}

export default SignIn