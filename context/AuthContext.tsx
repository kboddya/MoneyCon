import { SplashScreen, router } from "expo-router";
import { createContext, useState, useEffect, PropsWithChildren, useContext, use } from "react";
import { Toast } from "toastify-react-native";
import { getApiKey, getLastRequestCode } from "@/services/cacheService";
import { NetworkContext } from "@/context/NetworkContext";
import { UpdateApiKey } from "@/services/apiService";
import LoadingModal from "@/components/modals/LoadingModal";

type AuthState = {
    isReady: boolean;
    apiKey: string | null;
    setApiKeyAsync: (key: string | null) => Promise<{ ok: boolean, error?: string }>;
}

export const AuthContext = createContext<AuthState>({
    isReady: false,
    apiKey: null,
    setApiKeyAsync: async () => { return { ok: false, error: "Not implemented" } },
})

export const AuthProvider = ({ children }: PropsWithChildren) => {
    const [apiKey, setApiKeyState] = useState<string | null>(null);

    const [isReady, setIsReady] = useState(false);

    const [isInitializing, setIsInitializing] = useState(false);

    const { isConnected, isChanged } = useContext(NetworkContext);

    const setApiKeyAsync = async (key: string | null) => {
        if (!isConnected && isChanged) {
            Toast.show({
                text1: "No internet connection",
                text2: "Cannot save API key without internet",
                type: "error",
                position: "bottom",
                autoHide: true,
            });
            return { ok: false, error: "No internet connection" };
        }
        setIsInitializing(true);
        if (key === null) {
            setIsInitializing(false);
            Toast.show({
                text1: "Something went wrong",
                type: "error",
                position: "bottom",
                useModal: false,
            });
            return { ok: false, error: "Something went wrong" };
        }
        const result = await UpdateApiKey(key);
        console.log("AuthContext: UpdateApiKey result:", result);
        if (!result.ok) {
            setIsInitializing(false);
            Toast.show({
                text1: "Error saving API key",
                type: "error",
                position: "bottom",
                useModal: false,
            });
            return { ok: false, error: "Error saving API key" };
        }
        setApiKeyState(key);
        setIsInitializing(false);
        router.replace("/(screens)");
        return { ok: true };
    }

    useEffect(() => {
        console.log(isChanged)
        if (!isChanged) return;
        (async () => {
            const key = await getApiKey();
            console.log("AuthContext: Retrieved API key from storage", key);
            if (key === "" || !key) {
                SplashScreen.hideAsync();
                return;
            }
            const lastRequestCode = await getLastRequestCode();
            console.log("AuthContext: Last request code:", lastRequestCode);
            if (lastRequestCode === 401) {
                SplashScreen.hideAsync();
                return;
            }
            setApiKeyState(key);
        })();
        setIsReady(true);
    }, [isChanged]);

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    return (
        <AuthContext.Provider value={{ isReady, apiKey, setApiKeyAsync }}>
            {children}
            <LoadingModal visible={isInitializing} />
        </AuthContext.Provider>
    )
}