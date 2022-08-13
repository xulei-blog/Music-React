//第三方导入
import React, { memo, Suspense } from 'react';
import { renderRoutes } from 'react-router-config';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

//工具类导入
import routes from '@/router';
import store from '@/store';

//组件导入
import WYAppHeader from '@/components/app-header';
import WYAppFooter from '@/components/app-footer';
import AppPlayerBar from '@/pages/player/app-player-bar';

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <WYAppHeader />
        <Suspense fallback={<div>page loading</div>}>
          {renderRoutes(routes)}
        </Suspense>
        <WYAppFooter />
        <AppPlayerBar />
      </HashRouter>    
    </Provider>
    
  )
})

export default App;