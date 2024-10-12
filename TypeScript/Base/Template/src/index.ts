enum Gender {
    Female, // 默认为0
    Male,   // 依次往下排序
    Secret=100,
    unknown // 从100依次往下排序
}

let me: object = {
    gender: Gender.unknown,
}

console.log(me); // {gender:101}
