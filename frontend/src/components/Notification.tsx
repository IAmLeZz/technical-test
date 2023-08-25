"use client"

import { useSearchParams } from 'next/navigation';
import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Notification() {
    const searchParams = useSearchParams();
    const backendResponse = searchParams.get('response');

    const failedToStore = () => toast.error("Data failed to be stored.", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const succesfulStore = () => toast.success("Data stored successfully / Datos almacenados correctamente", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const alreadyStored = () => toast.success("Data already stored / Los datos ya fueron almacenados", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    switch (backendResponse) {
        case 'success_store': {
            succesfulStore();
            break;
        }
        case 'failed_store': {
            failedToStore();
            break;
        }
        case 'already_stored': {
            alreadyStored();
            break;
        }
        default: return;
    }

    return (
        <ToastContainer position="top-right"
            autoClose={2000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
    )
}
