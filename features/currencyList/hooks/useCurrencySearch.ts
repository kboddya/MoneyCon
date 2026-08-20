import { useCurrencyStore } from "@/stores";
import { useState } from "react";

function useCurrencySearch() {
    const { currencyList } = useCurrencyStore();

    const [searchingResult, setSearchingResult] = useState<string[][] | undefined>(undefined);

    const searchHandler = (searchEl?: string) => {
        if (!searchEl) {
            setSearchingResult(undefined);
            return;
        }
        const normalized = searchEl.trim().toUpperCase();
        setSearchingResult(currencyList?.filter((val) => val.some((v) => v.toUpperCase().includes(normalized))));
    }

    return {
        currencyList,
        searchedData: searchingResult,
        searchHandler
    }
}

export default useCurrencySearch;