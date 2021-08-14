var TIME = 1000

function backend () {
    console.log('node env', process.env.NODE_ENV)

    var applicants = [
        { firstName: 'one', lastName: 'one-last-name', occupation: 'bla',
            ssn: '123' },
        { firstName: 'two', lastName: 'two-last-name', occupation: 'bla2',
            ssn: '456' },
        { firstName: 'three', lastName: 'three-last-name', occupation: 'bla3',
            ssn: '789' }
    ]

    return {
        getApplicants: function () {
            // wait 1 second
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (process.env.NODE_ENV === 'test_err') {
                        return reject(new Error('fail'))
                    }

                    resolve(applicants)
                }, TIME)
            })
        },

        add: function (newOne) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (process.env.NODE_ENV === 'test_err') {
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
                    if (process.env.NODE_ENV === 'test_err') {
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
                    if (process.env.NODE_ENV === 'test_err') {
                        return reject(new Error('fail'))
                    }

                    applicants.splice(i, 1);
                    resolve(applicants)
                }, TIME)
            })
        }
    }
}

module.exports = backend
