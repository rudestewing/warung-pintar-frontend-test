import React, {useEffect, useState} from "react";

export default function usePageBottom() {
    const [bottom, setBottom] = React.useState(false);

    function handleScroll() {
        const {clientHeight, scrollTop, scrollHeight} = document.documentElement;
        console.log(
            clientHeight,
            scrollTop,
            scrollHeight
        );

        // if(clientHeight + scrollTop == scrollHeight) {
            
        // }
        console.log();
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    
    return bottom;
}