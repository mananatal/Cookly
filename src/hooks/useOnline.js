'use client'
import React, { useEffect, useState } from 'react'

function useOnline() {
    const [isOnline,setIsOnline]=useState(true);

    useEffect(()=>{

        const setOnline=()=>{
            setIsOnline(true);
        }

        const setOffline=()=>{
            setIsOnline(false);
        }

        window.addEventListener("online",setOnline);        
        window.addEventListener("offline",setOffline);

        ()=>{
            window.removeEventListener("online",setOnline);
            window.removeEventListener("offline",setOffline);
        }
    },[isOnline]);


  return {isOnline};
}

export default useOnline