"use client"
import { TailSpin } from 'react-loader-spinner'

const loading = () => {
    return (
        <div className='flex justify-center items-center h-[60vh]'>
            <TailSpin
                height="80"
                width="80"
                color="#FF5722"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
        </div>
    )
}

export default loading