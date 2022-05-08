import { WidgetButton } from "./components/WidgetButton";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider>
      <WidgetButton />
    </SnackbarProvider>
  );
};

export default App;
