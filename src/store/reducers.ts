import common from './common';

interface Iaction<T = any, P = any> {
    type: T
    payload: P
}

type Reducer<S = any, A = any> = (prevState: S, action: A) => S

// 直接引入的model
interface IoriginalModel {
    namespace: string
    state: any
    reducers: {
        [key: string]: (state: any, payload: any) => any
    }
}

// 将原有model中的reducers对象处理为可被redux使用的reducer后的model
interface IhandleModel {
    namespace: string
    state: any
    reducer: (state: any, action: Iaction) => any
}

const modelList: IoriginalModel[] = [ common ];

// 将原有model中的reducers对象处理为可被redux使用的reducer对象
const handledModels: IhandleModel[] = modelList.map((model: IoriginalModel): IhandleModel => {
    const { namespace, state, reducers } = model;

    // 将reducers对象处理为reducer方法
    const reducer = (_state: any = state, action: Iaction) => {

        // 判断action.type是否存在
        if (reducers[action.type]) {

            // 返回经过reducer处理后的state
            return reducers[action.type](_state, action.payload);
        }

        // 直接返回state
        return _state;
    }

    // 返回处理后的model对象
    return {
        namespace,
        state,
        reducer
    }
});

const reducers: { [key: string]: Reducer<any, Iaction> } = {};

// 将经过处理后的各个model组装成reducers对象
handledModels.forEach((model: IhandleModel) => {
    reducers[model.namespace] = model.reducer;
});

export default reducers;