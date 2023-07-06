import React from 'react';
import expenseService from "../../service/expenseService";

const DownloadButton = ({ fileId }) => {
    const handleDownload = () => {
        const downloadUrl = expenseService.downloadFile(fileId);
        window.location.href = downloadUrl;
    };

    return (
        <button onClick={handleDownload}>
            Télécharger le fichier
        </button>
    );
};

export default DownloadButton;