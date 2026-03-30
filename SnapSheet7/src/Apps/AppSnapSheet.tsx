import { Component, onMount } from "solid-js";
import SpreadSheetRenderer from "./Renders/SpreadSheetRenderer";
import { handleKeyPress } from "./Handlers/KeyPressHandler";
//import { handleMouseWheel } from "./Handlers/MouseWheelHandler";

const App: Component = () => {
    onMount(() => {
        document.addEventListener("keydown", handleKeyPress);
	//document.addEventListener("wheel", handleMouseWheel);  
	document.addEventListener('compositionstart', (e) => {
              console.log('Start', e.data);
            });

    });
    
    return (
        <>  
            <SpreadSheetRenderer />
        </>
    );
};

export default App;
