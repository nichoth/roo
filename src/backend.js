const TIME = 1000

function isErr () {
    return (process.env.NODE_ENV === 'test_err')
}

var applicants = [
    { firstName: 'Alice', lastName: 'lastNameAlice',
        occupation: 'a job', ssn: '123' },
    { firstName: 'Bob', lastName: 'lastNameBob',
        occupation: 'job 2', ssn: '456' },
    { firstName: 'Carol', lastName: 'lastNameCarol',
        occupation: 'job 3', ssn: '789' }
]

function backend () {
    // console.log('node env', process.env.NODE_ENV)

    return {
        getApplicants: function () {
            // wait 1 second
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isErr()) {
                        return reject(new Error('fail'))
                    }

                    resolve(applicants)
                }, TIME)
            })
        },

        getIndex: function (index) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isErr()) {
                        return reject(new Error('fail'))
                    }

                    resolve(applicants[index])
                }, TIME)
            })
        },

        add: function (newOne) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isErr()) {
                        return reject(new Error('fail'))
                    }

                    applicants.push(newOne)
                    resolve(applicants)
                }, TIME)
            })
        },

        update: function (i, newData) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isErr()) {
                        return reject(new Error('fail'))
                    }

                    applicants[i] = newData
                    resolve(applicants)
                }, TIME)
            })
        },

        remove: function (i) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (isErr()) {
                        return reject(new Error('fail'))
                    }

                    applicants.splice(i, 1)
                    resolve(applicants)
                }, TIME)
            })
        }
    }
}

module.exports = backend
