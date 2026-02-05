import { useEffect, useRef } from "react";

export const MESSAGE_FETCH_INTERVAL = 1500;

const API_URL = 'http://localhost:5000';

const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const lastId = useRef(null)
    const pollingRef = useRef(null)

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                const res = await fetch(`${API_URL}/messages`)
                const data = await res.json();

                setMessages(data);
                if (data.length) {
                    lastId.current = data[data.length - 1].id;
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false)
            }
        }

        loadInitialData();
    }, [])

    useEffect(() => {
        if (loading) return;
        
        // polling here
    }, [lastId])

    // send msg function

    return {
        messages,
        // send message,
        loading,
    }
}

export default useChat;