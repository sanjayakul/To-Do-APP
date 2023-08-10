import { ACTIONS } from "../reducer/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faFileImport } from "@fortawesome/free-solid-svg-icons";

function ImportTasks({state, dispatch, darkMode}) {
    const handleButtonClick = () => {
        const jsonData = JSON.stringify(state); 
        const blob = new Blob([jsonData], { type: "application/json" }); 
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement("a");
        link.href = url;
        link.download = "tasks.json"; 
    
        link.click();
    
        URL.revokeObjectURL(url);
      }
    
      const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileContent = event.target.result;
          const parsedData = JSON.parse(fileContent);
          dispatch({ type: ACTIONS.SET_STATE, payload: parsedData });
        };
        reader.readAsText(file);
      };
    

    return ( 
        <div className="importtasks__container">
            <h4 className="importtasks__title">Download or import your tasks:</h4>
            <div className="importtasks__btn-container">
                <button onClick={handleButtonClick} className={darkMode ? "darkmode" : null}>Download tasks <FontAwesomeIcon icon={faDownload} className="importtasks__icon"/></button>
            </div>
            <div className="importtasks__btn-container">
                <label htmlFor="import">Import tasks <span> </span>
                    <input type="file" id="import" onChange={handleFileUpload} style={{display: "none"}}/>
                    <FontAwesomeIcon icon={faFileImport} className="importtasks__icon"/>
                </label>
            </div>
            
        </div>
     );
}

export default ImportTasks;