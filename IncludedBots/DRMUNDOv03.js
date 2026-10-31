export default function bot({ history, memory }) {

    if (memory == null) {

        memory = {

            OpponentDCount: 0,
            OppState: 1,
            AdaptiveTest : false
        };
    }
    let move = "C"

    
    let RoundNumber = history.length;


    //Calculate the D Count
    if (RoundNumber > 0 && history.at(-1).opponent == "D" ) {

        memory.OpponentDCount++;

    }
    let OpponentDRate = 0;
    if (RoundNumber > 0) {
        OpponentDRate = memory.OpponentDCount / RoundNumber;
    }




    //Three Stats
    //Passive / Aggressive / Addaptive


    //Passive = 1
    //Addaptive = 2
    //Aggressive = 3


    //Check Last Three Rounds
    if (RoundNumber >= 3) {

        if (history.at(-1).opponent === "D"
         && history.at(-2).opponent === "D"
         && history.at(-3).opponent === "D")
        {

            memory.OppState = 3




        }
        else if (history.at(-1).opponent === "C"
            && history.at(-2).opponent === "C"
            && history.at(-3).opponent === "C") {

            memory.OppState = 1




        }

    }

    if (OpponentDRate > 0.4 && RoundNumber > 5)
    {

        memory.OppState = 3;

    }




    if (memory.OppState === 1) {
        move = "C";

    }
    else if (memory.OppState === 2) {
        return [history.at(-1).opponent, memory];

    }

    else if (memory.OppState === 3) {
        move = "D";

    }


    //Check Adaptive


    if (RoundNumber > 0 && history.at(-1).opponent === "D" && memory.AdaptiveTest === true) {


        memory.OppState = 2;
        memory.AdaptiveTest = false;
        
    }
    else if (RoundNumber > 0 && history.at(-1).opponent === "D" && memory.OppState !== 2) {
        memory.AdaptiveTest = true;
        move = "D";

    }





    return [move , memory];
}


