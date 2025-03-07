'use client'
import React, { useEffect, useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from '../ui/button';
import { useUser } from '@clerk/nextjs';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { getIngredientFromImagePrompt } from '@/helper/prompts';

function UploadImage({ children, ingredients, setIngredients }) {
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState(null);
    const [imageString, setImageString] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { user } = useUser();
    const { toast } = useToast();

    const readFileAsBase64 = (dataUrl) => {
        return dataUrl.split(',')[1]
    }

    const handleFileUpload = (filee) => {
        setFile(filee);
    };

    const handleImageUpload = () => {
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setImageString(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        handleImageUpload();
    }, [file])

    const onDialogClose = () => {
        setFile(null);
        // setError("");
        setImageString("");
    }

    useEffect(() => {
        onDialogClose();
    }, [open])

    const getImageIngredients = async () => {
        if (!file || !user || !imageString) {
            toast({
                variant: "destructive",
                title: "Missing required information for verification."
            })
            return
        }

        try {
            setLoading(true);
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

            const base64Data = readFileAsBase64(imageString);

            const imageParts = [
                {
                    inlineData: {
                        data: base64Data,
                        mimeType: file.type, // Adjust this if you know the exact type
                    },
                },
            ]

            const prompt = getIngredientFromImagePrompt();
            const result = await model.generateContent([prompt, ...imageParts]);
            const response = await result.response;
            const text = response.text().replace('```json', '').replace('```', '');

            try {
                const parsedResult = JSON.parse(text);

                if (parsedResult.isValid) {
                    setIngredients((prev) => [...prev, ...parsedResult.imageIngredients]);
                    setError("");
                    setOpen(false);
                    toast({
                        variant: "success",
                        title: "Ingredients fetched Successfully"
                    })
                }
                else {
                    setError(parsedResult.message);
                }

            } catch (error) {
                console.log(error);
                console.error('Failed to parse JSON response:', text)
            }

        } catch (error) {
            console.log("OOPS! Error while generating ingredients from image", error);
            toast({
                variant: "destructive",
                title: "OOPS! Something went Wrong"
            })
        }
        finally {
            setLoading(false);
            setImageString("");
        }

    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-base sm:text-lg md:text-xl">Upload Image</DialogTitle>
                    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
                        <FileUpload onChange={handleFileUpload} />
                    </div>
                    <div className="mt-6 flex flex-col items-end">
                        <Button onClick={getImageIngredients} className="w-fit flex items-center justify-center" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin mr-1" /> Getting Ingredients
                                </>
                            ) : (
                                "Get Ingredients"
                            )}
                        </Button>
                        {error && (
                            <p className="text-red-500 mt-2 text-sm text-left break-words max-w-full">
                                {error}
                            </p>
                        )}
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>


    )
}

export default UploadImage