import { Component, onMount } from "solid-js";
import SpreadSheetRenderer from "./Renders/SpreadSheetRenderer";
import { handleKeyPress } from "./Handlers/KeyPressHandler";

const App: Component = () => {
    onMount(() => {
        document.addEventListener("keydown", handleKeyPress);
	document.addEventListener('compositionstart', (e) => {
              console.log('Start', e.data);
            });

    });
    
    return (
        <>  
            <SpreadSheetRenderer />
            <SpreadSheetRenderer />
            <SpreadSheetRenderer />
        </>
    );
};

export default App;
