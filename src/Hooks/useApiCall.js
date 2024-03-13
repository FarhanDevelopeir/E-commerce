import { useState } from "react";

const useApiCall = (apiFunction) => {

    console.log('hook working', apiFunction);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const makeApiCall = async (...args) => {
        setLoading(true);
        setError(null);

        try{
            const result = await apiFunction(...args)
            return result;
        } catch(err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return [makeApiCall, isLoading, error];
};

export default useApiCall;

