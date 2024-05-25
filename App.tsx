import { Provider } from "react-redux";
import RootNavigator from "./src/navigations/RootNavigator";
import store, { persistor } from "./src/redux/store";
import Toast from "react-native-toast-message";
import { PersistGate } from "redux-persist/integration/react";
import 'react-native-gesture-handler';

function App(): React.JSX.Element {
  return (

    <Provider store={store}>
      {/* <CartProvider> */}
      <PersistGate persistor={persistor}>
        <RootNavigator />
        <Toast />
      </PersistGate>
      {/* </CartProvider> */}


    </Provider>

  );
}
export default App;
