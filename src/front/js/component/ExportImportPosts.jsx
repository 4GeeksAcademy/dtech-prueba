import React, { useContext } from "react";
import { Context } from "../store/appContext";

const ExportImportPosts = () => {
    const { actions } = useContext(Context);

    const handleExport = () => {
        actions.exportPosts();
    };

    const handleImport = (event) => {
        const file = event.target.files[0];
        if (file) {
            actions.importPosts(file);
        }
    };

    return (
        <div className="export-import-container">
            <button onClick={handleExport} className="btn btn-primary">
                Export Posts
            </button>
            <input type="file" onChange={handleImport} className="btn btn-secondary" />
        </div>
    );
};

export default ExportImportPosts