import Image from 'next/image'
import './Progres.css'
export default function TestProgres () {
  return (
    <div className=' w-full text-white'>
        <progress value={50} max={100} placeholder='50%' className='rounded-3xl w-full'></progress>
    </div>
  )
}