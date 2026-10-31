export default function bottlev2({history, memory}){
    let n = history.length - 1
    let move
    let C
    let opp
    let D = 0
    if (history.length < 4){
        move = "C"
    }
    else{
        opp = history[n].opponent
        if(opp == "C"){
            C = 1
        }
        if(opp == "D"){
            memory += 1
        }
        if(memory > 2&&C > 0){
            move = "C"
            memory = 0
            C = 0
        }
        else if (memory > 2){    
            move = "D"
        }
        else if(opp == "C"){
            move = "C"
        }
        else if (memory > 1){
            move = "D"
            memory += 1
        }
        else if(memory = 1){
            move = "C"
        }
    }
    return [move, memory]
}