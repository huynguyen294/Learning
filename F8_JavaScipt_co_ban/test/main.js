function run(animals) {

    if(!animals.length){
        animals.push('Cat')
        animals.push('Mouse')
    }else if(animals.length == 1){
        animals.unshift('Elephant')
    }else{
        animals.splice(1 , 1, 'Monkey', 'Tiger')
    }

    return animals;
}

console.log(run([1,2,3,4]))

var h1 = document.getElementById('h1')
h1.draggable = true
console.log([h1.draggable])