/**
 * This extension is designed to programme and drive the AICamera ErLang God(二郎神)
 */
//% weight=0 color=#0031AF icon="\uf06e"
//% groups='["Data", "Ball", "Face", "Card", "Tracking", "Color", "Learn"]'
//% block="ErlangGod"
namespace ErlangGod {
    const CameraAdd = 0X14;
    let DataBuff = pins.createBuffer(9);
    /**
    * Status List of Ball
    */
    export enum BallState {
        //% block="Color"
        Color = 1,
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Ball TotalNum"
        BallTotalNum = 7,
        //% block="Ball order"
        Ballorder = 8
    }
    /**
    * Status List of Face
    */
    export enum FaceState {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Face TotalNum"
        FaceTotalNum = 7,
        //% block="Face order"
        Faceorder = 8
    }
    /**
    * Status List of Card
    */
    export enum CardState {
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Card TotalNum"
        CardTotalNum = 7,
        //% block="Card order"
        Cardorder = 8
    }
    /**
* Status List of Color
*/
    export enum ColorState {
        //% block="ID"
        ID = 1,
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Color TotalNum"
        ColorTotalNum = 7,
        //% block="Color order"
        Colororder = 8
    }
    /**
    * Status List of Things
    */
    export enum ThingsState {
        //% block="ID"
        ID = 1,
        //% block="X"
        X = 2,
        //% block="Y"
        Y = 3,
        //% block="W"
        W = 4,
        //% block="H"
        H = 5,
        //% block="Confidence level "
        Confidence = 6,
        //% block="Things TotalNum"
        ThingsTotalNum = 7,
        //% block="Things order"
        Thingsorder = 8
    }

