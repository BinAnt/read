async function myFunction() {
    await somethingThatReturnPromise()
    .catch(function(err) {
        console.log(err);
    })
}

function somethingThatReturnPromise() {
   return new Promise((resolve, reject) => {
       reject('error')
   })
}

myFunction() // error