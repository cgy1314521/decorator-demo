export const COMMON_ACTION = {
    LOADING_STATE: 'LOADING_STATE',
}

export default {
    namespace: 'common',
    state: {
        loading: false              // http请求状态
    },
    reducers: {
        [COMMON_ACTION.LOADING_STATE](state: any, payload: any) {
            return {
                ...state,
                ...payload
            }
        },
    }
}