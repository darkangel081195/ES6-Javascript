function find(value1,label1){
    switch(label1){
        case 'minutes':
            if(value1 < 2)return false;
            return value1 * 60;
        case 'hours':
            if(value1 < 2)return false;
            return value1*60*60;
        case 'seconds':
            if(value1 < 2)return false;
            return value1;
        case 'days':
            if(value1 < 2)return false;
            return value1 * 24 * 60 * 60;
        case 'minute':
            if(value1 !== 1)return false;
            return value1*60;
        case 'hour':
            if(value1 !==1)return false;
            return value1*60*60;
        case 'seconds':
            if(value1 !== 1)return false;
            return value1;
        case 'days':
            if(value1 !==1 )return false;
            return value1 * 24 * 60 * 60;
        default:
            return false;        
    }
}

function timeAdder(value1,label1,value2,label2){

    if(isNaN(value1) || isNaN(value2) || value1 < 0 || value2 < 0){
        return false;
    }

    let a = find(value1,label1);
    let b = find(value2,label2);

    if(a === false || b === false)return false;

    let c = a + b;

    let d = c;
    if(c % 86400 === 0){
        d = c/86400;
        if(d == 1)return([1,'day']);
        else return([d,'days']);
    }
    else if(c % 3600 === 0){
        d = c/3600;
        if(d == 1)return([1,'hour']);
        else return([d,'hours']);
    }
    else if(c % 60 === 0){
        d = c/60;
        if(d == 1)return([1,'minute']);
        else return([d,'minutes']);
    }
    else{
        return([c,'seconds']);
    }

}

console.log(timeAdder(5,"hour",5,"minutes"));
console.log(timeAdder(false,false,5,"minutes"));
console.log(timeAdder({},"days",5,"minutes"));

console.log(timeAdder(1,"minute",3,"minutes"));

console.log(timeAdder(5,"days",25,"hours"));

console.log(timeAdder(1,"minute",240,"seconds"));
console.log(timeAdder(20,"hours",4,"hours"));
console.log(timeAdder(20,"hours",5,"hours"));

