/**
 * This extension is designed to programme and drive the AICamera
 */
//% weight=0 color=#0031AF icon="\uf06e"
//% block="ErlangGod"
namespace ErlangGod {
    const CameraAdd = 0X14;
    let DataBuff = pins.createBuffer(9);
    let FuncBuff = pins.createBuffer(5);

    /**
    * List of Function
    */
    export enum FunctionList {
        //% block="Ball recognition"
        Ball = 0x08,
        //% block="Face recognition"
        Face = 0x07,
        //% block="Tracking"
        Tracking = 0x09,
        //% block="Color recognition"
        Color = 0x01,
        //% block="Number recognition"
        Number = 0x02,
        //% block="Letter recognition"
        Letter = 0x03,
        //% block="Traffic recognition"
        Traffic = 0x04,
        //% block="Shape recognition"
        Shape = 0x05,
        //% block="Other recognition"
        Other = 0x06,
        //% block="None"
        None = 0x00
    }
    /**
    * Status List of Object
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
        //% block="Object TotalNum"
        TotalNum = 7,
        //% block="Object order"
        Objectorder = 8
    }
    /**
* Status List of Object
*/
    export enum BallState {
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
        //% block="Object TotalNum"
        TotalNum = 7,
        //% block="Object order"
        Objectorder = 8
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
    let Cardlabels = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
        "black", "blue", "brown", "gray", "green", "orange", "pink", "purple", "red", "rose",
        "white", "yellow", "hexagon", "pentagon", "quadrilateral", "round", "triangle", "airplane",
        "apple", "bread", "car", "cat", "cup", "dog", "egg", "grape", "pear", "ship", "strawberry",
        "umbrella", "go_ahead", "no_travel", "turn_around", "turn_left", "turn_right"]


    //% block="Initialize function by|fun1: %fun1|fun2:%fun2|fun3:%fun3|fun4:%fun4|fun5:%fun5"
    export function initialize(func1: FunctionList, func2: FunctionList, func3: FunctionList, func4: FunctionList, func5: FunctionList): void {
        FuncBuff[0] = func1;
        FuncBuff[1] = func2;
        FuncBuff[2] = func3;
        FuncBuff[3] = func4;
        FuncBuff[4] = func5;
        pins.i2cWriteBuffer(CameraAdd, FuncBuff);
    }
    //% block="Object Face state %state"
    export function Face(state: FaceState): number {
        cameraData();
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
                case FaceState.TotalNum:
                    return (DataBuff[7]);
                case FaceState.Objectorder:
                    return (DataBuff[8]);
                default:
                    return 0;
            }
        }
        else {
            return null
        }
    }

    //% block="Object Ball state %state"
    export function Ball(state: BallState): number {
        cameraData()
        if (DataBuff[0] == 7) {
            switch (state) {
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
                case BallState.TotalNum:
                    return (DataBuff[7]);
                case BallState.Objectorder:
                    return (DataBuff[8]);
                default:
                    return 0;
            }
        }
        else {
            return null
        }
    }
    //% block="Object Line state %state"
    export function Line(state: LineState): number {
        cameraData();
        switch (state) {
            case LineState.angel:
                return HexToDec(DataBuff[1]);
            case LineState.width:
                return HexToDec(DataBuff[2]);
            case LineState.len:
                return HexToDec(DataBuff[3]);
            default:
                return 0;
        }
    }
    //% block="Object Line tracking is %state"
    export function Tracking(state: LineList): boolean {
        cameraData();
        if (DataBuff[4] == state) {
            return true
        }
        else {
            return false
        }

    }

    //% block="get once data"
    export function cameraData(): void {
        DataBuff = pins.i2cReadBuffer(0x14, 9)
    }
    function HexToDec(dat: number): number {
        return (dat >> 4) * 10 + (dat % 16);
    }
}