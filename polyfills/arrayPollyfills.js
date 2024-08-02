// Iterating Arrays
if(!Array.prototype.customMap) {
    Array.prototype.customMap = function (callbackFunction) {
        const resultArr = [];
        const currArr = this;

        for(let i=0; i<currArr.length; i++) {
            resultArr.push(callbackFunction(currArr[i]));
        }

        return resultArr;
    }
}

if(!Array.prototype.customForEach) {
    Array.prototype.customForEach = function (callbackFunction) {
        const currArr = this;

        for(let i=0; i<currArr.length; i++) {
            callbackFunction(currArr[i])
        }
    }
}

if(!Array.prototype.customReduce) {
    Array.prototype.customReduce = function (callbackFunction, acc) {
        const currentArray = this;

        for(let index=0; index<currentArray.length; index++) {
            callbackFunction(acc, currentArray[index]);
        }

        return acc;
    }
}


if(!Array.prototype.customSome) {
    Array.prototype.customSome = function (callbackFunction) {
        const currArr = this;
        let isValid = false;

        for(let i=0; i<currArr.length; i++) {
            isValid = isValid || callbackFunction(currArr[i])
        }

        return isValid;
    }
}

if(!Array.prototype.customEvery) {
    Array.prototype.customEvery = function (callbackFunction) {
        const currArr = this;
        let isValid = true;

        for(let i=0; i<currArr.length; i++) {
            isValid = isValid && callbackFunction(currArr[i])
        }

        return isValid;
    }
}


if(!Array.prototype.customFilter) {
    Array.prototype.customFilter = function (callbackFunction) {
        const currArr = this;
        const filteredArr = [];

        for(let i=0; i<currArr.length; i++) {
            if(callbackFunction(currArr[i])) {
                filteredArr.push(currArr[i])
            }
        }

        return filteredArr;
    }
}

if(!Array.prototype.customFind) {
    Array.prototype.customFind = function (callbackFunction) {
        const currArr = this;

        for(let i=0; i<currArr.length; i++) {
            if(callbackFunction(currArr[i])) {
                return currArr[i]
            }
        }

        return null;
    }
}

// Accessing Elements 

if(!Array.prototype.customAt) {
    Array.prototype.customAt = function (ele) {
        const currArr = this;

        for(let i=0; i<currArr.length; i++) {
            if(ele === currArr[i]) {
                return i
            }
        }

        return undefined;
    }
}

if(!Array.prototype.customIndexOf) {
    Array.prototype.customIndexOf = function (ele) {
        const currArr = this;

        for(let i=0; i<currArr.length; i++) {
            if(ele === currArr[i]) {
                return i
            }
        }

        return -1;
    }
}

if(!Array.prototype.customLastIndexOf) {
    Array.prototype.customLastIndexOf = function (ele) {
        const currArr = this;

        for(let i=currArr.length-1; i>0; i--) {
            if(ele === currArr[i]) {
                return i
            }
        }

        return -1;
    }
}


if(!Array.prototype.customReverse) {
    Array.prototype.customReverse = function () {
        const currArr = this;
        const currentArrayLength = currArr.length;
        let left = 0;
        let right = currentArrayLength - 1;
        while(left<right) {
            let temp = currArr[left];
            currArr[left] = currArr[right]
            currArr[right] = temp;
            left+=1;
            right-=1;
        }
    }
}

if(!Array.prototype.customReverse2) {
    Array.prototype.customReverse2 = function () {
        const currArr = this;
        const currentArrayLength = currArr.length;

        for(let index=0; index<currentArrayLength/2; index++) {
            let temp = currArr[index];
            currArr[index] = currArr[currentArrayLength-1-index];
            currArr[currentArrayLength-1-index] = temp;
        }
    }
}

// concat - joins multiple arrays together
if(!Array.prototype.customConcat) {
    Array.prototype.customConcat = function (...args) {
        const currArr = this;
        let resultArr = [];

        const reducer = (acc, ele) => {
            if(ele instanceof Array) {
                let tempArr = ele.customConcat();
                tempArr.customForEach((currentEle) => {
                    acc.push(currentEle);
                })
            } else {
                acc.push(ele)
            }
            return acc;
        }

        // let resultArr = currArr.customReduce(reducer, []);

        [currArr, ...args].customForEach((arg) => {
            // console.log("arg - ", Array.isArray(arg), arg);
            if(arg instanceof Array) {
                resultArr = arg.customReduce(reducer, resultArr);
            } else {
                resultArr.push(arg)
            }
        })

        return resultArr;
    }
}

// Examples

// map
const arr = [9, 10, 90]

const newArr = arr.customMap((e) => 2*e);
console.log("map operations - ", newArr);

// for Each 
const numbers = [1, 2, 5, 3, 4, 5];
numbers.customForEach(function(number) {
    console.log(5+number);
  
    return 5+number;
  }); 
  
console.log("forEach Arr - ", numbers);

// reduce
console.log(numbers.customReduce(function (acc, currVal) {
    console.log("acc - ", acc, " currval - ", currVal);
    acc.push(currVal)
    return acc;
}, []));

const students = [
    { name: 'Prajwal', class: 'I' },
    { name: 'Burhan', class: 'II' },
    { name: 'Kunnal', class: 'III' },
    { name: 'Karthik', class: 'IV' },
    { name: 'Ravi', class: 'I' },
  ];
  
const groupByClass = students.reduce((acc, student) => {
    const className = student.class;
    if (!acc[className]) acc[className] = [];
    acc[className].push(student.name);
    return acc;
}, {});

console.log("group By Class - ", groupByClass);

const numberOperations = [
    num => num*2,
    num => num+9,
    num => num-4,
    num => num/2,
    num => num+1
]

const operationsAns = numberOperations.customReduce((acc, operation) => operation(acc), 20);

console.log("operationsAns - ", operationsAns);

// filter
const filterStudents = students.customFilter((student) => student.class === "IV" || student.class === "III")
console.log("filterStudents - ", filterStudents);

// find
const findStudent = students.customFind((student) => student.class === "IV" || student.class === "III")
console.log("findStudent - ", findStudent);

// some, every
const f = arr.customSome(e => e>200);
const g = arr.customEvery(e => e>5);
console.log("arr some  check - ", f);
console.log("arr every check - ", g);

// at
const atEleInd =  arr.customAt(10);
const atEleInd2 =  arr.customAt(200);
console.log("At Index - ", atEleInd);
console.log("At Index 2 - ", atEleInd2);

// reverse
const r = [1,2,3,4, 5]
r.customReverse()
console.log("Arr reverse - ", r);

//concat

const arr1 = ["Cecilie", "Lone"];
const arr2 = ["Emil", "Tobias", "Linus", ["Hobbit", "Alice"]];
const arr3 = ["Robin", ["Mike", "Will"]];
const output = arr1.customConcat(arr2, arr3);

console.log("output - ", output);

