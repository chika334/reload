import { FC } from "react";
import { QueryProps, CoralWebhookData } from "./types";
declare type Appp = {
    visible: boolean;
    toggle: () => void;
    body: CoralWebhookData;
    onSuccess: (response: QueryProps) => void;
};
declare const App: FC<Appp>;
export default App;
