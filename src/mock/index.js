const mock = {
    'GET /demo/testCache': {
        data: {
            name: '呱呱奇遇记',
            age: '18',
            hobby: 'dota2'
        },
        status: true,
        statusCode: 0,
        message: ''
    },

    'GET /demo/testLoading': (req, res) => {
        setTimeout(() => {
            res.send({
                data: [{
                    id: 1,
                    name: '呱呱奇遇记',
                    age: '18',
                    hobby: 'dota2'
                }],
                status: true,
                statusCode: 0,
                message: ''
            });
        }, 500);
    },

    'POST /demo/testOperate': {
        data: 'success',
        status: true,
        statusCode: 0,
        message: ''
    },

    'GET /demo/testDebounce': (req, res) => {
        setTimeout(() => {
            res.send({
                data: [{
                    id: 1,
                    name: '呱呱奇遇记',
                    age: '18',
                    hobby: 'dota2'
                }],
                status: true,
                statusCode: 0,
                message: ''
            });
        }, 500);
    },
}

module.exports = mock;