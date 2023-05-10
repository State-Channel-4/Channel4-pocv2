import React, { useEffect, useState } from "react"
import {QRCodeSVG} from "qrcode.react"
import { RiCheckboxMultipleBlankLine } from "react-icons/ri"

const Account = () => {
    const [address, setAddress] = useState('qZw89134ads123aaodaBx') // localStorage.getItem('address')
    const [shownAddress, setShownAddress] = useState('')

    useEffect(() => {
        const prefix = address.replace(/(.{5})..+/, "$1…")
        const postfix = address.substring(address.length - 4, address.length)
        setShownAddress(prefix + postfix)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const handleClick = () => {
        console.log('click')
        const input = document.createElement('input');
        input.setAttribute('value', address);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    }
    return (
        <div className='text-white mx-6'>
            <h1 className='font-title font-semibold text-left'>My account</h1>
            <div className='h-0.5 bg-c4-gradient-separator'></div>
            <div className='bg-gray mt-6 py-6 px-3 h-full rounded-lg'>
                <Row>
                    <p className=''>Submitted URLs</p>
                    <p>99</p>
                </Row>
                <Row>
                    <p>Likes</p>
                    <p>23</p>
                </Row>
                <Row>
                    <p>Network</p>
                    <div className='flex flex-row items-center rounded-lg'>
                        <div className='w-2 h-2 bg-green-400 rounded-full mr-2'></div>
                        <p>Sepolia</p>
                    </div>
                </Row>
                <div className=" flex justify-center mb-4">
                    <QRCodeSVG value={address} size={180} level="H" className="bg-white rounded-lg w-fit p-4"/>
                </div>
                <button
                    onClick={handleClick}
                    className='flex items-center bg-light rounded-lg w-60 p-1 justify-center cursor-pointer drop-shadow-md m-auto'
                >
                    {shownAddress}
                    <RiCheckboxMultipleBlankLine size="25px" fill='#E4E4E4' className='ml-3'/>
                </button>
            </div>
        </div>
    )
}

type RowProps = {
    children: React.ReactNode
}

const Row = ({ children }: RowProps) => {
    return (
        <div className='flex justify-between pb-3 mb-10 border-b border-gray-light font-text font-light'>
            {children}
        </div>
    )
}

export default Account