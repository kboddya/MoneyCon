export class calcData {

    constructor(values: string[], enterData: string, val: number) {
        this.values = values;

        if (enterData[0] === "," || enterData[0] === ".") {
            enterData = "0" + enterData;
        }
        this.data[val] = enterData;
        this.enterVal = val ?? 1;
        console.log("calcData initialized:", this);
    }

    public data = ["", "", "", ""];

    public values = ["", "", "", ""];


    public enterVal = 1; // 1 - first, 2 - second, 3 - third, 4 - fourth
}
