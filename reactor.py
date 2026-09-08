from py_mini_racer import MiniRacer
import os, os.path
import re
import json

# int i = num of files in the bots/folder
# for x = 0, i read each file and save the SRC in an array

numOfBots = len([name for name in os.listdir('.') if os.path.isfile(name)])

botFiles = []

botList = []
bots = {}

callScript = """
globalThis.botFuncCaller = function(jsonText) {
    const [history, memory] = JSON.parse(jsonText);
    const result = globalThis.botFunc({ history, memory });
    return JSON.stringify(result);
}
"""

for root, _, files in os.walk(os.getcwd() + "\\bots\\"):  
    for filename in files:  # loop through files in the current directory
        botFiles.append(os.path.join(root, filename))
        botList.append(filename)
        print(filename)
        with open(os.path.join(root, filename), "r") as f:
            bots[filename] = {}
            bots[filename]["name"] = re.sub(r'[^a-zA-Z0-9_-]', '', os.path.splitext(filename)[0]) 
            bots[filename]["code"] = f.read().replace("export default", "globalThis.botFunc =") + callScript
            ctx = MiniRacer()
            ctx.eval(bots[filename]["code"])
            bots[filename]["ctx"] = ctx

def playRounds(numOfRounds, bot1, bot2):
    bot1memory = None
    bot1history = None
    bot1move = None
    bot2memory = None
    bot2history = None
    bot2move = None
    history = []
    for i in range(1, numOfRounds + 1):
        try:
            bot1output = json.loads(bots[bot1]["ctx"].call("botFuncCaller", json.dumps([bot1history, bot1memory])))
            bot1move = bot1output[0]
            bot1memory = bot1output[1]
            if not (bot1move.lower() == "d" or bot1move.lower() == "c"):
                print(f"oopsie it appears that {bot1} made an illegal move against {bot2}! :b")
                return None, True
        except Exception as e:
            print(f"{bot1} crashed! :(")
            return None, True
        try:
            bot2output = json.loads(bots[bot2]["ctx"].call("botFuncCaller", json.dumps([bot2history, bot2memory])))
            bot2move = bot2output[0]
            bot2memory = bot2output[1]
            if not (bot2move.lower() == "d" or bot2move.lower() == "c"):
                print(f"oopsie it appears that {bot2} made an illegal move against {bot1}! :b")
                return None, True
        except Exception as e:
            print(f"{bot2} crashed! :(")
            return None, True

        if bot1history == None:
            bot1history = []
            bot2history = []
        bot1history.append({"you": bot1move, "opponent": bot2move})
        bot1history.append({"you": bot2move, "opponent": bot1move})
        history.append([bot1move, bot2move])
        
    ctx = MiniRacer()
    ctx.eval(bots[bot1]["code"])
    bots[bot1]["ctx"] = ctx
    ctx = MiniRacer()
    ctx.eval(bots[bot2]["code"])
    bots[bot2]["ctx"] = ctx
    return history, False
    


playRounds(100, botList[0], botList[1])

