import { createContext, useState, useEffect, PropsWithChildren, useContext } from "react";
import { NetworkContext } from "./NetworkContext";
import { updateData } from "@/services/apiService";
import { getTime } from "@/services/cacheService";
import { AuthContext } from "./AuthContext";
import LoadingModal from "@/components/modals/LoadingModal";

type ExchangeRateState = {
    apiKey: string | null;
    exchangeRateUpdateTimestamp: string | null;
    updateExchangeRate: () => Promise<void>;
}

export const ExchangeRateContext = createContext<ExchangeRateState>({
    apiKey: null,
    exchangeRateUpdateTimestamp: null,
    updateExchangeRate: async () => { },
})

export const ExchangeRateProvider = ({ children }: PropsWithChildren) => {
    const [exchangeRateUpdateTimestamp, setExchangeRateUpdateTimestamp] = useState<string | null>(null);

    const { isConnected, isChanged, type } = useContext(NetworkContext);
    const { apiKey } = useContext(AuthContext);

    const [updating, setUpdating] = useState(false);

    const updateExchangeRate = async (force = true) => {
        if (force) setUpdating(true);
        const timestamp = await getTime();
        setExchangeRateUpdateTimestamp(timestamp);
        if (!isConnected || !apiKey) return;
        const result = await updateData(force);
        if (result.latestSuccess) {
            const newTimestamp = await getTime();
            setExchangeRateUpdateTimestamp(newTimestamp);
        }
        setUpdating(false);
    }

    useEffect(() => {
        (async () => {
            await updateExchangeRate(false);
        })();
    }, [isConnected, isChanged, type])

    return (
        <ExchangeRateContext.Provider value={{ apiKey, exchangeRateUpdateTimestamp, updateExchangeRate }}>
            {children}
            <LoadingModal visible={updating} />
        </ExchangeRateContext.Provider>
    )
}