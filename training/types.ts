console.log("------------------------------------------------------------------")
console.log("Example of Discriminated Union Types")
console.log("------------------------------------------------------------------")

// Discriminated unitn type needs a common property with a straight string to narrow correct type
// This is usefull in switch for example: nullables are not necessary for propreties not specific for case

// king it's the "tag" prop
type Circle = {
    kind: "circle";
    radius: number;
}

type Square = {
    kind: "square";
    side: number;
}

type Triangle = {
    kind: "triangle";
    type: "equilateral" | "isosceles" | "scalene";
    side: number;
}

// determinig the tag prop other properties are a consequence
type Shape = Circle | Square | Triangle;
const c: Shape = { kind: 'circle', radius: 50 };
const s: Shape = { kind: 'square', side: 50 };
const t: Shape = { kind: 'triangle', side: 50, type: 'equilateral' };

const printShapes = (s: Shape): string => {
    let result = "";

    switch (s.kind) {
        case 'square':
            result = `It's a square with a side ${s.side} long`;
            break;
        case 'circle':
            result = `It's a circle with a radius of ${s.radius}`;
            break;
        case 'triangle':
            result = `It's a ${s.type} triangle with a side ${s.side} long`;
            break;

        default:
            result = "no shape";
            break;
    }

    return result;
}

console.log(printShapes(c));
console.log(printShapes(s));
console.log(printShapes(t));

console.log("------------------------------------------------------------------")



console.log("------------------------------------------------------------------")
console.log("Example of Intersection Types")
console.log("------------------------------------------------------------------")

interface ErrorHandler {
    success: boolean;
    error?: { message: string };
}

interface DataFile {
    content: string[];
}

// with no commont properties all props are used
type DataReader = DataFile & ErrorHandler;

const edr: DataReader = { success: false, error: { message: "errors happen" }, content: [] };
const sdr: DataReader = { success: true, content: ["data", "data", "data"] };

// error must assert by ! 
const printData = (d: DataReader): string => {
    if (!d.success) {
        return d.error!.message;
    }

    return d.content.toString();

}
console.log(printData(edr));
console.log(printData(sdr));


console.log("------------------------------------------------------------------")



console.log("------------------------------------------------------------------")
console.log("Example of check union types with 'in' keyword")
console.log("------------------------------------------------------------------")


type Mail = {
    message: string
}

type Phone = {
    text: string
}

// "in" keyword with if narrows type and his props
const info = (obj: Mail | Phone): void => {
    if ("message" in obj) {
        console.log("it's a mail: " + obj.message);
        return;
    }

    console.log("it's a sms: " + obj.text);
}

info({ message: "hello" });
info({ text: "world!" });


console.log("------------------------------------------------------------------")
