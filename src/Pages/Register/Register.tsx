import { RegisterPhoto } from '@/Assets/Images'
import { AuthComponent, ConfirmPassInput, EmailInput, PasswordInput } from '@/Components'
import { ToastContext } from '@/Context/ToastContext'
import { IFormValues } from '@/Interfaces'
import baseUrl from '@/utils/Custom/Custom'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, } from 'react-router-dom'
import './Register.module.scss'

const Register = () => {
  const required = "This Field is required"
  const navigate = useNavigate()

  const toast = useContext(ToastContext)

  const { register, handleSubmit, formState: { errors }, getValues } = useForm<IFormValues>()
  const [Loading, setLoading] = useState(false)

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const catchSelectedImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];

    if (file)
      setSelectedImage(URL.createObjectURL(file));
  }

  const submitLogin = (data: IFormValues) => {
    console.log(data);

    setLoading(true)
      // @ts-ignore
    return baseUrl.post(`/api/v1/Users/Register`, {...data,  recipeImage: data.profileImage[0]}, )
      .then(() => {
        if (toast)
          toast.getToastValue("success", "Registration completed successfully")
        setLoading(false)
        navigate('/verify')
      })
      .catch((err) => {
        if (toast)
          toast.getToastValue("error", err.response.data.message)
        setLoading(false)
      })
  }



  return <>
    <AuthComponent title={"Create New Account"}>
      <form onSubmit={handleSubmit(submitLogin)}>
        <div className='d-flex justify-content-center'>
          <label id="imageCircle" htmlFor="imageInput">

            <img  className='rounded-circle' src={selectedImage?selectedImage: RegisterPhoto} alt="Preview Image" width={80} height={80} />
            <input className="form-lable" {...register("profileImage", {
      })}  type="file" id="imageInput" onChange={catchSelectedImage}  placeholder="add Image" />
          </label>


        </div>
        <div className="row align-items-center mt-3">
          <div className="col-md-6 ">

            <div className='input-con '>
              <div className=' d-flex flex-column  '>
                <label className="orange">User Name</label>
                <input
                  className=' form-control w-100'
                  type="text"
                  placeholder='Enter your name'

                  {...register("userName", {
                    required,
                    pattern: {
                      value: /^[a-zA-Z]+[0-9]+$/,
                      message: "Name must have char & end with numbers without spaces"
                    }
                  })}
                />
              </div>

            </div>
            {errors?.userName ? <span className='text-danger small my-2'>{errors?.userName?.message}</span> : null}


            <div className='input-con '>
              <div className=' d-flex flex-column  '>
                <label className="orange mt-3">Country</label>
                <input
                  className=' form-control w-100'
                  type="text"
                  placeholder='Enter your Country'

                  {...register("country", {
                    required,
                  })}
                />
              </div>
            </div>
            {errors?.country ? <span className='text-danger small my-2'>{errors?.country?.message}</span> : null}

            <PasswordInput inputName='password' placeholder='Enter your password' {...{ errors, register }} />

          </div>

          <div className="col-md-6 ">

            <EmailInput inputName='email' {...{ errors, register }} />

            <div className='input-con '>
              <div className=' d-flex flex-column  '>
                <label className="orange mt-3">Phone Number</label>
                <input
                  className=' form-control w-100'
                  type="tel"
                  placeholder='Enter your phone number'

                  {...register("phoneNumber", {
                    required,
                    validate: value => (value !== undefined && +value > 0) || "Please enter a positive number"
                  })}
                />
              </div>
            </div>
            {errors?.phoneNumber ? <span className='text-danger small my-2'>{errors?.phoneNumber?.message}</span> : null}


            <ConfirmPassInput inputName={'confirmPassword'} placeholder='Confirm New Password' {...{ errors, register, getValues }} />
          </div>
        </div>



        <div className='text-center'>
          <button type='submit' disabled={Loading} className='btn w-50  mt-4 fw-bold text-white bg-orange rounded-5 btn-lg '>{Loading ? <i className='fa fa-spin fa-spinner'></i> : "registration"}</button>
        </div>

      </form>
    </AuthComponent>
  </>
}

export default Register