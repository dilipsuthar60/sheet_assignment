import CustomDataGrid from './CustomDataGrid';
import './App.css';
import data from './data.js'

function App() {
  const convertToTitle = (columnNumber) => {
    let ans = ''
    while (columnNumber > 0) {
      let code = (--columnNumber) % 26
      ans = String.fromCharCode(code + 65) + ans
      columnNumber = (columnNumber - code) / 26
    }

    return ans
  }
  const tableId = 'A';
  const rows = Array.from({ length: 100 }, (_, i) => i + 1);
  const columns = Array.from({ length: 56 }, (_, i) => convertToTitle(i + 1));
  const backgroundImage = '';
  console.log(data)
  return <CustomDataGrid tableId={tableId} rows={rows} columns={columns} data={data} backgroundImage={backgroundImage} />;
}

export default App;
