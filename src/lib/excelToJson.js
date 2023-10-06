import { utils, read } from 'xlsx'

export default function excelTOJson(selectedFile, FILETYPES, onDataLoaded) {

    if (selectedFile) {
        if (FILETYPES.includes(selectedFile.type)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target.result
                const workbook = read(result, { type: 'buffer' });
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const data = utils.sheet_to_json(worksheet);
                onDataLoaded(data);
            }
            reader.readAsArrayBuffer(selectedFile);
        }
        else {
            throw new Error('Please Select a valid excel (.xlsx) file')
        }
    }
    else {
        throw new Error('Please select a file')
    }
}