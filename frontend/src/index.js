import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import store, { history } from 'redux/configureStore';
import App from 'components/App';
import I18n from 'redux-i18n';
import { translations } from 'translations';


console.log(store.getState());

ReactDOM.render(
  <Provider store={store}>
    <I18n translations={translations} initiallang="en" fallbackLang="en">
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </I18n>
  </Provider>,
  document.getElementById("root")
);
