export const selectCurrency = (
	current: string[],
	newValue: string,
	index: number,
): string[] => {
	const next = [...current];
	next[index] = newValue;
	return next;
};

export const changeSelectedLength = (
	currentArray: string[],
	newLength: number,
): string[] => {
	if (newLength < 0) return currentArray;

	currentArray.length = newLength;
	return [...currentArray];
};
