import { SnackbarProvider } from "notistack";
import { WidgetButton } from "./components/WidgetButton";

const App = () => {
  return (
    <SnackbarProvider maxSnack={3} preventDuplicate>
      <WidgetButton />
    </SnackbarProvider>
  );
};

export default App;
