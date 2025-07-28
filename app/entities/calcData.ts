export class calcData {

    constructor(values: any, data: string, val: number) {
        this.val.firstVal = values.firstVal ?? "";
        this.val.secondVal = values.secondVal ?? "";
        this.val.thirdVal = values.thirdVal ?? "";
        this.val.fourthVal = values.fourthVal ?? "";

        switch (val) {
            case 1: {
                this.firstData = data;
                break;
            }
            case 2: {
                this.secondData = data;
                break;
            }
            case 3: {
                this.thirdData = data;
                break;
            }
            case 4: {
                this.fourthData = data;
                break;
            }
        }
        this.enterVal = val ?? 1;
    }

    public val = new values();

    public firstData = "";
    public secondData = "";
    public thirdData = "";
    public fourthData = "";

    public enterVal = 1; // 1 - first, 2 - second, 3 - third, 4 - fourth
}

class values {
    public firstVal = "";
    public secondVal = "";
    public thirdVal = "";
    public fourthVal = "";
}
