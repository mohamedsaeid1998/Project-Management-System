import { IInputsProps } from "@/Interfaces"
import './EmailInput.module.scss'


const EmailInput = ({ register, errors , inputName  }: IInputsProps) => {

const pattern= {
  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
  message: "Email is InValid",
}
const required= "This Field is required"


  return <>
<div className='input-con '>

<div className=' d-flex flex-column  '>
  <label className="orange">E-mail</label>
  <input
    className={` form-control-Auth   w-100`}
    type="email"
    placeholder='Enter your E-mail'
    {...register(`${inputName}`, {
      required,
      pattern,
    })}
  />


</div>
{errors?.email ? <span className='text-danger small'>{errors?.email?.message}</span> : null}
</div>


  </>
}

export default EmailInput