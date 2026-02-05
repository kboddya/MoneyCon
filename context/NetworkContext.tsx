import * as Network from "expo-network";
import { createContext, useState, PropsWithChildren, useEffect } from "react";
import { Toast } from "toastify-react-native";

type NetworkStatus = {
    type: Network.NetworkStateType | null;
    isConnected: boolean | null;
    isInternetReachable: boolean | null;
    isChanged: boolean;
}

export const NetworkContext = createContext<NetworkStatus>({
    type: null,
    isConnected: null,
    isInternetReachable: null,
    isChanged: false
})

export const NetworkProvider = ({ children }: PropsWithChildren) => {
    const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
        type: null,
        isConnected: null,
        isInternetReachable: null,
        isChanged: false
    });
    useEffect(() => {
        (async () => {
            setNetworkStatus(prev => ({ ...prev, isChanged: false }));
            const status = await Network.getNetworkStateAsync();
            setNetworkStatus({
                type: status.type ?? Network.NetworkStateType.UNKNOWN,
                isConnected: status.isConnected ?? false,
                isInternetReachable: status.isInternetReachable ?? false,
                isChanged: true
            });
        })();
        const subscription = Network.addNetworkStateListener((state) => {
            setNetworkStatus(prev => ({ ...prev, isChanged: false }));
            setNetworkStatus({
                type: state.type ?? Network.NetworkStateType.UNKNOWN,
                isConnected: state.isConnected ?? false,
                isInternetReachable: state.isInternetReachable ?? false,
                isChanged: true
            });
        })

        return () => {
            subscription && subscription.remove();
        }
    }, [])

    useEffect(() => {
        console.log("Network Context: Network status changed:", networkStatus);
        if (!networkStatus.isConnected && networkStatus.isChanged) {
            Toast.show({
                text1: "No internet connection",
                text2: "Some features may not work properly",
                type: "warn",
                position: "bottom",
                autoHide: true,
            });
        }
    }, [networkStatus.isChanged, networkStatus.isConnected])

    return (<NetworkContext.Provider value={networkStatus}>
        {children}
    </NetworkContext.Provider>)
}