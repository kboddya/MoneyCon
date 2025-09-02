import IndexPage from "@/app/pages"
import WelcomePage from "@/app/pages/welcome"
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SplashScreen from "expo-splash-screen"
import {router} from "expo-router";


SplashScreen.setOptions({
    fade: true,
    duration: 30000,
});

SplashScreen.preventAutoHideAsync();
export default function App() {
    const [firstStart, setFirstStart] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed !== router.canDismiss()){
        setIsDismissed(router.canDismiss());
        setIsLoaded(false);
    }

    useEffect(() => {
        AsyncStorage.getAllKeys().then(keys => {
            keys.length === 0 ? setFirstStart(true) : setFirstStart(false)
            setIsLoaded(true);
        });
    }, [isDismissed]);
    useEffect(() => {
        if (isLoaded) {
            SplashScreen.hideAsync();
        }
    }, [isLoaded]);
    return isLoaded ? (firstStart ? <WelcomePage/> : <IndexPage/>) : null;
}