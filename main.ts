/**
 * This extension is designed to programme and drive the AICamera ErLang God(二郎神)
 */
//% weight=0 color=#0031AF icon="\uf06e"
//% groups='["Ball", "Face", "Card", "Tracking", "Color", "Learn"]'
//% block="ErlangGod"
namespace ErlangGod {
    const CameraAdd=0X14;
    let DataBuff=pins.createBuffer(9);
    /**
    * Status List of Ball
    */
    export enum BallState {
        //% block="Color"
        Color=1,
        //% block="X"
        X=2,
        //% block="Y"
        Y=3,
        //% block="W"
        W=4,
        //% block="H"
        H=5,
        //% block="Confidence level "
        Confidence=6,
        //% block="Ball TotalNum"
        BallTotalNum=7,
        //% block="Ball order"
        Ballorder=8
    }
    /**
    * Status List of Face
    */
    export enum FaceState {
        //% block="X"
        X=2,
        //% block="Y"
        Y=3,
        //% block="W"
        W=4,
        //% block="H"
        H=5,
        //% block="Confidence level "
        Confidence=6,
        //% block="Face TotalNum"
        FaceTotalNum=7,
        //% block="Face order"
        Faceorder=8
    }

    export enum LineState {
        //% block="angel"
        angel=1,
        //% block="width"
        width=2,
        //% block="len"
        len=3
    }
    export enum LineList {
        //% block="forward"
        forward=0,
        //% block="left front"
        left_fromt=1,
        //% block="right front"
        right_fromt=2,
        //% block="left turn"
        left_turn=3,
        //% block="right turn"
        right_turn=4,
        //% block="T-junction"
        T_junction=5,
        //% block="intersection"
        intersection=6,
        //% block="no road"
        no_road=8
    }
    let NumCardlabels=["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    let LetterCardlabels=["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
    let TrafficCardlabels=["go_ahead", "no_travel", "turn_around", "turn_left", "turn_right"]
    let OtherCardlabels=["hexagon", "pentagon", "quadrilateral", "round", "triangle", "airplane",
        "apple", "bread", "car", "cat", "cup", "dog", "egg", "grape", "pear", "ship", "strawberry",
        "umbrella"]


    //% block="Get once data from ElangGod"
    export function cameraData(): void {
        DataBuff=pins.i2cReadBuffer(0x14, 9)
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
}