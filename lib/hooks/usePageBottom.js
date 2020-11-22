import React, {useEffect, useState} from "react";

export default function usePageBottom() {
    const [bottom, setBottom] = React.useState(false);

    function handleScroll() {
        const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
        if(clientHeight + scrollTop  === scrollHeight) {
            setBottom(true);
        } else {
            setBottom(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    
    return bottom;
}