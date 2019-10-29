import React from 'react';
import { Provider } from 'react-redux';
import { Tabs } from 'antd';
import store from './store';
import Cache from './page/Cache';
import Loading from './page/Loading';
import Operate from './page/Operate';
import Debounce from './page/Debounce';
import './App.less';

const { TabPane } = Tabs;

const App: React.FC = () => {
    return (
        <Provider store = { store }>
            <div className = "page-wrap">
                <Tabs>
                    <TabPane tab = "cache" key = "cache">
                        <Cache />
                    </TabPane>
                    <TabPane tab = "loading" key = "loading">
                        <Loading />
                    </TabPane>
                    <TabPane tab = "operate" key = "operate">
                        <Operate />
                    </TabPane>
                    <TabPane tab = "debounce" key = "debounce">
                        <Debounce />
                    </TabPane>
                </Tabs>
            </div>
        </Provider>
    )
}

export default App;