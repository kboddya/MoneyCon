import IndexPage from "@/app/pages"
import WelcomePage from "@/app/pages/welcome"
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {router} from "expo-router";

export default function App(){
    const [firstStart, setFirstStart] = useState(true);
    useEffect(() => {
        AsyncStorage.getAllKeys().then(keys => keys.length === 0 ? setFirstStart(true) : setFirstStart(false));
    }, []);
    return firstStart ? <WelcomePage/> : <IndexPage/>;
}