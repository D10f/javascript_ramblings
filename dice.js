const dice = (sides) => {
  
  const roll = () => Math.floor(Math.random() * sides) + 1
  
  return (rollAgain = []) => {
    
    let result = roll()
    
    if (rollAgain.length === 0){
      return result
    }
    
    while (rollAgain.includes(result)) {
      // error handling to avoid infinite loops
      if (rollAgain.length === sides) {
        throw new Error('You cannot exclude all possible roll results!')
      }
      result = roll()
    }
    
    return result
  }
}

const d20 = dice(20)
const d10 = dice(10)
const d6  = dice(6)
const d3  = dice(3)

/*
*	Create as many new dices as needed with the logic built-in. Run the
*	function to get a result as is, or with an optional array of numbers:
*/

d20([1,2,7])				// will not return 1, 2 or 7
d10()
d6([4])							// will not return 4
d3()
