'use client'
import React, { useRef, useState } from 'react';
import Logo from '../Logo';
import { Button } from '../ui/button';
import { UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, PlusCircle, FileText, Bookmark, HomeIcon } from 'lucide-react';
import { Squash as Hamburger } from "hamburger-react";
import { AnimatePresence, motion } from "framer-motion";
import { useClickAway } from "react-use";

const navItems=[
    {
        id:"about",
        title:"About Us"
    },
    {
        id:"features",
        title:"Features"
    },
    {
        id:"working",
        title:"How it Works"
    },
    {
        id:"testimonials",
        title:"Testimonials"
    }
]

const authNavItems = [
    {
        title: "Home",
        path: "/home",
        Icon: Home, 
    },
    {
        title: "Create Recipe",
        path: "/create",
        Icon: PlusCircle, 
    },
    {
        title: "My Recipes",
        path: "/user-recipes",
        Icon: FileText, 
    },
    {
        title: "Saved Recipes",
        path: "/saved-recipes",
        Icon: Bookmark,
    }
];



function Navbar({handleSmoothScroll,authNav}) {
    const [active,setActive]=useState(0);
    const {user}=useUser();

    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
    useClickAway(ref, () => setOpen(false));

    const pathName=usePathname();

    const handleNavItemClick=(e,id,index)=>{
        handleSmoothScroll(e, id);
        setActive(index);
    }


    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 relative  z-10">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Logo />
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        !user && <Link href={'/sign-in'}>
                            <Button 
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Get started
                            </Button>
                        </Link>
                    }
                     {
                        user && 
                        <div className='flex gap-2 items-center '>
                            <Link href={'/home'}>
                                <Button 
                                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center  }`}>
                                    <HomeIcon/>
                                    Home
                                </Button>
                            </Link>
                            <UserButton/>
                        </div>
                    }
                   
                    {
                        // Mobile side bar
                        authNav &&
                        <div
                            ref={ref}
                            className="mr-1 md:hidden text-gray-900 relative z-[1000000]"
                        >
                            <Hamburger
                                toggled={isOpen}
                                size={22}
                                toggle={setOpen}
                                color={isOpen ? "#333" : "#444"} 
                            />
                           
                            <AnimatePresence>
                                {isOpen && (
                                    <>
                                        {/* Backdrop to prevent clicks outside */}
                                        <motion.div
                                            className="fixed inset-0 bg-gray-500 opacity-50 z-40"
                                            onClick={() => setOpen(false)}
                                        />

                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-white shadow-lg rounded-r-xl p-6 pt-8 border-r border-gray-300"
                                        >
                                            <ul className="space-y-6">
                                                {authNavItems.map((route, idx) => {
                                                    const { Icon } = route;

                                                    return (
                                                        <motion.li
                                                            initial={{ scale: 0, opacity: 0 }}
                                                            animate={{ scale: 1, opacity: 1 }}
                                                            transition={{
                                                                type: "spring",
                                                                stiffness: 260,
                                                                damping: 20,
                                                                delay: 0.1 + idx / 10,
                                                            }}
                                                            key={route.title}
                                                            className="w-full"
                                                        >
                                                            <Link
                                                                onClick={() => setOpen((prev) => !prev)}
                                                                className="flex items-center justify-between w-full p-4 rounded-lg bg-gradient-to-br from-blue-100 via-teal-100 to-pink-100 hover:from-blue-200 hover:to-pink-200 text-gray-800 hover:text-white transition-all duration-300"
                                                                href={route.path}
                                                            >
                                                                <span className="flex gap-3 text-lg font-semibold">{route.title}</span>
                                                                <Icon className="text-xl text-gray-700" />
                                                            </Link>
                                                        </motion.li>
                                                    );
                                                })}
                                            </ul>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>

                    }  
                </div>

                <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                    <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        {
                            !authNav && navItems.map((item,index)=>(
                                <li key={index}>
                                    <Link 
                                        href={`#${item.id}`}
                                        className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${active==index?"text-blue-700":"text-gray-900 "}`}
                                        aria-current="page"
                                        onClick={(e) => handleNavItemClick(e, `#${item.id}`,index)}    
                                    >   
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }

                        {
                            authNav && authNavItems.map((item,index)=>(
                                <li key={index}>
                                    <Link 
                                        href={`${item.path}`}
                                        className={`block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${pathName.includes(item.path)?"text-blue-700":"text-gray-900 "}`}
                                        aria-current="page"    
                                    >   
                                        {item.title}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