    export enum LineState {
        //% block="angel"
        angel = 1,
        //% block="width"
        width = 2,
        //% block="len"
        len = 3
    }
    export enum LineList {
        //% block="forward"
        forward = 0,
        //% block="left front"
        left_fromt = 1,
        //% block="right front"
        right_fromt = 2,
        //% block="left turn"
        left_turn = 3,
        //% block="right turn"
        right_turn = 4,
        //% block="T-junction"
        T_junction = 5,
        //% block="intersection"
        intersection = 6,
        //% block="no road"
        no_road = 8
    }
    let NumCardlabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let LetterCardlabels = ["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let TrafficCardlabels = ["go_ahead", "no_travel", "turn_around", "turn_left", "turn_right"]
    let OtherCardlabels = ["hexagon", "pentagon", "quadrilateral", "round", "triangle", "airplane",
        "apple", "bread", "car", "cat", "cup", "dog", "egg", "grape", "pear", "ship", "strawberry",
        "umbrella"]

    //% block="Get once data from ElangGod"
    //% group="Data"
    export function cameraData(): void {
        DataBuff = pins.i2cReadBuffer(CameraAdd, 9)
    }
    //% block="Recognize the ball"
    //% group="Ball"
    export function checkBall(): boolean {
        if (DataBuff[0] == 7) {
            return true
        }
        else {
            return false
        }
    }
    //% block="From data Object Ball state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Ball"
    export function ballData(state: BallState): number {
        if (DataBuff[0] == 7) {
            switch (state) {
                case BallState.Color:
                    return (DataBuff[1])
                case BallState.X:
                    return (DataBuff[2]);
                case BallState.Y:
                    return (DataBuff[3]);
                case BallState.W:
                    return (DataBuff[4]);
                case BallState.H:
                    return (DataBuff[5]);
                case BallState.Confidence:
                    return (DataBuff[6]);
                case BallState.BallTotalNum:
                    return (DataBuff[7]);
                case BallState.Ballorder:
                    return (DataBuff[8]);
                default:
                    return 0;
            }
        }
        else {
            return null
        }
    }
    //% block="Recognize the face"
    //% group="Face"
    export function checkFace(): boolean {
        if (DataBuff[0] == 6) {
            return true
        }
        else {
            return false
        }
    }
    //% block="From data Object Face state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Face"
    export function faceData(state: FaceState): number {
        if (DataBuff[0] == 6) {
            switch (state) {
                case FaceState.X:
                    return (DataBuff[2]);
                case FaceState.Y:
                    return (DataBuff[3]);
                case FaceState.W:
                    return (DataBuff[4]);
                case FaceState.H:
                    return (DataBuff[5]);
                case FaceState.Confidence:
                    return (DataBuff[6]);
                case FaceState.FaceTotalNum:
                    return (DataBuff[7]);
                case FaceState.Faceorder:
                    return (DataBuff[8]);
                default:
                    return 0;
            }
        }
        else {
            return null
        }
    }
    //% block="From data Object Card Name"
    //% group="Card"
    export function cardName(state: LineList): string {
        switch (DataBuff[0]) {
            case 2:
                return NumCardlabels[DataBuff[1]]
            case 3:
                return LetterCardlabels[DataBuff[1]]
            case 4:
                return TrafficCardlabels[DataBuff[1]]
            case 5:
                return OtherCardlabels[DataBuff[1]]
            default:
                return "NO Card"
        }
    }
    //% block="From data Object Card state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Card"
    export function CardData(state: CardState): number {
        if (DataBuff[0] == 2 || DataBuff[0] == 3 || DataBuff[0] == 4 || DataBuff[0] == 5) {
            switch (state) {
                case CardState.X:
                    return (DataBuff[2]);
                case CardState.Y:
                    return (DataBuff[3]);
                case CardState.W:
                    return (DataBuff[4]);
                case CardState.H:
                    return (DataBuff[5]);
                case CardState.Confidence:
                    return (DataBuff[6]);
                case CardState.CardTotalNum:
                    return (DataBuff[7]);
                case CardState.Cardorder:
                    return (DataBuff[8]);
                default:
                    return 0;
            }
        }
        else
            return null
    }
    //% block="From data Object Line tracking is %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Tracking"
    export function lineTracking(state: LineList): boolean {
        if (DataBuff[0] == 8) {
            if (DataBuff[4] == state) {
                return true
            }
            else {
                return false
            }
        }
        else
            return false
    }
    //% block="From data Object tracking state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Tracking"
    export function trackingData(state: LineState): number {
        if (DataBuff[0] == 8) {
            switch (state) {
                case LineState.angel:
                    return (DataBuff[2]);
                case LineState.len:
                    return (DataBuff[3]);
                case LineState.width:
                    return (DataBuff[4]);
                default:
                    return 0;
            }
        }
        else
            return null
    }
    //% block="learn color ID %colorID"
    //% group="Color"
    export function learnColor(colorID: number): void {
        let ColorBuf = pins.createBuffer(9)
        let timeout = 0
        ColorBuf[0] = 9
        ColorBuf[1] = colorID
        pins.i2cWriteBuffer(CameraAdd, ColorBuf)
        while (timeout > 10000) {
            cameraData()
            if (DataBuff[0] == 9 && DataBuff[1] == colorID) {
                break
            }
            timeout++
        }
    }
    //% block="From data Object Card state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Color"
    export function colorData(state: ColorState): number {
        if (DataBuff[0] == 9) {
            switch (state) {
                case ColorState.ID:
                    return DataBuff[1]
                case ColorState.X:
                    return DataBuff[2]
                case ColorState.Y:
                    return DataBuff[3]
                case ColorState.W:
                    return DataBuff[4]
                case ColorState.H:
                    return DataBuff[5]
                case ColorState.Confidence:
                    return DataBuff[6]
                case ColorState.ColorTotalNum:
                    return DataBuff[7]
                case ColorState.Colororder:
                    return DataBuff[8]
                default:
                    return 0;
            }
        }
        else
            return null
    }
    //% block="learn Things ID %thingsID"
    //% group="Learn"
    export function learnThings(thingsID: number): void {
        let thingsBuf = pins.createBuffer(9)
        let timeout = 0
        thingsBuf[0] = 9
        thingsBuf[1] = thingsID
        pins.i2cWriteBuffer(CameraAdd, thingsBuf)
        while (timeout > 10000) {
            cameraData()
            if (DataBuff[0] == 9 && DataBuff[1] == thingsID) {
                break
            }
            timeout++
        }
    }
    //% block="From data Object things state %state"
    //% state.fieldEditor="gridpicker"
    //% state.fieldOptions.columns=3
    //% group="Learn"
    export function thingsData(state: ThingsState): number {
        if (DataBuff[0] == 9) {
            switch (state) {
                case ThingsState.ID:
                    return DataBuff[1]
                case ThingsState.X:
                    return DataBuff[2]
                case ThingsState.Y:
                    return DataBuff[3]
                case ThingsState.W:
                    return DataBuff[4]
                case ThingsState.H:
                    return DataBuff[5]
                case ThingsState.Confidence:
                    return DataBuff[6]
                case ThingsState.Thingsorder:
                    return DataBuff[7]
                case ThingsState.ThingsTotalNum:
                    return DataBuff[8]
                default:
                    return 0;
            }
        }
        else
            return null
    }
}