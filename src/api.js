import { useState, useEffect } from "react";

const useFetch = async () => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [URL, setURL] = useState("");
    const [options, setOptions] = useState(undefined);
    useEffect(() => {
        const fetchData = async (URL, options) => {
            setIsLoading(true);
            try {
                const res = await fetch(URL, options);
                const json = await res.json();
                setResponse(json);
                setIsLoading(false);
            } catch (error) {
                setError(error);
            }
        }
        if (URL) { fetchData(URL, options) }
    }, [URL])
    return [response, error, isLoading, setURL, setOptions];
}

export default useFetch;