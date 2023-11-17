"use client"
import { useEffect } from 'react';

export default function ForceColorMode() {
    useEffect(() => {
        if (localStorage.getItem('chakra-ui-color-mode') == 'light') {
            localStorage.setItem('chakra-ui-color-mode', 'dark');
        }
      }, []);
    return(
        <>
        </>
    );
}