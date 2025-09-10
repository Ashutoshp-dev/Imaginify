"use client"
import React, { useState } from 'react'
import { getRandomPrompt } from '../constants/index.js'
import Image from 'next/image.js'

const CreatePost = () => {
    const [form, setForm] = useState({
        name: "",
        prompt: "",
        photo: "",
        size: "1024x1024"
    })
    const [loading, setLoading] = useState(false)
    const [generatingImage, setGeneratingImage] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSurpriseMe = () => {
        const randomPrompt = getRandomPrompt(form.prompt)
        setForm({
            ...form,
            prompt: randomPrompt
        })
    }
    const generateImage = async () => {
        if (form.prompt) {
            try {
                setLoading(true)
                setGeneratingImage(true)
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
                const response = await fetch(`${baseUrl}/api/dalle`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        prompt: form.prompt,
                        size: form.size || "1024x1024"
                    }),
                })
                const data = await response.json();
                if (response.ok) {
                    if (data.photo) {
                        setForm({
                            ...form,
                            photo: data.photo,
                        });
                    } else {
                        throw new Error('No image data received');
                    }
                } else {
                    console.error("Server error:", data.error);
                    alert("Failed to generate image: " + data.error);
                }
            } catch (err) {
                console.error('Error generating image:', err);
            } finally {
                setGeneratingImage(false)
                setLoading(false)
            }
        } else {
            alert('Please enter a prompt')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (form.prompt && form.photo) {
            try {
                setSubmitting(true)
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080'
                const response = await fetch(`${baseUrl}/api/posts`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                })
                if (response.ok) {
                    await response.json();
                    alert("✅ Shared successfully with community!");
                } else {
                    alert("❌ Failed to share. Try again!");
                }
            } catch (error) {
                alert(error)
            } finally {
                setSubmitting(false)
            }
        } else {
            alert("Please generate an image first before sharing!");
        }
    }

    return (
        <div className='flex flex-col md:flex-row items-center justify-center gap-5 h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-5'>
            <form className="flex flex-col justify-center bg-white/20 backdrop-blur-md mt-30 md:mt-20 text-white md:min-w-[50%] md:max-w-[80%] max-h-[95%] w-full p-6 text-left text-sm rounded-lg border border-white/20 shadow-xl overflow-y-auto ">
                <label className="font-medium mt-5" htmlFor="email">Your Name</label>
                <input id="name" name='name' value={form.name} onChange={handleChange} className="w-full border border-white/30 bg-white/10 placeholder-gray-300 text-white outline-none rounded py-2 px-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition mb-4" type="text" placeholder="Enter Name" required />
                <label className="font-medium" htmlFor="content">Prompt</label>
                <textarea rows="3" name='prompt' value={form.prompt} onChange={handleChange} id="content" className="w-full min-h-[3rem] border border-white/30 bg-white/10 placeholder-gray-300 text-white outline-none rounded py-2 px-3 focus:ring-2 focus:ring-purple-400 focus:border-transparent transition" type="text" placeholder="Enter prompt" required></textarea>
                <div className='p-2'>
                    <button type='button' className='self-start px-3 rounded-full cursor-pointer bg-purple-500 hover:bg-purple-600/90 text-white font-medium transition' onClick={handleSurpriseMe}>Try Prompts</button>
                </div>
                <div className='flex flex-col md:flex-row items-start justify-between'>
                    <div className='flex flex-col justify-start mb-4 gap-2'>
                        <h1 className='font-medium'>Orientation</h1>
                        <div className='flex space-x-2'>
                            <button className={`cursor-pointer border rounded w-10 h-10 flex items-center justify-center
                                ${form.size === '1024x1536'
                                    ? 'bg-purple-500 border-purple-400'
                                    : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'}`} type='button'
                                onClick={() => setForm({
                                    ...form,
                                    size: form.size === "1024x1536" ? "1024x1024" : "1024x1536"
                                })} title="Portrait (1024x1536)">
                                <svg viewBox="0 0 24 24" fillRule="none" xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M6 4C6 3.44772 6.44772 3 7 3H17C17.5523 3 18 3.44772 18 4V18C18 18.5523 17.5523 19 17 19H7C6.44772 19 6 18.5523 6 18V4ZM7 1C5.34315 1 4 2.34315 4 4V20C4 21.6569 5.34315 23 7 23H17C18.6569 23 20 21.6569 20 20V4C20 2.34315 18.6569 1 17 1H7ZM12 22C12.5523 22 13 21.5523 13 21C13 20.4477 12.5523 20 12 20C11.4477 20 11 20.4477 11 21C11 21.5523 11.4477 22 12 22Z" fill="#000000"></path> </g></svg>
                            </button>
                            <button className={`cursor-pointer border rounded w-10 h-10 flex items-center justify-center
                                ${form.size === '1536x1024'
                                    ? 'bg-purple-500 border-purple-400'
                                    : 'border-white/30 bg-white/10 hover:bg-white/20 text-white'}`} type='button'
                                onClick={() => setForm({
                                    ...form,
                                    size: form.size === "1536x1024" ? "1024x1024" : "1536x1024"
                                })} title="Landscape (1536x1024)">
                                <svg viewBox="0 0 24 24" fillRule="none" xmlns="http://www.w3.org/2000/svg" className='w-10 h-10' ><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fillRule="evenodd" clipRule="evenodd" d="M4 4C2.34315 4 1 5.34315 1 7V17C1 18.6569 2.34315 20 4 20H20C21.6569 20 23 18.6569 23 17V7C23 5.34315 21.6569 4 20 4H4ZM3 7C3 6.44772 3.44772 6 4 6H18C18.5523 6 19 6.44772 19 7V17C19 17.5523 18.5523 18 18 18H4C3.44772 18 3 17.5523 3 17V7ZM21 13C21.5523 13 22 12.5523 22 12C22 11.4477 21.5523 11 21 11C20.4477 11 20 11.4477 20 12C20 12.5523 20.4477 13 21 13Z" fill="#000000"></path> </g></svg>
                            </button>
                        </div>
                        <div className='text-sm self-center text-white/70'>
                            <span>Note: Orientation is optional and by default will be set to &quot;Square (1024x1024)&quot;</span>
                        </div>
                    </div>
                    <div className='p-1 bg-black relative mb-4'>
                        {form.photo ? (
                            <img
                                src={form.photo}
                                alt="GeneratedImage"
                                className={
                                    form.size === "1024x1536"
                                        ? "object-contain max-h-[15rem] max-w-[10rem]"  // Portrait ratio
                                        : form.size === "1536x1024"
                                            ? "object-contain max-h-[10rem] max-w-[15rem]"  // Landscape ratio
                                            : "object-contain max-h-[12rem] max-w-[12rem]"  // Square
                                }
                            />
                        ) : loading ? (
                            <video src="/generateLoader.mp4" className='w-[10rem] h-[10rem]' loop autoPlay muted ></video>
                        ) : (
                            <Image src="/preview.jpg" alt="ImagePreview" width={150} height={150} />
                        )
                        }

                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-start justify-between gap-2">
                    <button type="button" disabled={generatingImage} className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer " onClick={() => generateImage()} >
                        {generatingImage ? "Generating..." : "Generate"}
                    </button>
                    <button type="button" disabled={submitting} className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer " onClick={(e) => handleSubmit(e)} >
                        {submitting ? "Sharing..." : "Share with Community"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CreatePost