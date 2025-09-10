"use client"
import React, { useEffect, useState } from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Image from 'next/image';

const CommunityPage = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [detailsModal, setDetailsModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null);
    const [loading, setLoading] = useState({
        posts: false,
        removeBg: false
    });
    const [noBgImage, setNoBgImage] = useState(null);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(prev => ({ ...prev, posts: true }))
                const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080"
                console.log('Fetching posts from:', `${baseUrl}/api/posts`)
                const response = await fetch(`${baseUrl}/api/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                console.log('Response status:', response.status)
                if (response.ok) {
                    const result = await response.json();
                    console.log('Posts fetched:', result.data?.length || 0)
                    setAllPosts(result.data?.reverse() || []);
                } else {
                    console.error('Failed to fetch posts:', response.status, response.statusText)
                }
            } catch (error) {
                console.error('Error fetching posts:', error)
            } finally {
                setLoading(prev => ({ ...prev, posts: false }))
            }
        }
        fetchPosts();
    }, [])

    const handleDownload = async (url) => {
        try {
            const res = await fetch(url, { mode: 'cors' });
            const blob = await res.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "ai-generated.png";
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (err) {
            console.error("Download failed:", err);
        }
    };
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => alert("✅ Prompt copied to clipboard!"))
            .catch(() => alert("❌ Failed to copy"));
    };

    const handleRemoveBg = async (photo) => {
        try {
            setLoading(prev => ({ ...prev, removeBg: true }));
            const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8080";
            const res = await fetch(`${baseUrl}/api/remove-bg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ imageUrl: photo }),
            });

            if (res.ok) {
                const data = await res.json();
                setNoBgImage(data.noBgImage);
                console.log(data.noBgImage);

            } else {
                console.error("Failed to remove background");
            }
        } catch (err) {
            console.error("Remove BG error:", err);
        } finally {
            setLoading(prev => ({ ...prev, removeBg: false }));
        }
    };


    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-20 p-5 '>
            <h1 className='text-white text-4xl font-bold p-6'>Explore what other users are creating</h1>
            {loading.posts ? (
                <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='absolute top-[50%] left-[50%] w-10 h-10 translate-x-[-50%] translate-y-[-50%] invert-100 ' ><rect x="1" y="6" width="2.8" height="12"><animate id="spinner_CcmT" begin="0;spinner_IzZB.end-0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="0;spinner_IzZB.end-0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="5.8" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="10.6" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.2s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.2s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="15.4" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.3s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.3s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="20.2" y="6" width="2.8" height="12"><animate id="spinner_IzZB" begin="spinner_CcmT.begin+0.4s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.4s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect></svg>
            ) : (
                <div className="columns-2 md:columns-3 lg:columns-4 gap-5 mb-5">
                    {allPosts.map((post) => (
                        <div
                            key={post._id}
                            className="group relative mb-5 rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-300 bg-black p-1 "
                            onClick={() => {
                                setSelectedPost(post);
                                setDetailsModal(true);
                            }}
                        >

                            <img
                                src={post.photo}
                                alt={post.prompt}
                                className="w-full object-cover rounded-xl cursor-pointer"
                            />
                            <div className='absolute bottom-0 left-0 right-0 bg-black/60 w-full p-2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto'>
                                <h2>
                                    <span className='font-bold'>Prompt: </span>{post.prompt.length > 26 ? post.prompt.slice(0, 26) + "..." : post.prompt}
                                </h2>
                                <span className="relative inline-block group/icon">
                                    <DotLottieReact
                                        src="https://lottie.host/5df5cdca-7710-48ec-b8aa-bf6151bb52bf/9DQ3jca5MA.lottie"
                                        loop
                                        autoplay
                                        className="w-10 h-10 cursor-pointer"
                                        onClick={() => copyToClipboard(post.prompt)}
                                    />
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover/icon:opacity-100 transition-opacity duration-200 pointer-events-none">
                                        Copy Prompt
                                    </span>
                                </span>
                                <p className='pb-2'>By {post.name}</p>
                                <button className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-1 px-5 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer" onClick={() => handleDownload(post.photo)}>Download</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}


            {detailsModal && selectedPost && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-75 flex items-center justify-center z-50"
                    onClick={() => setDetailsModal(false)}>
                    <div className="bg-white/20 backdrop-blur-md rounded-lg p-6 max-w-3xl overflow-y-auto max-h-[95vh] my-20 max-h-md w-[80%] sm:w-full relative"
                        onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-2xl font-semibold mb-4">Post Details</h2>
                        <div className='overflow-y-auto flex flex-col max-h-md '>
                            <div className="relative flex flex-col md:flex-row items-center gap-5">
                                {loading.removeBg && (
                                    <>
                                        <img src={selectedPost.photo} alt="SelectedImage" className="w-full md:w-[50%] rounded-lg mb-4" />
                                        <svg fill="hsl(228, 97%, 42%)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className='absolute top-[50%] left-[25%] w-10 h-10 translate-x-[-50%] translate-y-[-50%]' ><rect x="1" y="6" width="2.8" height="12"><animate id="spinner_CcmT" begin="0;spinner_IzZB.end-0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="0;spinner_IzZB.end-0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="5.8" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.1s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.1s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="10.6" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.2s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.2s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="15.4" y="6" width="2.8" height="12"><animate begin="spinner_CcmT.begin+0.3s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.3s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect><rect x="20.2" y="6" width="2.8" height="12"><animate id="spinner_IzZB" begin="spinner_CcmT.begin+0.4s" attributeName="y" calcMode="spline" dur="0.6s" values="6;1;6" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /><animate begin="spinner_CcmT.begin+0.4s" attributeName="height" calcMode="spline" dur="0.6s" values="12;22;12" keySplines=".36,.61,.3,.98;.36,.61,.3,.98" /></rect></svg>
                                    </>
                                )}
                                {!loading.removeBg && noBgImage && (
                                    <img src={noBgImage} alt="No Background Image" className="relative w-full md:w-[50%] rounded-lg mb-4" />
                                )}
                                {!loading.removeBg && !noBgImage && (
                                    <>
                                        <img src={selectedPost.photo} alt="SelectedImage" className="w-[80%] sm:w-[50%] rounded-lg" />
                                        <button onClick={() => handleRemoveBg(selectedPost.photo)} className='absolute hidden md:block md:bottom-0 md:left-[25%] transform -translate-x-1/2 bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition hover:scale-105 cursor-pointer'>Remove Background</button>
                                    </>
                                )}
                                <div className='text-black w-full max-h-40 md:max-h-full mb-4 bg-white/30 p-4 rounded-lg gap-5 overflow-y-auto'>
                                    <h1 className='text-xl'>Prompt:</h1>
                                    <p>{selectedPost.prompt}</p>
                                </div>


                            </div>
                            <div className='flex flex-col md:flex-row md:justify-between p-5 rounded md:items-center bg-white/30 gap-5 '>
                                <p className="text-black text-sm">Generated By <span className="font-medium">{selectedPost.name}</span> through OpenAI</p>
                                {noBgImage ? (
                                    <button onClick={() => handleDownload(noBgImage)} className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer'>Download</button>
                                ) : (
                                    <div className='flex flex-col gap-3'>
                                        <button onClick={() => handleRemoveBg(selectedPost.photo)} className='md:hidden block  bg-gradient-to-r from-red-400 to-red-600 hover:from-red-500 hover:to-red-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition hover:scale-105 cursor-pointer'>Remove Background</button>
                                        <button onClick={() => handleDownload(selectedPost.photo)} className='bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-5 rounded-lg font-medium shadow-md transition transform hover:scale-105 cursor-pointer'>Download</button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <button
                            onClick={() => setDetailsModal(false)}
                            className="absolute top-2 right-2 text-gray-900 hover:text-red-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default CommunityPage