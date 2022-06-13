const arr = [
    { field: 'name', value: 'Sơn Đặng' },
    { field: 'age', value: 18 },
    { field: 'address', value: 'Hà Nội' },
]
const arr2 = [1, -8, 3]
const arr3 = [
    {
        name: 'Cá heo',
        attack: 50,
        speed: 100,
        hitpoint: 100,
    },
    {
        name: 'Khủng long',
        attack: 150,
        speed: 80,
        hitpoint: 180,
    },
    // ...
]
const arr4 = ['Javascript', 'PHP', 'Học PHP', 'Dart']
const arr5 = [1, 2, 6, 8]
const arr6 = [2, 9, 6]
const arr7 = [1, 'hi', false, 8, undefined, '', NaN]
const arr8 = ['1', '2', '3']
const arr9 = [{ name: 'BMW' }, { name: 'Mercedes' }, { name: 'Vinfast' }]

function getRequestBodyFromValues(formValues) {

    let result = {}
    formValues.forEach(el => {
        result[el.field] = el.value
    })
    return result

}

function checkPositiveNumbers(numbers) {
    return numbers.every(el => el > 0)
}

function findAMonsterByAttack(monsters) {
    let result = null
    if(monsters.find(monster => monster.attack === 150)){
    }
    return result
}

function findStringsInArrayByKeyword(keyword, strings) {
    /* let result = []
    strings.forEach((string, idx) => {
        if(string.search(keyword) != -1){
            result.push(strings[idx])
        }
    })
    console.log(result) */
    return strings.reduce((result, string, idx) => {
        if(string.search(keyword) != -1){
            result.push(string)
        }
        return result
    }, [])
}

function findEqualValues(arr1, arr2){
    return arr1.reduce((result, el1) => {
        if(arr2.find(el2 => el2 === el1)){
            result.push(el1)
        }
        return result
    }, [])
}

function convertToBoolean(inputs) {
    return inputs.map(ip => {
        if(ip){return true}else{return false}
    })
}

function convertToNumber(inputs) {
    return inputs.map(ip => {
        return parseInt(ip)
    })
}

function getHTMLfromArray(arr){
    return arr.map(el => {
        return `<li>${el.name}</li>`
    })
}

console.log('Cau: 1',getRequestBodyFromValues(arr))
console.log('Cau: 2',checkPositiveNumbers(arr2))
console.log('Cau: 3',findAMonsterByAttack(arr3))
console.log('Cau: 4',findStringsInArrayByKeyword('PHP',arr4))
console.log('Cau: 5',findEqualValues(arr5,arr6))
console.log('Cau: 6',convertToBoolean(arr7))
console.log('Cau: 7',convertToNumber(arr8))
console.log('Cau: 8',getHTMLfromArray(arr9))
